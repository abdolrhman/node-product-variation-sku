/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');


/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 only allow requests from certain origins
 app.use(cors()); * express application
 */
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate)
  .start();

// allow cross origin requests
// configure to

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// fill routes for express application
app.use('/public', mappedOpenRoutes);

app.get('*', (req, res) =>
  res.status(200)
    .send({
      message: 'Welcome to the beginning of nothingness.',
    }));

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
