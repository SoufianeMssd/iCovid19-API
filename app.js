const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const CONSTANT = require('./helper');
const app = express();

app.use(bodyParser.json());

// Only log error messages
app.use(morgan('dev', {
  skip: function(req, res) {
    // eslint-disable-next-line no-magic-numbers
    return res.statusCode < 400;
  },
}));

app.get('/', (req, res) => res.send('Hi! Everyone'));


const port = process.env.PORT || CONSTANT.PORT;

app.listen(CONSTANT.PORT, console.log(`Server is starting at port 3000 ${port}`));

mongoose.connect('mongodb://localhost/covid19', {useNewUrlParser: true}, () => console.log('DB is ON'));
