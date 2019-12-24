const Movies = require('../database/mongoController');
const mongoose = require('mongoose');
const moment = require('moment');
const errHandler = require('../middleware/errorHandler');
class MovieController {
    static async create(req, res) {
        try {
            if (!req.body.barcode || !req.body.name || !req.body.year || !req.body.month || !req.body.day) throw {
                status: 404,
                message: 'Missing Information try again'
            };
            this.checkID(req.body.barcode);

            let date = moment(`${req.body.day}-${req.body.month}-${req.body.year}`, "MM-MM-YYYY");

            if (!date.isValid()) throw {
                status: 404,
                message: 'Incorrect date!'
            };

            let m = new Movies({
                barcode: req.body.barcode,
                name: req.body.name,
                releaseDate: date.format('DD-MM-YYYY')
            });

            if (req.body.rating) {
                if (req.body.rating >= 0 && req.body.rating <= 10)
                    m.rating = req.body.rating;
                else
                    throw {
                        status: 404,
                        message: 'Incorrect Rating! please put a number between 0 and 10'
                    };
            }

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
            errHandler.Error(res, err);
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
            res.status(200).json(obj);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async readAll(req, res) {
        try {
            let obj = await Movies.getMovies();
            if (!obj || obj.length == 0) throw {
                status: 204,
                message: 'There are no record'
            };
            res.status(200).json(obj);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async topRated(req, res) {
        try {
            let movies = await Movies.getMovies();
            if (!movies || movies.length == 0) throw {
                status: 204,
                message: 'There are no record'
            };

            let top = movies[0].rating;
            let topList = [];
            movies.forEach(element => {
                if (top < element.rating)
                    top = element.rating;
            });

            movies.forEach(element => {
                if (top == element.rating)
                    topList.push(element);
            });

            res.status(200).json(topList);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async filter(req, res) {
        try {
            let movies = await Movies.getMovies();
            if (!movies || movies.length == 0) throw {
                status: 204,
                message: 'There are no record'
            };

            let filtered = [];

            movies.forEach(element => {
                if (element.name == req.params.data || element._id == req.params.data || element.rating == req.params.rating)
                    filtered.push(element);
                if (moment(req.params.data).isValid() && moment(element.date, "DD-MM-YYYY") == moment(req.params.data, "DD-MM-YYYY"))
                    filtered.push(element);
            });

            if (filtered.length == 0) throw {
                status: 204,
                message: 'There are no records with this filter'
            };

            res.status(200).json(filtered);
        } catch (err) {
            errHandler.Error(res, err);
        }
    }

    static async update(req, res) {
        try {
            this.checkID(req.params.barcode);
            let obj = await Movies.getMovie(req.params.barcode);
            if (!obj) throw {
                status: 204,
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

            if (req.body.rating)
                obj.rating = req.body.rating;

            let r = await Movies.updateMovie(obj);
            if (r.nModified == 0)
                res.status(200).send(`Already up to date`);
            else
                res.status(200).send(`Successfully updated`);

        } catch (err) {
            errHandler.Error(res, err);
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
            let tmp = await Movies.deleteMovie(req.params.barcode);
            if (tmp.deleteCount == 0) throw {
                status: 204,
                message: 'There is notihng to delete'
            };
            res.status(200).send(`Successfully removed`);
        } catch (err) {
            errHandler.Error(res, err);
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