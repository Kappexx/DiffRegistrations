const express = require("express");
const bcrypt = require("bcrypt");
const connect = require("./userdbconnect");
const register = express.Router();

register.post("/register", (req, res) => {
  const saltRounds = parseInt(process.env.SALT);
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, saltRounds).then((hash) => {
      if (hash) {
        connect().query(
          "insert into customer (customer_name, customer_email, customer_password) values ($1,$2,$3)",
          [name, email, hash]
        );
        connect().end();
        res.send("Successful registration with email and password");
      } else {
        console.log("somethin wrong during hashing");
      }
    });
  } catch (error) {
    console.log(error);
    console.log("error <---");
  }
});

module.exports = register;
