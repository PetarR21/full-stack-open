const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  response.json(await User.find({}).populate('blogs'));
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response.status(400).json({
      error: 'username must be provided',
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: 'username must be at least 3 characters long',
    });
  }

  if (!password) {
    return response.status(400).json({
      error: 'password must be provided',
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long',
    });
  }

  if (await User.findOne({ username })) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
