const express = require('express');
const fetch = require('node-fetch');
const { auth } = require('../middleware/VerifyToken');

const router = express.Router();

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
  const { name } = req.query;
  const cities = await CityList.find({ name }, ['id', 'name']);

  try {
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
