# express-auth
ExpressJS boilerplate with Google login

## Description

This is a basic boilerplate for ExpressJS that also adds a few useful features on top of a vanilla ExpressJS install from the express-generator:

* deprecated Jade templating engine is replaced by Pug
* SASS pre-processor added
* npm start runs using nodemon by default for hot reloading
* Docker Compose is used in order to automatically include the MongoDB component (mongoose included)
* framework for Google login is added using Passport

## Using this Repository

1. Copy ./config/creds.js.sample to ./config/creds.js and add your Google API credentials and specify any login domain requirements (or remove the domainCheck attribute if it will be open to all domains)
2. Run docker-compose up

