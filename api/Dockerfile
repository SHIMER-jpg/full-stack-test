FROM node:14.18-alpine3.15
COPY . .
RUN npm install 
RUN npm test
ENTRYPOINT ["npm", "start"]