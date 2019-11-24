const express = require('express');
const moment = require('moment');
const Emitter = require('events');
const app = express();

const emit = new Emitter();

emit.on('Hello', (req,res)=>{
    res.send(moment().format('MMMM Do YYYY, h:mm:ss a').toString());
});
app.get('/',(req,res)=>{
    emit.emit('Hello',req,res);
});

module.exports = app;