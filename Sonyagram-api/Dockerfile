# образ линукс alpine
FROM node:19.5.0-alpine

# указываем директорию
WORKDIR /app

# скопировать package.json 
COPY package*.json ./

# устанавливаем зависимости
RUN npm install

# копируем остальное приложение
COPY . .

# установить prisma
RUN npm install -g prisma

# генерируем призма клиент
RUN prisma generate

# копируем prisma.schema
COPY ./prisma/schema.prisma ./prisma/

# открываем порт
EXPOSE 3000

# запуск сервера
CMD ["npm", "start"]