FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y curl && apt-get clean

RUN npm -v && node -v  

COPY package*.json ./
RUN npm install --force

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
