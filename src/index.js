require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const createRouterV1 = require('./routes/v1');

exports.createApp = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/v1', createRouterV1());
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  return app;
};
