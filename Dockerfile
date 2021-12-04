FROM node:17

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

ENTRYPOINT ["./entrypoint.sh"]
