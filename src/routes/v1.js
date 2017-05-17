const { Router } = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('../middlewares');
const { encrypt, decrypt } = require('../encrypt');

const routeV1 = (Messages) => {
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

  v1.post('/addMessage', verifyToken, (req, res) => {
    try {
      const decryptedText = decrypt(req.body.text);
      const parseText = JSON.parse(decryptedText);

      const msg = Messages.build({
        messages: parseText.messages,
        from: parseText.from,
        to: parseText.to,
      });

      msg.save().then(savedMessage => {
        console.log(savedMessage);
        res.status(200).send(savedMessage);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  });

  return v1;
};

module.exports = routeV1;
