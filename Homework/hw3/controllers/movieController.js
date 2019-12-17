const Movies = require('../database/mongoController');

class MovieController {

    static async create(req, res) {
        let n = new Movies({
            barcode: 123,
            name: 'testmovie',
            releaseDate: new Date(2019, 0, 32)
        });

        console.log(n.id);
        try {
            let obj = await n.exists();
            if (obj && obj.length > 1)
                throw {
                    status: 409,
                    message: 'A movie with that barcode already exists'
                };

            await n.save();
            res.status(200).send("Inserted Successfully");

        } catch (err) {
            if(!err.status) err.status = 500;
            res.status(err.status).send(err.message);
        };
    }

    static async read(req, res) {
        try {
            let obj = await Movies.getMovie(req.params.id);
            if (obj && obj.length == 0) throw {
                status: 203,
                message: 'There is no record with that id'
            };
            res.json(obj);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static async readAll(req, res) {
        try {
            let obj = await Movies.getMovies();
            if (obj && obj.length == 0) throw {
                status: 203,
                message: 'There are no record'
            };
            res.json(obj);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static update(req, res) {}

    static delete(req, res) {}

}

module.exports = MovieController;