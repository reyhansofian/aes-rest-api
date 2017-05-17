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

  v1.post('/test', verifyToken, (req, res) => {
    const { messages, from, to } = req.body;

    const msg = Messages.build({ messages, from, to });

    msg.save().then(savedMessage => {
      console.log(savedMessage);
      res.status(200).send(savedMessage);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  v1.get('/t', (req, res) => {
    const encryptedText = encrypt('{"messages":"cuma test","from":1,"to":2}');

    res.status(200).send(encryptedText);
  });

  v1.post('/encryptMessage', verifyToken, (req, res) => {
    try {
      const encryptedText = encrypt(JSON.stringify(req.body));

      res.status(200).json(encryptedText);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    }
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
        res.status(500).send({ error: err.message });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  });

  return v1;
};

module.exports = routeV1;
