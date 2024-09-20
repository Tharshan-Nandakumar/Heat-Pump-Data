const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const locationUrls = {
  Aldridge: "http://151.2.207.146:10001/http/index/j_operatingdata.html",
  Ashtead: "http://151.2.212.222:10000/http/index/j_operatingdata.html",
  Aylesbury: "http://151.2.172.112:10001/http/index/j_operatingdata.html",
  Bagshot: "http://51.52.116.223:10001/http/index/j_operatingdata.html",
  Bicester: "http://82.152.38.63:10001/http/index/j_operatingdata.html",
  Billericay: "http://51.219.6.1:10000/http/index/j_operatingdata.html",
  Bishops_Waltham:
    "http://212.159.33.100:10000/http/index/j_operatingdata.html",
  Bourne_End: "http://157.231.48.75:10000/http/index/j_operatingdata.html",
  Bridport: "http://151.2.190.42:10000/http/index/j_operatingdata.html",
  Burnham: "http://157.231.60.231:10000/http/index/j_operatingdata.html",
  Carshalton: "http://151.2.239.130:10001/http/index/j_operatingdata.html",
  Cheam: "http://164.39.129.41:10001/http/index/j_operatingdata.html",
  Cheltenham: "http://164.39.192.226:10000/http/index/j_operatingdata.html",
  Chichester: "http://157.231.58.139:10001/http/index/l_operatingdata.html",
  Chippenham: "http://51.52.37.39:10000/http/index/j_operatingdata.html",
  Cirencester: "http://51.52.37.205:10000/http/index/j_operatingdata.html",
  Cowbridge: "http://92.207.67.127:10001/http/index/j_operatingdata.html",
  Crowthorne: "http://92.207.66.164:10000/http/index/j_operatingdata.html",
  Dartford: "http://164.39.226.242:10000/http/index/j_operatingdata.html",
  Deal: "http://51.219.232.202:10000/http/index/j_operatingdata.html",
  Dorking: "http://51.52.35.57:10000/http/index/j_operatingdata.html",
  East_Grinstead: "http://164.39.205.205:10000/http/index/j_operatingdata.html",
  Eastbourne: "http://138.248.138.209:10000/http/index/j_operatingdata.html",
  Eastleigh: "http://157.231.195.16:10000/http/index/j_operatingdata.html",
  Eltham: "http://138.248.171.194:10000/http/index/j_operatingdata.html",
  Frinton: "http://178.211.198.25:10001/http/index/j_operatingdata.html",
  Haverhill: "http://157.231.48.239:10000/http/index/j_operatingdata.html",
  Highcliffe: "http://51.219.172.187:10001/http/index/j_operatingdata.html",
  Hitchin: "http://81.168.73.116:10000/http/index/j_operatingdata.html",
  Huntingdon: "http://151.2.207.41:10000/http/index/j_operatingdata.html",
  Hythe: "http://151.2.172.78:10001/http/index/j_operatingdata.html",
  Knowle: "http://151.2.207.62:10001/http/index/j_operatingdata.html",
  Littlehampton: "http://164.39.202.150:10001/http/index/j_operatingdata.html",
  Ludlow: "http://178.211.198.27:10000/http/index/j_operatingdata.html",
  Lymington: "http://51.219.32.147:10000/http/index/j_operatingdata.html",
  Maidstone: "http://91.85.214.102:10001/http/index/j_operatingdata.html",
  Marlow: "http://151.2.207.26:10001/http/index/j_operatingdata.html",
  Newquay: "http://51.52.225.17:10000/http/index/j_operatingdata.html",
  Orpington: "http://157.231.209.118:10000/http/index/j_operatingdata.html",
  Park_Gate: "http://151.2.205.171:10000/http/index/j_operatingdata.html",
  Peacehaven: "http://157.231.36.108:10000/http/index/j_operatingdata.html",
  Penrith: "http://164.39.192.16:10001/http/index/j_operatingdata.html",
  Pinner: "http://151.2.206.210:10001/http/index/j_operatingdata.html",
  Poole: "http://164.39.225.62:10000/http/index/j_operatingdata.html",
  Portswood: "http://157.231.201.101:10000/http/index/j_operatingdata.html",
  Princes_Ris: "http://82.153.162.201:10001/http/index/j_operatingdata.html",
  Quinton: "http://151.2.207.141:10000/http/index/j_operatingdata.html",
  Reigate: "http://51.52.41.39:10000/http/index/j_operatingdata.html",
  Sandhurst: "http://51.219.162.168:10000/http/index/j_operatingdata.html",
  Selsdon: "http://51.52.113.179:10000/http/index/j_operatingdata.html",
  Shepperton: "http://81.168.114.126:10001/http/index/j_operatingdata.html",
  Shirley: "http://151.2.207.65:10000/http/index/j_operatingdata.html",
  Sidford: "http://151.2.190.9:10000/http/index/j_operatingdata.html",
  Sittingbourne: "http://164.39.128.13:10001/http/index/j_operatingdata.html",
  Sketty: "http://195.166.131.95:10000/http/index/j_operatingdata.html",
  Southgate: "http://92.207.184.2:10000/http/index/j_operatingdata.html",
  Staines: "http://92.207.95.228:10001/http/index/j_operatingdata.html",
  Tattenham: "http://80.252.70.227:10000/http/index/j_operatingdata.html",
  Taunton: "http://51.52.46.178:10000/http/index/j_operatingdata.html",
  Tavistock: "http://51.52.226.112:10000/http/index/j_operatingdata.html",
  Thame: "http://157.231.45.164:10000/http/index/j_operatingdata.html",
  Thornbury: "http://89.30.233.173:10000/http/index/j_operatingdata.html",
  Tonbridge: "http://164.39.205.236:10001/http/index/j_operatingdata.html",
  Torquay: "http://138.248.175.1:10001/http/index/j_operatingdata.html",
  Warlingham: "http://51.52.112.115:10001/http/index/j_operatingdata.html",
  Wetherby: "http://157.231.193.104:10000/http/index/j_operatingdata.html",
  Wimborne: "http://92.207.130.81:10001/http/index/j_operatingdata.html",
  Wokingham: "http://157.231.9.78:10000/http/index/j_operatingdata.html",
  Yate: "http://92.207.108.252:10000/http/index/j_operatingdata.html",
};

