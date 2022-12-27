FROM node:16.18-alpine3.15
COPY . .
RUN npm install 
RUN npm run build
COPY ./public/index.html ./build/index.html
ENTRYPOINT ["npm","start"]