const router = require('express').Router();
const { auth } = require('../middleware/VerifyToken');
const User = require('../models/User');
const CityList = require('../models/CityLists');

router.get('/profile/show', auth, async (req, res) => {
  try {
    const UserDetails = await User.findById(req.user.user);
    res.status(200).send(UserDetails);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/profile/favorite/create', auth, async (req, res) => {
  try {
    // Validate city by checking the database first
    const validCity = await CityList.findOne({ id: req.body.savedCityId });
    if (!validCity) res.status(400).send({ message: 'Invalid City' });

    // Update user schema if valid city
    const user = await User.findByIdAndUpdate(
      req.user.user,
      { $push: { savedCityId: req.body.savedCityId } },
      { new: true }
    );

    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/profile/favorite/delete', auth, async (req, res) => {
  try {
    // Find on
    const user = await User.findByIdAndUpdate(
      req.user.user,
      { $pull: { savedCityId: req.body.savedCityId } },
      { new: true }
    );

    user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
