import { useState } from "react";
import axios from "axios";
import HealthReport from "../../HealthReport";
function Inputs() {
  const [location, setLocation] = useState("Aldridge");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setData(null);
    setError(null);
    axios
      .post("http://18.133.213.210:3306/locs", {
        location,
        date,
      })
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control form-control-lg"
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
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <HealthReport location={location} date={date} data={data} error={error} />
    </div>
  );
}

export default Inputs;
