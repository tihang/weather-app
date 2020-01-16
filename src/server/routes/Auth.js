const router = require('express').Router();
const User = require('../models/User');
const UserValidation = require('../helpers/UserValidation');

router.post('/register', async (req, res) => {
  const error = UserValidation.registerValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    try {
      const newUser = await user.save();
      res.send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
