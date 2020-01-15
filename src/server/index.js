require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();


app.use(express.static('dist'));

app.get('/api/getData', (req, res) => {
  fetch('https://samples.openweathermap.org/data/2.5/weather?id=2172797&appid=b6907d289e10d714a6e88b30761fae22')
    .then(response => response.json()
      .then(data => res.json(data)));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
