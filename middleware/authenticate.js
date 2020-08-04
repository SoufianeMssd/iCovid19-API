/* eslint-disable no-magic-numbers */
const jwt = require('jsonwebtoken');
const CONSTANT = require('../helper');

module.exports = (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.status(401).json({message: 'Authentication Error'});

  try {
    const decoded = jwt.verify(token, CONSTANT.authSecret);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(500).send({message: 'Invalid Token'});
  }
};
