const Joi = require("joi");
const bcrypt = require('bcrypt');
const { Admin } = require("../models/adminModel");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let admin = await Admin.findOne({name: req.body.name})
    if (!admin) return res.status(400).send('Invalid name or password.');

    const validPassword = await bcrypt.compare(req.body.password, admin.password)
    if (!validPassword) return res.status(400).send('Invalid name or password.');

    const token = admin.generateAuthToken();
    res.send(token);
});
  
function validate(req) {
    const schema = Joi.object({
        name: Joi.required(),
        password: Joi.required()
    });

    return schema.validate(req);
}

module.exports = router;