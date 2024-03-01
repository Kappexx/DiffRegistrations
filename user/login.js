const express = require("express");
const bcrypt = require("bcrypt");
const connect = require("./userdbconnect");

const login = express.Router();

login.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const data = await connect().query(
    "select customer_password from customer where customer_name = $1",
    [name]
  );
  const customer_pass = data.rows[0].customer_password;
  const match = await bcrypt.compare(password, customer_pass);

  if (match) {
    res.send("valid password");
  } else if (!match) {
    res.send("invalid password");
  } else {
    res.send("something wrong");
  }
});

module.exports = login;
