const mongoose = require('mongoose');

let scheme = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: true,
    },
    idea: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});

scheme.static('getIdeas', async function () {
    return await this.find({}, (err, res) => {
        if (err) throw err;
    });
});


module.exports = mongoose.model('ideas', scheme);