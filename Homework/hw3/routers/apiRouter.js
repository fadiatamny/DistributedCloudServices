const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.get('/',(req,res)=>{
    mc.create(req,res);
});

router.post('/movie/create',(req, res)=>{
    mc.create(req,res);
});

router.get('/movie/read/:id',(req,res)=>{
    mc.read(req,res);
});

router.get('/movies/read',(req,res)=>{
    mc.readAll(req,res);
});
module.exports = router;