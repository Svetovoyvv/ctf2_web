FROM node:latest

WORKDIR /frontend
COPY . .
RUN npm i --legacy-peer-deps
CMD ["npm", "start"]