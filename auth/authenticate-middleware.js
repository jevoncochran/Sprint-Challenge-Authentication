const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const secret = process.env.JWT_SECRET || 'top secret';

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
