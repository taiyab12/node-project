require('../models/Users');
const mongoose = require('mongoose');
// const data = require('../init/load.json');

// const quotes = mongoose.model('Quotes');
mongoose.connect('mongodb://localhost:27017/quotes');
mongoose.connection.on('connected', () => {
    console.log('connected to the DB');
});

mongoose.connection.on('error', (error) => {
    console.error('error on trying to connect to DB : ', error.message);
});
