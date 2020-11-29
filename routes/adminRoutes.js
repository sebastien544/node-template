let fs = require("fs");
const auth = require('../middleware/auth')
const bcrypt = require('bcrypt');
const { Admin, validate } = require("../models/adminModel");
const _ = require('lodash');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const admins = await Admin.find().sort({ date: -1 })
  .populate("nomRecevante"); 
  res.send(admins);
});

router.get("/:id", (req, res) => {
  const requestedAdmin = news.find((n) => n.id === parseInt(req.params.id));
  if (!requestedAdmin)
    return res.status(404).send("L'admin possédant cet id n'a pas été trouvé");
  res.send(requestedAdmin);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.detail[0].message);
  
  let admin = new Admin(_.pick(req.body, ['name', 'password']));
  if(req.file){
    createdNews.img.data = fs.readFileSync(req.file.path)
    createdNews.img.contentType = "image/png";
  }

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  await admin.save();

  res.send("admin successfully created");
});

router.put("/:id", auth, async(req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.detail[0].message);

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content },
    {
      new: true,
      $unset: {Joueur : ""}
    }
  );

  if (!admin)
    return res.status(404).send("La news possédant cet id n'a pas été trouvée");

  res.send(admin);
});

router.delete("/:id", auth, async (req, res) => {
  const admin = await Admin.findByIdAndRemove(req.params.id);

  if (!admin)
    return res.status(404).send("L'admin' possédant cet id n'a pas été trouvé");

  res.send(admin);
});


module.exports = router;