FROM node:14.18-alpine3.15
RUN npm install 
COPY . .
ENTRYPOINT ["npm", "run","start"]

# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn build

# FROM buildkite/puppeteer:latest
# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV
# ENV PORT 3000

# WORKDIR /app

# COPY package.json yarn.lock ./
# RUN yarn install && yarn cache clean

# COPY --from=builder /app/dist/ dist/

# EXPOSE $PORT
# CMD ["yarn", "start"]
