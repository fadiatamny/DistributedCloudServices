const Movies = require('../database/mongoController');

class MovieController {

    static async create(req, res) {
        let n = new Movies({
            name: 'testmovie',
            releaseDate: new Date(2019, 0, 32)
        });
                
        try {
            let obj = await n.exists();
            if (obj && obj.length > 1) 
                throw 'NOP ALREADY THERE';
            
            await n.save();

            res.send(n);
        } catch (err) {
            res.send(err);
        };
    }

    static read(req, res) {}

    static async readAll(req, res) {
        try {
            let obj = await Movies.getMovies();
            console.log(obj);
            res.json(obj);
        } catch (err) {
            console.log(err);
        }
    }

    static update(req, res) {}

    static delete(req, res) {}

}

module.exports = MovieController;