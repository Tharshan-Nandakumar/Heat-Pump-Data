import { useState, useEffect } from "react";
import axios from "axios";
import HealthReport from "../HealthReport/HealthReport";
import WebScrape from "../LiveReadings/WebScrape";
import { useParams, useNavigate } from "react-router-dom";
import backButton from "./backButton";

function Inputs() {
  const { site } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    site.split("- ")[1].replace(" ", "_")
  );
  console.log(selectedLocation);
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setData(null);
    setError(null);
    setLocation(e.target.elements.location.value);
    setDate(e.target.elements.date.value);
    //console.log(Date);
    axios
      .post(
        "https://heat-pump-data-backend.onrender.com/locs" /* "http://localhost:3306/locs*/,
        {
          location: e.target.elements.location.value,
          date: e.target.elements.date.value,
        }
      )
      .then((res) => {
        if (res.data.fatal !== true) {
          //console.log(res.data);
          setData(res.data);
        } else {
          setError(
            "An error occurred while fetching data. Please check/refresh database connection"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setError(
          "An error occurred while fetching data. You may not have access to the data from this IP address"
        );
      });
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        handleBack();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    "Chelmsford",
    "Cheltenham",
    "Chichester",
    "Chippenham",
    "Cirencester",
    "Cowbridge",
    "Crowthorne",
    "Dartford",
    "Deal",
    "Dorking",
    "Drayton",
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
      <div onClick={handleBack}>{backButton}</div>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="inputs" style={{ marginTop: "3%" }}>
          <div>
            <h4>
              <label htmlFor="location-select">Choose a location:</label>
            </h4>
            <select
              id="location-select"
              name="location"
              value={selectedLocation}
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
            <WebScrape selectedLocation={selectedLocation} />
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
            <button className="button" type="submit" style={{ margin: "1% 0" }}>
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
