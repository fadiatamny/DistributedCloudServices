const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send({message:"Helloooo"});
});

module.exports = app;