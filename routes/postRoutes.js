const express = require("express")

const postController = require("../controlles/postController")
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// localhost:3000/
router.route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost)

router.route("/:id")
  .get(postController.getOnePost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost)

module.exports = router;