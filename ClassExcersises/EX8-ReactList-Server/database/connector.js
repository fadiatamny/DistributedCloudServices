const mongoose = require('mongoose');

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
};

mongoose
    .connect(process.env.DB_HOST, options)
    .then(db => console.log(`conncted to: ${db.connection.name}`))
    .catch(err => console.log(`connection error:`, err))