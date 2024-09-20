import { useState } from "react";
import axios from "axios";
import HealthReport from "../HealthReport/HealthReport";
import WebScrape from "../LiveReadings/WebScrape";

function Inputs() {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Aldridge");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setData(null);
    setError(null);
    setLocation(e.target.elements.location.value);
    setDate(e.target.elements.date.value);
    console.log(Date);
    axios
      .post(
        "https://heat-pump-data-backend.onrender.com/locs" /*http://localhost:3306/locs"*/,
        {
          location: e.target.elements.location.value,
          date: e.target.elements.date.value,
        }
      )
      .then((res) => {
        if (res.data.fatal !== true) {
          console.log(res.data);
          setData(res.data);
        } else {
          setError(
            "An error occurred while fetching data. Please check/refresh database connection"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setError(
          "An error occurred while fetching data. You may not have access to the data from this IP address"
        );
      });
  }
  //"https://heat-pump-data-backend.vercel.app"
  const locations = [
    "Aldridge",
    "Ashtead",
    "Aylesbury",
    "Bagshot",
    "Bicester",
    "Billericay",
    "Bishops_Waltham",
    "Bourne_End",
    "Bridport",
    "Burnham",
    "Carshalton",
    "Cheam",
    "Cheltenham",
    "Chichester",
    "Chippenham",
    "Cirencester",
    "Cowbridge",
    "Crowthorne",
    "Dartford",
    "Deal",
    "Dorking",
    "East_Grinstead",
    "Eastbourne",
    "Eastleigh",
    "Eltham",
    "Frinton",
    "Haverhill",
    "Highcliffe",
    "Hitchin",
    "Huntingdon",
    "Hythe",
    "Knowle",
    "Littlehampton",
    "Ludlow",
    "Lymington",
    "Maidstone",
    "Marlow",
    "Newquay",
    "Orpington",
    "Park_Gate",
    "Peacehaven",
    "Penrith",
    "Pinner",
    "Poole",
    "Portswood",
    "Princes_Ris",
    "Quinton",
    "Reigate",
    "Sandhurst",
    "Selsdon",
    "Shepperton",
    "Shirley",
    "Sidford",
    "Sittingbourne",
    "Sketty",
    "Southgate",
    "Staines",
    "Tattenham",
    "Taunton",
    "Tavistock",
    "Thame",
    "Thornbury",
    "Tonbridge",
    "Torquay",
    "Warlingham",
    "Wetherby",
    "Wimborne",
    "Wokingham",
    "Yate",
  ];

  const URLs = [
    "http://engineer:TRDC2012@151.2.207.146:10001/",
    "http://engineer:TRDC2012@151.2.212.222:10000/",
    "http://engineer:TRDC2012@151.2.172.112:10001/",
    "http://engineer:TRDC2012@51.52.116.223:10001/",
    "http://engineer:TRDC2012@82.152.38.63:10001/",
    "http://engineer:TRDC2012@51.219.6.1:10000/",
    "http://engineer:TRDC2012@212.159.33.100:10000/",
    "http://engineer:TRDC2012@157.231.48.75:10000/",
    "http://engineer:TRDC2012@151.2.190.42:10000/",
    "http://engineer:TRDC2012@157.231.60.231:10000/",
    "http://engineer:TRDC2012@151.2.239.130:10001/",
    "http://engineer:TRDC2012@164.39.129.41:10001/",
    "http://engineer:TRDC2012@164.39.192.226:10000/",
    "http://engineer:TRDC2012@157.231.58.139:10001/",
    "http://engineer:TRDC2012@51.52.37.39:10000/",
    "http://engineer:TRDC2012@51.52.37.205:10000/",
    "http://engineer:TRDC2012@92.207.67.127:10001/",
    "http://engineer:TRDC2012@92.207.66.164:10000/",
    "http://engineer:TRDC2012@164.39.226.242:10000/",
    "http://engineer:TRDC2012@51.219.232.202:10000/",
    "http://engineer:TRDC2012@51.52.35.57:10000/",
    "http://engineer:TRDC2012@164.39.205.205:10000/",
    "http://engineer:TRDC2012@138.248.138.209:10000/",
    "http://engineer:TRDC2012@157.231.195.16:10000/",
    "http://engineer:TRDC2012@138.248.171.194:10000/",
    "http://engineer:TRDC2012@178.211.198.25:10001/",
    "http://engineer:TRDC2012@157.231.48.239:10000/",
    "http://engineer:TRDC2012@51.219.172.187:10001/",
    "http://engineer:TRDC2012@81.168.73.116:10000/",
    "http://engineer:TRDC2012@151.2.207.41:10000/",
    "http://engineer:TRDC2012@151.2.172.78:10001/",
    "http://engineer:TRDC2012@151.2.207.62:10001/",
    "http://engineer:TRDC2012@164.39.202.150:10001/",
    "http://engineer:TRDC2012@178.211.198.27:10000/",
    "http://engineer:TRDC2012@51.219.32.147:10000/",
    "http://engineer:TRDC2012@91.85.214.102:10001/",
    "http://engineer:TRDC2012@151.2.207.26:10001/",
    "http://engineer:TRDC2012@51.52.225.17:10000/",
    "http://engineer:TRDC2012@157.231.209.118:10000/",
    "http://engineer:TRDC2012@151.2.205.171:10000/",
    "http://engineer:TRDC2012@157.231.36.108:10000/",
    "http://engineer:TRDC2012@164.39.192.16:10001/",
    "http://engineer:TRDC2012@151.2.206.210:10001/",
    "http://engineer:TRDC2012@164.39.225.62:10000/",
    "http://engineer:TRDC2012@157.231.201.101:10000/",
    "http://engineer:TRDC2012@82.153.162.201:10001/",
    "http://engineer:TRDC2012@151.2.207.141:10000/",
    "http://engineer:TRDC2012@51.52.41.39:10000/",
    "http://engineer:TRDC2012@51.219.162.168:10000/",
    "http://engineer:TRDC2012@51.52.113.179:10000/",
    "http://engineer:TRDC2012@81.168.114.126:10001/",
    "http://engineer:TRDC2012@151.2.207.65:10000/",
    "http://engineer:TRDC2012@151.2.190.9:10000/",
    "http://engineer:TRDC2012@164.39.128.13:10001/",
    "http://engineer:TRDC2012@195.166.131.95:10000/",
    "http://engineer:TRDC2012@92.207.184.2:10000/",
    "http://engineer:TRDC2012@92.207.95.228:10001/",
    "http://engineer:TRDC2012@80.252.70.227:10000/",
    "http://engineer:TRDC2012@51.52.46.178:10000/",
    "http://engineer:TRDC2012@51.52.226.112:10000/",
    "http://engineer:TRDC2012@157.231.45.164:10000/",
    "http://engineer:TRDC2012@89.30.233.173:10000/",
    "http://engineer:TRDC2012@164.39.205.236:10001/",
    "http://engineer:TRDC2012@138.248.175.1:10001/",
    "http://engineer:TRDC2012@51.52.112.115:10001/",
    "http://engineer:TRDC2012@157.231.193.104:10000/",
    "http://engineer:TRDC2012@92.207.130.81:10001/",
    "http://engineer:TRDC2012@157.231.9.78:10000/",
    "http://engineer:TRDC2012@92.207.108.252:10000/",
  ];

  console.log(URLs.length);
  console.log(locations.length);

  const locationUrls = locations.reduce((acc, location, index) => {
    acc[location] = URLs[index]; // Map location to its corresponding URL
    return acc;
  }, {});

  console.log(locationUrls);
  return (
    <div className="website">
      <h1 className="title">Heat Pump Data</h1>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="inputs">
          <div>
            <h4>
              <label htmlFor="location-select">Choose a location:</label>
            </h4>
            <select
              id="location-select"
              name="location"
              //value={location}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="form-control form-control-lg"
              required
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <h4>
              <label htmlFor="date">Choose a date:</label>
            </h4>
            <input
              className="form-control form-control-lg"
              id="date"
              type="date"
              placeholder="dd/mm/yyyy"
              //onChange={(e) => setDate(e.target.value)}
              required
            />
            <WebScrape selectedLocation={selectedLocation} />
            <button className="button" type="submit">
              Generate PDF
            </button>
          </div>
        </div>
      </form>
      <HealthReport location={location} date={date} data={data} error={error} />
    </div>
  );
}

export default Inputs;
