const Movies = require('../database/mongoController');
const mongoose = require('mongoose');
const moment = require('moment');
class MovieController {
    static async create(req, res) {
        try {
            if (!req.body.barcode || !req.body.name || !req.body.year || !req.body.month || !req.body.day) throw {
                status: 404,
                message: 'Missing Information try again'
            };
            this.checkID(req.body.barcode);

            let date = moment(`${req.body.month}-${req.body.day}-${req.body.year}`, "MM-DD-YYYY");

            if (!date.isValid()) throw {
                status: 404,
                message: 'Incorrect date!'
            };

            let m = new Movies({
                barcode: req.body.barcode,
                name: req.body.name,
                releaseDate: date.format('DD-MM-YYYY')
            });

            m._id = new mongoose.Types.ObjectId(m.barcode);

            let obj = await m.exists();

            if (obj)
                throw {
                    status: 409,
                    message: 'A movie with that barcode already exists'
                };

            await m.save();
            res.status(200).send(`Inserted Successfully under ${m.id} or ${m.barcode}`);

        } catch (err) {
            if (!err.status) err.status = 500;
            res.status(err.status).send(err.message);
        };
    }

    static async read(req, res) {
        try {
            this.checkID(req.params.barcode);
            let obj = await Movies.getMovie(req.params.barcode);
            if (!obj) throw {
                status: 204,
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
            if (!obj || obj.length == 0) throw {
                status: 204,
                message: 'There are no record'
            };
            res.json(obj);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static async update(req, res) {
        try {
            this.checkID(req.params.barcode);
            let obj = await Movies.getMovie(req.params.barcode);
            if (!obj) throw {
                status: 203,
                message: 'The movie doesnt exist'
            };

            if (req.body.name)
                obj.name = req.body.name;
            if (req.body.year && req.body.month && req.body.day) {
                let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "DD-MM-YYYY");

                if (!date.isValid()) throw {
                    status: 404,
                    message: 'Incorrect date!'
                };

                obj.releaseDate = date.format('DD-MM-YYYY');
            }

            let r = await Movies.updateMovie(obj);
            if (r.nModified == 0)
                res.status(200).send(`Already up to date`);
            else
                res.status(200).send(`Successfully updated`);

        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static async delete(req, res) {
        try {
            this.checkID(req.params.barcode);
            let obj = await Movies.getMovie(req.params.barcode);
            if (!obj) throw {
                status: 204,
                message: 'The movie doesnt exist'
            };
            await Movies.deleteMovie(req.params.barcode);
            res.status(200).send(`Successfully removed`);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }

    static checkID(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw {
            status: 403,
            message: 'Invalid Id'
        };
    }
}

module.exports = MovieController;