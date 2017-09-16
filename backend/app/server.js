const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); //mongoose.set('debug', true);
const cors = require('cors');

const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');

//c
const port = process.env.PORT || 8080;
mongoose.connect(config.database);

app.use(bodyParser.urlencoded({limit: '24mb'}));
app.use(bodyParser.json({limit: '24mb'}));
app.use(express.static(config.publicDir));
app.use(cors());
app.use(morgan('tiny'));

app.get('/',(req,res) => {
    res.send('Rapoarte drumuri index')
});

app.use('/api',require('./apiRoutes'));
app.listen(port);
console.log('app started on http://localhost:' + port);
