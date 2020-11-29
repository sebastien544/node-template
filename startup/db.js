const winston = require('winston');
const mongoose = require("mongoose");
const config = require("config");

const db = config.get('db');

module.exports = function() {
    mongoose
    .set('useUnifiedTopology', true)
    .connect(db, {useNewUrlParser: true})
    .then(() => winston.info(`Connected to MongoDB...`))
}


