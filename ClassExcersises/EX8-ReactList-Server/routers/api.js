const router = require('express').Router();
const Ideas = require('../controllers/ideasController');

router.get('/ideas/read',(req,res)=>{
    Ideas.getIdeas(req,res);
});

module.exports = router;