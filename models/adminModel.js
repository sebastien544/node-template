const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema

const adminSchema = new mongoose.Schema(new mongoose.Schema({
  name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
  },
  img: { data: Buffer, contentType: String },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  User: {type: Schema.Types.ObjectId,ref:"User"}
}));

adminSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
}

const Admin = mongoose.model("Admin", adminSchema);

// function validateAdmin(admin) {
//   const schema = {
//     title: Joi.string().min(3).required(),
//   };

//   return Joi.validate(admin, schema);
// }


exports.Admin = Admin;
// exports.validate = validateAdmin;

