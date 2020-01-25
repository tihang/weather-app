const router = require('express').Router();
const { auth } = require('../middleware/VerifyToken');
const User = require('../models/User');

router.get('/profile/show', auth, async (req, res) => {
  try {
    const UserDetails = await User.findById(req.user.user);
    res.status(200).send(UserDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