const locationUrlsHTG = {
  Aldridge: "http://151.2.207.146:10000/http/index/j_operatingdata.html",
  Ashtead: "http://151.2.212.222:10001/http/index/j_operatingdata.html",
  Aylesbury: "http://151.2.172.112:10000/http/index/j_operatingdata.html",
  Bagshot: "http://51.52.116.223:10000/http/index/j_operatingdata.html",
  Bicester: "http://82.152.38.63:10000/http/index/j_operatingdata.html",
  Billericay: "http://51.219.6.1:10001/http/index/j_operatingdata.html",
  Bishops_Waltham:
    "http://212.159.33.100:10001/http/index/j_operatingdata.html",
  Bourne_End: "http://157.231.48.75:10001/http/index/j_operatingdata.html",
  Bridport: "http://151.2.190.42:10001/http/index/j_operatingdata.html",
  Burnham: "http://157.231.60.231:10001/http/index/j_operatingdata.html",
  Carshalton: "http://151.2.239.130:10000/http/index/j_operatingdata.html",
  Cheam: "http://164.39.129.41:10000/http/index/j_operatingdata.html",
  Cheltenham: "http://164.39.192.226:10001/http/index/j_operatingdata.html",
  Chichester: "http://157.231.58.139:10000/http/index/l_operatingdata.html",
  Chippenham: "http://51.52.37.39:10001/http/index/j_operatingdata.html",
  Cirencester: "http://51.52.37.205:10001/http/index/j_operatingdata.html",
  Cowbridge: "http://92.207.67.127:10000/http/index/j_operatingdata.html",
  Crowthorne: "http://92.207.66.164:10001/http/index/j_operatingdata.html",
  Dartford: "http://164.39.226.242:10001/http/index/j_operatingdata.html",
  Deal: "http://51.219.232.202:10001/http/index/j_operatingdata.html",
  Dorking: "http://51.52.35.57:10001/http/index/j_operatingdata.html",
  East_Grinstead: "http://164.39.205.205:10001/http/index/j_operatingdata.html",
  Eastbourne: "http://138.248.138.209:10001/http/index/j_operatingdata.html",
  Eastleigh: "http://157.231.195.16:10001/http/index/j_operatingdata.html",
  Eltham: "http://138.248.171.194:10001/http/index/j_operatingdata.html",
  Frinton: "http://178.211.198.25:10000/http/index/j_operatingdata.html",
  Haverhill: "http://157.231.48.239:10001/http/index/j_operatingdata.html",
  Highcliffe: "http://51.219.172.187:10000/http/index/j_operatingdata.html",
  Hitchin: "http://81.168.73.116:10001/http/index/j_operatingdata.html",
  Huntingdon: "http://151.2.207.41:10001/http/index/j_operatingdata.html",
  Hythe: "http://151.2.172.78:10000/http/index/j_operatingdata.html",
  Knowle: "http://151.2.207.62:10000/http/index/j_operatingdata.html",
  Littlehampton: "http://164.39.202.150:10000/http/index/j_operatingdata.html",
  Ludlow: "http://178.211.198.27:10001/http/index/j_operatingdata.html",
  Lymington: "http://51.219.32.147:10001/http/index/j_operatingdata.html",
  Maidstone: "http://91.85.214.102:10000/http/index/j_operatingdata.html",
  Marlow: "http://151.2.207.26:10000/http/index/j_operatingdata.html",
  Newquay: "http://51.52.225.17:10001/http/index/j_operatingdata.html",
  Orpington: "http://157.231.209.118:10001/http/index/j_operatingdata.html",
  Park_Gate: "http://151.2.205.171:10001/http/index/j_operatingdata.html",
  Peacehaven: "http://157.231.36.108:10001/http/index/j_operatingdata.html",
  Penrith: "http://164.39.192.16:10000/http/index/j_operatingdata.html",
  Pinner: "http://151.2.206.210:10000/http/index/j_operatingdata.html",
  Poole: "http://164.39.225.62:10001/http/index/j_operatingdata.html",
  Portswood: "http://157.231.201.101:10001/http/index/j_operatingdata.html",
  Princes_Ris: "http://82.153.162.201:10000/http/index/j_operatingdata.html",
  Quinton: "http://151.2.207.141:10001/http/index/j_operatingdata.html",
  Reigate: "http://51.52.41.39:10001/http/index/j_operatingdata.html",
  Sandhurst: "http://51.219.162.168:10001/http/index/j_operatingdata.html",
  Selsdon: "http://51.52.113.179:10001/http/index/j_operatingdata.html",
  Shepperton: "http://81.168.114.126:10000/http/index/j_operatingdata.html",
  Shirley: "http://151.2.207.65:10001/http/index/j_operatingdata.html",
  Sidford: "http://151.2.190.9:10001/http/index/j_operatingdata.html",
  Sittingbourne: "http://164.39.128.13:10000/http/index/j_operatingdata.html",
  Sketty: "http://195.166.131.95:10001/http/index/j_operatingdata.html",
  Southgate: "http://92.207.184.2:10001/http/index/j_operatingdata.html",
  Staines: "http://92.207.95.228:10000/http/index/j_operatingdata.html",
  Tattenham: "http://80.252.70.227:10001/http/index/j_operatingdata.html",
  Taunton: "http://51.52.46.178:10001/http/index/j_operatingdata.html",
  Tavistock: "http://51.52.226.112:10001/http/index/j_operatingdata.html",
  Thame: "http://157.231.45.164:10001/http/index/j_operatingdata.html",
  Thornbury: "http://89.30.233.173:10001/http/index/j_operatingdata.html",
  Tonbridge: "http://164.39.205.236:10000/http/index/j_operatingdata.html",
  Torquay: "http://138.248.175.1:10000/http/index/j_operatingdata.html",
  Warlingham: "http://51.52.112.115:10000/http/index/j_operatingdata.html",
  Wetherby: "http://157.231.193.104:10001/http/index/j_operatingdata.html",
  Wimborne: "http://92.207.130.81:10000/http/index/j_operatingdata.html",
  Wokingham: "http://157.231.9.78:10001/http/index/j_operatingdata.html",
  Yate: "http://92.207.108.252:10001/http/index/j_operatingdata.html",
};

