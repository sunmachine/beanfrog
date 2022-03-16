FROM node:17

RUN npm i -g pnpm

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN pnpm install

COPY . ./
RUN pnpm build
RUN pnpm test
ENTRYPOINT pnpm start
