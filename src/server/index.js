require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Establishing MongoDB connection
mongoose.connect(process.env.MONGO_KEY,
  {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, ssl: true, dbName: 'weatherapp'
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('MONGOOSE CONNECTION SUCCESSFUL'));

// Use Routes
app.use('/api', require('./routes/Weather'));

// Serve static contents
app.use(express.static('dist'));

// Start Server
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
