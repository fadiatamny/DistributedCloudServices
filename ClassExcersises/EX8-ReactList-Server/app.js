require('./database/connector');
const express = require('express');
const apiRoute = require('./routers/api');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
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

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type','application/json');
    next();
});

app.use('/api', apiRoute);

app.all('*', (req, res) => {
    res.status(404).send('Page Not Found!');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;