# FROM 965331111166.dkr.ecr.us-west-2.amazonaws.com/mirror/node:12

# FROM 965331111166.dkr.ecr.us-west-2.amazonaws.com/mirror/busybox:latest
FROM node:12

# ref https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NEW_RELIC_NO_CONFIG_FILE=true

EXPOSE 8080
CMD [ "node", "index.js" ]