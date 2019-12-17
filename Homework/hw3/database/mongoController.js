const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.COLLECTION}?retryWrites=true&w=majority`;

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(url, options)
    .then(db => console.log(`conncted to: ${db.connection.name}`))
    .catch(err => console.log(`connection error:`, err))

let scheme = new mongoose.Schema({
    barcode: {
        type: Number,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true,
});

scheme.virtual('id', function () {
    return this._id;
});

scheme.virtual('details', function () {
    return `${this.id}\t${this.name}\t${this.releaseDate}`;
});

scheme.static('getMovie', async function (barcode) {
    return await this.find({
        barcode: barcode
    }, (err, res) => {
        if (err) throw err;
    });
});

scheme.static('getMovies', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});

scheme.method('exists', async function () {
    return await this.model('Movies').find({
        barcode: this.barcode
    }, (err, res) => {
        if (err) throw err;
    });
});



let Movies = mongoose.model('Movies', scheme);

module.exports = Movies;