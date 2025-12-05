const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

const USERS = {
  admin: { password: 'admin', role: 'admin' },
  user: { password: 'user', role: 'user' }
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const record = USERS[username];
  if (!record || record.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { username, role: record.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

  res.json({ token, role: record.role, username });
});

module.exports = router;
