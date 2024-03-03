const express = require("express");

const logaut = express.Router();

logaut.get("/logout", (req, res) => {
  req.session.logedin = false;
  req.session.save();
  res.send("logauted");
});

module.exports = logaut;
