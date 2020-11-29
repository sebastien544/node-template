const express = require('express');
const admin = require("../routes/adminRoutes");
const error = require('../middleware/error');
const cors = require("cors");
const multer = require("multer");

module.exports = function(app) {
    app.use(cors());
    app.use(multer({ dest: "./uploads/",
    rename: function (fieldname, filename) {
    return filename;
    }}).single('photo'));
    app.use(express.json());
    app.use('/api/admin', admin);
    app.use(error);
}