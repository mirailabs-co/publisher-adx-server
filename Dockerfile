FROM node:18.17.1-alpine AS development
WORKDIR /app
COPY package.json ./
COPY yarn.lock .
RUN yarn --production

FROM node:18.17.1-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY package.json ./
COPY ./dist ./dist
COPY level-config.csv ./
COPY daily-steak-config.csv ./
CMD ["npm", "run", "start:prod"]
