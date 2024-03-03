const express = require("express");

const secret = express.Router();

secret.get("/secret", (req, res) => {
  if (req.session.logedin) {
    res.send("you can see secrets");
  } else {
    res.send("you have not permission to see secret");
  }
});

module.exports = secret;
