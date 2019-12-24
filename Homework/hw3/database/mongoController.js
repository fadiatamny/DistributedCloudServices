const mongoose = require('mongoose');
const moment = require('moment');

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
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        default: moment().format("DD-MM-YYYY")
    },
    rating: {
        type: Number,
        default: 5
    }
}, {
    timestamps: true,
});

scheme.virtual('id', function () {
    return this._id;
});

scheme.virtual('details', function () {
    return `${this.id}\t${this.name}\t${this.releaseDate}`;
});

scheme.static('getMovie', async function (id) {
    return await this.findById(id, (err, res) => {
        if (err) throw err;
    });
});

scheme.static('getMovies', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});

scheme.static('updateMovie', async function (obj) {
    return await this.updateOne({ _id: obj._id }, obj);
});

scheme.static('deleteMovie', async function(id){
    return await this.deleteOne({_id:id},(err)=>{
        if(err) throw err;
    });
});

scheme.method('exists', async function () {
    return await this.model('Movies').findById(this.id,(err, res)=>{
        if(err) throw err;
    })
});

let Movies = mongoose.model('Movies', scheme);

module.exports = Movies;