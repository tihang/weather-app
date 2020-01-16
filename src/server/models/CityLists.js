const mongoose = require('mongoose');

const CityListSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  coord: {
    lon: Number,
    lat: Number
  }
});

module.exports = mongoose.model('CityList', CityListSchema, 'CityLists');
