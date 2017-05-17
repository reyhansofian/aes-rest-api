const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('../middlewares');

const routeV1 = () => {
  const v1 = new Router();
  const jwtKey = process.env.JWT_KEY;

  v1.get('/generateToken', (req, res) => {
    const token = jwt.sign({
      user: 'Anonymous',
      iss: 'AES-TEST',
    }, jwtKey, {
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  });

  v1.get('/test', verifyToken, (req, res) => {
    res.sendStatus(200);
  });

  return v1;
};

module.exports = routeV1;
