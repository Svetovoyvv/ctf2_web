FROM node:latest

WORKDIR /frontend
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i --legacy-peer-deps
COPY . .
CMD ["npm", "start"]