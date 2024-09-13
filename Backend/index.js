const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

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

//app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the MySQL database");
});

app.post("/locs", (req, res) => {
  site = req.body.location || "Aldridge";
  date = req.body.date;
  console.log(date);
  const sql =
    "SELECT * FROM ecms.churchill_ecms_lvl_1a_sd20 WHERE Data_Date = '" +
    date +
    "' AND Site = '" +
    site +
    "';";
  // "SELECT * FROM gshp.gshp_meter_data WHERE Date = '" +
  // date.replaceAll("-", "/") +
  // "' AND  Site = '" +
  // site.replaceAll("_", " ") +
  // "';";
  console.log(site);
  console.log(site.replaceAll("_", " "));
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/locs", (re, res) => {
  return res.json(site);
});

app.listen(3306, () => {
  console.log("Listening");
});

//cors, redirect uri auth, axios post
