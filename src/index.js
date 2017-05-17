require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const createRouterV0 = require('./routes/v0');
const createRouterV1 = require('./routes/v1');
const models = require('../models');

exports.createApp = () => {
  const app = express();

  app.set('models', models);

  const Messages = app.get('models').messages;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/', createRouterV0());
  app.use('/v1', createRouterV1(Messages));
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  return app;
};
