const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
  host: REDIS_URL,
  post: REDIS_PORT
})

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.enable('trust proxy');
app.use(cors({}));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3000000
  }
}))

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
  mongoose.connect(mongoURL, {
    useUnifiedTopology: true
  })
    .then(() => console.log('success connect to db'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("<h2>Hello World!!!</h2>");
  console.log("yeah it ran");
})

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});