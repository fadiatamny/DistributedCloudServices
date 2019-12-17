const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
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

// scheme.path('releaseDate').validate(obj => (obj.split('/').length-1)!=3,'Please use correct DD/MM/YY format');

scheme.virtual('id', function () {
    return this._id;
});

scheme.virtual('details', function () {
    return `${this.id}\t${this.name}\t${this.releaseDate}`;
});

scheme.static('getMovie', function (id) {
    return new Promise(function (reject, resolve) {
        this.find({});
    });
});

scheme.static('getMovies', async function () {
    let obj;
    await this.find((err, res) => {
        if (err) throw err;
        obj = res;
    });
    return obj;
});

scheme.method('exists', async function () {
    return await this.model('Movies').find({
        barcode: this.barcode
    });
});



let Movies = mongoose.model('Movies', scheme);

module.exports = Movies;