const app = express();
//app.use("/", (req, res) => {
//  res.send("Server is running.");
//});
app.use(express.json());

app.use(
  cors({
    origin: ["https://heat-pump-data-frontend.vercel.app"], //http://localhost:5173
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

app.get("/", (re, res) => {
  return res.json("site");
});

app.post("/locs", (req, res) => {
  site = req.body.location;
  date = req.body.date;
  const sql =
    "SELECT * FROM ecms.churchill_ecms_lvl_1a_sd20 WHERE Data_Date = '" +
    date +
    "' AND Site = '" +
    site +
    "';";
  app.get("/locs", (re, res) => {
    return res.json(site);
  });
  // "SELECT * FROM gshp.gshp_meter_data WHERE Date = '" +
  // date.replaceAll("-", "/") +
  // "' AND  Site = '" +
  // site.replaceAll("_", " ") +
  // "';";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/locs", (re, res) => {
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return res.json(err.stack);
    }
    console.log("Connected to the MySQL database");
  });
});

// New route to proxy the request to the DHW URL
app.get("/api/proxy-data", async (req, res) => {
  const username = "engineer";
  const password = "TRDC2012";
  const { location } = req.query;
  const URL = locationUrls[location];
  if (!URL) {
    return res.status(400).send("Invalid location");
  }
  //const URL = "http://151.2.207.146:10001/http/index/j_operatingdata.htmlhttp/index/j_operatingdata.html";

  try {
    const credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const response = await fetch(URL, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (response.ok) {
      const data = await response.text(); // Get HTML content from the external server
      res.send(data); // Send the HTML data back to the frontend
    } else {
      res.status(response.status).send("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data from external server:", error);
    res.status(500).send("Server error");
  }
});

// New route to proxy the request to the DHW URL
app.get("/api/proxy-data-htg", async (req, res) => {
  const username = "engineer";
  const password = "TRDC2012";
  const { location } = req.query;
  const URL = locationUrlsHTG[location];
  console.log(location);
  console.log(URL);
  if (!URL) {
    return res.status(400).send("Invalid location");
  }
  //const URL = "http://151.2.207.146:10001/http/index/j_operatingdata.htmlhttp/index/j_operatingdata.html";

  try {
    const credentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const response = await fetch(URL, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (response.ok) {
      const data = await response.text(); // Get HTML content from the external server
      res.send(data); // Send the HTML data back to the frontend
    } else {
      res.status(response.status).send("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data from external server:", error);
    res.status(500).send("Server error");
  }
});

app.listen(3306, () => {
  console.log("Listening");
});

//cors, redirect uri auth, axios post //webscrape
