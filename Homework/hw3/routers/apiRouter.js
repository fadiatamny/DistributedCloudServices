const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.post('/movie/create',(req, res)=>{
    mc.create(req,res);
});

module.exports = router;