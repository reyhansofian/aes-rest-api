const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  jwt.verify(req.headers['x-access-token'], process.env.JWT_KEY, (err, decoded) => {
    if (decoded) {
      next();
    } else {
      res.status(401).json({ error: err.message });
    }
  });
};

module.exports = {
  verifyToken,
};
