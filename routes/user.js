/* eslint-disable no-magic-numbers */
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONSTANT = require('../helper');
const authenticate = require('../middleware/authenticate');

router.post('/signup', async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({message: 'User Already Exists'});
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {user: {id: user.id}};

    jwt.sign(
      payload,
      CONSTANT.authSecret,
      {expiresIn: 10000000},
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          id: user._id,
          email: user.email,
          name: user.name,
          token,
        });
      },
    );
  } catch (err) {
    res.status(500).json({
      error: 'Error in Saving',
      message: err.message,
    });
  }
},
);


router.post('/', async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'User doesn\'t exist'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Incorrect Password !'});
    }

    const payload = {user: {id: user.id}};

    jwt.sign(
      payload,
      CONSTANT.authSecret,
      {expiresIn: 10000},
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          id: user._id,
          email: user.email,
          name: user.name,
          token,
        });
      },
    );
  } catch (err) {
    res.status(500).json({
      error: 'Serveur Error',
      message: err.message,
    });
  }
},
);

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.send({message: 'Error in fetching users'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const {params: {id}} = req;
    await User.remove({_id: id});
    res.status(200).json({message: 'User successfully deleted!'});
  } catch (e) {
    res.send({message: 'Error in deleting user'});
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({message: 'Error in Fetching user'});
  }
});

module.exports = router;
