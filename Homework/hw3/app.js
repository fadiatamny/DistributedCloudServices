const express = require("express");
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const fs = require('fs');
const chalk = require('chalk');
const apiRoute = require('./routers/apiRouter');

const app = express();

app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        '\n',
    ].join(' ');
});

app.use(morganMiddleware);

app.use('/api',apiRoute);

module.exports = app;