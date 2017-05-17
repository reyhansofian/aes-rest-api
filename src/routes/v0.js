const { Router } = require('express');

const routeV0 = () => {
  const v0 = new Router();

  v0.get('/', (req, res) => {
    res.status(200).send('Hello world');
  });

  return v0;
};

module.exports = routeV0;
