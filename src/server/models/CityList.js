const mongoose = require('mongoose');

const { Schema } = mongoose;

const CityListSchema = new Schema({
  id: Number,
  name: String,
  country: String,
  coord: {
    lon: Number,
    lat: Number
  }
});

module.exports = mongoose.model('Citylist', CityListSchema);
