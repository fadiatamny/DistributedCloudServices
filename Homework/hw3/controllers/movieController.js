const Movies = require('../database/mongoController');
const mongoose = require('mongoose');
class MovieController {

    static async create(req, res) {
        let n = new Movies({
            barcode: 123,
            name: 'testmovie',
            releaseDate: new Date(2019, 0, 32)
        });
        
        try {
            let obj = await n.exists();
            if (obj)
                throw {
                    status: 409,
                    message: 'A movie with that barcode already exists'
                };

            await n.save();
            res.status(200).send(`Inserted Successfully under ${n.id}`);

        } catch (err) {
            if(!err.status) err.status = 500;
            res.status(err.status).send(err.message);
        };
    }

    static async read(req, res) {
        try {
            let obj = await Movies.getMovie(req.params.id);
            if (!obj) throw {
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
            if (!obj) throw {
                status: 203,
                message: 'There are no record'
            };
            res.json(obj);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static async update(req, res) {

    }

    static async delete(req, res) {
        try {
            this.checkID(req.params.id);
            // let obj = await Movies.getMovie(req.params.id);
            // if(!obj)
            //     console.log(obj);
        //     if (obj && obj.length == 0) throw {
        //         status: 203,
        //         message: 'The movie doesnt exist'
        //     };
        //     await Movies.deleteMovie(req.params.id);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static checkID(id){
        console.log(id.length);
    };
}

module.exports = MovieController;