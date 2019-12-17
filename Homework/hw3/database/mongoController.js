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
    id: {
        type: Number,
        required: true
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
    timestamps: true
});

// scheme.virtual('toString', () => {
//     return `${this.id}\t${this.name}\t${this.releaseDate}`;
// });

// scheme.path('releaseDate').validate(obj => (obj.split('/').length-1)!=3,'Please use correct DD/MM/YY format');

scheme.static('getMovie', (id) => {
    return new Promise(function (reject, resolve) {
        this.find((err, res) => {
            if (err) throw err;
            resolve(res);
        });
    });
});

scheme.method('exists', (id) => {
    return new Promise(function (reject, resolve) {
        this.findById(id, (err, res) => {
            if (err) throw err;
            resolve(res);
        });
    });
});

let Movies = mongoose.model('Movies', scheme);

module.exports = Movies;