# 1. Базовий образ
FROM node:lts-alpine

# 2. Робоча директорія
WORKDIR /usr/src/app

# 3. Крокове копіювання для оптимізації кешування шарів Docker
COPY package*.json ./

# 4. Встановлення залежностей
RUN npm install --production

# 5. Копіювання решти коду проєкту
COPY . .

# 6. Вказуємо порт
EXPOSE 3000

# 7. Команда запуску
CMD ["node", "index.js"]