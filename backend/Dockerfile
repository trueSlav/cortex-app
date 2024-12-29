FROM node

WORKDIR /app

COPY package*.json /app

COPY . .

RUN npm install

EXPOSE 3011

CMD npm start