const express = require('express');
const router = express.Router();
const mc = require('../controllers/movieController');

router.get('/',(req, res)=>{
    mc.create(req,res);
});

module.exports = router;