const express = require("express");
const bcrypt = require("bcrypt");
const connect = require("./userdbconnect");

const login = express.Router();

login.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const data = await connect().query(
    "select * from customer where customer_name = $1",
    [name]
  );
  const { id, customer_password } = data.rows[0];

  const match = await bcrypt.compare(password, customer_password);

  if (match) {
    req.session.u_id = id;
    req.session.logedin = true;
    req.session.save();

    res.send("valid password");
  } else if (!match) {
    res.send("invalid password");
  } else {
    res.send("something wrong");
  }
});

module.exports = login;
