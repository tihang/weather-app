require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import Routes
app.use('/api', require('./routes/WeatherRoute'));
app.use('/api/user', require('./routes/AuthRoute'));


// Establishing MongoDB connection
mongoose.connect(process.env.MONGO_KEY,
  {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, ssl: true, dbName: 'weatherapp'
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('MONGOOSE CONNECTION SUCCESSFUL'));


// Serve static contents
app.use(express.static('dist'));

// Start Server
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
