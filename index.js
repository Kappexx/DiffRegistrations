const express = require("express");
const pg = require("pg");
var expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pgPool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "sessionDB",
  password: process.env.POSTGER_PASSWORD,
  port: 5433,
});

require("dotenv").config();
const connect = require("./db");
const routertest = require("./testroute");
const routerposttest = require("./testpostroute");
const selectorders = require("./user/orderboard");
const crud = require("./crud/crud");
const register = require("./user/register");
const login = require("./user/login");
const logaut = require("./user/logout");
const secret = require("./user/secret");
const countpageviw = require("./user/countpageviw");

const app = express();
app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool, // Connection pool

      // es gaaketebs session tables (sid, sess, expire) columebit
      createTableIfMissing: true,
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use("/", routertest);
app.use("/", routerposttest);
app.use("/", selectorders);
app.use("/", crud);
app.use("/", register);
app.use("/", login);
app.use("/", logaut);
app.use("/", secret);
app.use("/", countpageviw);

let data = [];
let filtredCountry = "";
let filtredpatterData = "";
connect().query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    data = res.rows;
  }
  connect().end();
});

connect().query(
  "SELECT country FROM world_food where rice_production = '0.42'",
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      filtredCountry = res.rows;
    }
    connect().end();
  }
);

connect().query(
  "SELECT country FROM world_food where country like 'U' || '%'",
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      filtredpatterData = res.rows;
    }
    connect().end();
  }
);

app.get("/getalldata", (req, res) => {
  res.send([data, filtredCountry, filtredpatterData]);
  // res.sendFile("./index.html", { root: __dirname });
});

// refreshze iqrasheba radgan connections xurevas 'db.end()' gavitan calke routerad
// app.get("/quetyinside", async (req, res) => {
//   const result = await db.query("SELECT * FROM visited_counties");
//   const counties = [];

//   result.rows.forEach((item) => {
//     counties.push(item.code);
//   });
//   console.log(result.rows);
//   res.send(counties);
//   db.end();
// });

app.listen("3000", () => {
  console.log("server is starting");
});
