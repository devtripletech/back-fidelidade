FROM node:21-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm install

RUN  npm run build

EXPOSE 3335

CMD ["npm", "run", "start"]