const express = require('express');
const fetch = require('node-fetch');
const { auth } = require('../middleware/VerifyToken');

const router = express.Router();

// Safe regex against DDOS
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// Importing CityList schema
const CityList = require('../models/CityLists');

router.get('/getWeatherById', auth, (req, res) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?id=';
  const { id } = req.query;
  const appKey = process.env.WEATHER_API_KEY;

  const apiUrl = baseUrl + id + appKey;

  fetch(apiUrl)
    .then(data => data.json())
    .then(data => res.json({ data }));
});

router.get('/getCityByName', async (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.name), 'gi');
  const cities = await CityList.find({ name: { $regex: regex } }, ['id', 'name']);
  try {
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
