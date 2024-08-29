const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
//app.use("/", (req, res) => {
//  res.send("Server is running.");
//});
app.use(express.json());
app.use(
  cors({
    origin: ["https://heat-pump-data-frontend.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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

app.post("*", (req, res) => {
  site = req.body.location || "Aldridge";
  date = req.body.date;
  console.log(date);
  const sql =
    "SELECT * FROM gshp.gshp_meter_data WHERE Date = '" +
    date.replaceAll("-", "/") +
    "' AND  Site = '" +
    site.replaceAll("_", " ") +
    "';";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8082, () => {
  console.log("Listening");
});
