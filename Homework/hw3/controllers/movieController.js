const Movies = require('../database/mongoController');

class MovieController {

    static create(req, res){
        let n = new Movies({
            id: 1234,
            name: 'testmovie',
            releaseDate : new Date(2019,0,32)
        });
        
        try {
            n.save();
        } catch (err) {
            console.log(err);
        };
        
        res.send(n);
    }

    static read(req, res){
    }

    static update(req, res){
    }

    static delete(req, res){
    }

}