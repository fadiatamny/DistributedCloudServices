const express = require("express");
const apiRoute = require('./routers/apiRouter');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/api',apiRoute);

module.exports = app;