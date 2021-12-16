# образ
FROM arm64v8/node:16

# рабочая директория
WORKDIR /app

# копируем package.json
COPY package.json .

# ловим окружение из docker-compose
ARG NODE_ENV

# Устанавливаем зависимости
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

# копируем все содержимое в рабочую дерикторию
COPY . ./

# переменные окружения
ENV PORT 3000

# пробросс портов
EXPOSE $PORT

# запускаем сервер
CMD ["node", "index.js"]