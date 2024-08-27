const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
console.log("hi");
const app = express();
app.use(express.json());

HOST = "20.90.138.131"; //VM IP
DATABASE = "gshp";
USER = "TNandakumar";
PASSWORD = "5ssbdFNsHzio90QpHR0B";

// MySQL connection
const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database");
});

app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.get("/users", async (req, res) => {
  const location = req.query.location;
  console.log(location);
  site = "Aldridge";
  const sql =
    "SELECT * FROM gshp.gshp_meter_data WHERE Date = '" +
    "2023/11/22" +
    "' AND  Site = '" +
    site.replace("_", " ") +
    "';";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
/*
//"SELECT * FROM gshp.gshp_meter_data WHERE Date = '"+"2023/11/22"+"' AND  Site = '"+site.replace("_"," ")+"';"
app.get("/users", (req, res) => {
  site = "Aldridge";
  const sql =
    "SELECT * FROM gshp.gshp_meter_data WHERE Date = '" +
    "2023/11/22" +
    "' AND  Site = '" +
    site.replace("_", " ") +
    "';";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});*/

app.listen(8082, () => {
  console.log("Listening");
});
