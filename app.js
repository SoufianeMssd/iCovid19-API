const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const CONSTANT = require('./helper');
const app = express();

app.use(bodyParser.json());

const coronaRoute = require('./routes/corona');
const feedbackRoute = require('./routes/feedback');

app.use(cors());
// Only log error messages
app.use(morgan('dev', {
  skip: function(req, res) {
    // eslint-disable-next-line no-magic-numbers
    return res.statusCode < 400;
  },
}));

// Routes
app.use('/corona', coronaRoute);
app.use('/feedback', feedbackRoute);

app.get('/', (req, res) => res.send('It is working properly'));


const port = process.env.PORT || CONSTANT.PORT;
app.listen(port, console.log(`Server is starting at port ${port}`));

mongoose.connect('mongodb://localhost/covid19',
  {useNewUrlParser: true}, () => console.log('Connected to database'));
