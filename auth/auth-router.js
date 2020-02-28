const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('./users-model');

router.post('/register', (req, res) => {
  let user = req.body;
  console.log(user);

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  users.add(user)
    .then(added => {
      console.log(user);
      res.status(201).json(added);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'unable to register user' });
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          messsage: `Welcome ${user.username}`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'unable to login' });
  })
});

function generateToken(user) {
  const payload = {
    username: user.username
  }

  const secret = process.env.JWT_SECRET || 'top secret';

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
