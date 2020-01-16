const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();


// Importing CityList schema
const CityList = require('../models/CityLists');


router.get('/getWeatherByName/:name', (req, res) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const { name } = req.params;
  const appKey = process.env.WEATHER_API_KEY;

  const apiUrl = baseUrl + name + appKey;

  fetch(apiUrl)
    .then(data => data.json())
    .then(data => res.json(data));
});


router.get('/getIdByName/:name', async (req, res) => {
  const { name } = req.params;
  const data = await CityList.find({ name });

  try {
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
