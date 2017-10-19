FROM node:latest

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app/
RUN npm install

# add other core scripts
COPY app.js /usr/src/app/
COPY authcheck.js /usr/src/app/
COPY models /usr/src/app/models
COPY bin /usr/src/app/bin
COPY public /usr/src/app/public

EXPOSE 3000
CMD ["npm", "start"]