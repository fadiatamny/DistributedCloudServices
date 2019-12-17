const express = require("express");
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');
const apiRoute = require('./routers/apiRouter');

const app = express();

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(morgan('dev'));

app.use('/api',apiRoute);

module.exports = app;