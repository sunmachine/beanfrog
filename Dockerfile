FROM node:17

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
