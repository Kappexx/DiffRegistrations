const express = require("express");

const countpageviw = express.Router();

countpageviw.get("/countpageviw", (req, res) => {
  req.session.pageviw = req.session.pageviw + 1 || 0;
  req.session.save();
  console.log(req.session);
  res.send("specpage");
});

module.exports = countpageviw;
