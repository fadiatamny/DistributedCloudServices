const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.post('/movie/create',(req, res)=>{
    mc.create(req,res);
});

router.delete('/movie/delete/:barcode',(req,res)=>{
    mc.delete(req,res);
});

router.get('/movie/read/:barcode',(req,res)=>{
    mc.read(req,res);
});

router.get('/movies/filter/:data',(req,res)=>{
    mc.filter(req,res);
});

router.get('/movies/TopRated/',(req,res)=>{
    mc.topRated(req,res);
});

router.get('/movies/read',(req,res)=>{
    mc.readAll(req,res);
});

router.put('/movie/update/:barcode', (req,res)=>{
    mc.update(req,res);
});

module.exports = router;