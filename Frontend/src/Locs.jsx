import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./table.css";
import logo from "./rendesco.png";

const Locs = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setData(null);
    setError(null);
    axios
      .post("http://localhost:8082/locs", {
        location,
        date,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("An error occured while fetching data");
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

  const faultCodesArray = [];
  const descriptions = [
    "External ambient temperature (R1) sensor agreement check",
    "In-line return temperature (R2) sensor agreement check",
    "Flowmeter return temperature (Rtn) sensor agreement check",
    "R2 and HM Rtn sensor agreement check - HP1",
    "R9 and HM Flow sensor agreement check - HP1",
    "R2 and HM Rtn sensor agreement check - HP2",
    "R9 and HM Flow sensor agreement check - HP2",
    "Brine Inlet sensor agreement check",
    "Brine sensor miswiring check - HP1",
    "Brine sensor miswiring check - HP2",
    "Sensor calibration impacting RHI income check - HP1",
    "Sensor calibration impacting RHI income check - HP2",
    "Daily runtime check (<80%) - HP1 M13 Pump",
    "Daily runtime check (<80%) - HP1 M16 Pump",
    "Daily runtime check (<80%) - HP1 M18 Pump",
    "Daily runtime check (<80%) - HP1 M2/11 Pump",
    "HP1 M16 & M2/11 runtime agreement check",
    "Daily runtime check (<80%) - HP2 M13 Pump",
    "Daily runtime check (<80%) - HP2 M16 Pump",
    "Daily runtime check (<80%) - HP2 M18 Pump",
    "Daily runtime check (<80%) - HP2 M2/11 Pump",
    "HP2 M16/M18 & M2/11 runtime agreement check",
    "HP2 M16 & M18 runtime no overlap check",
    "Daily runtime check (<80%) - HP1/HP2 M13 Pump",
    "Daily runtime check (<80%) - HP1/HP2 M16 Pump",
    "Daily runtime check (<80%) - HP1/HP2 M18 Pump",
    "Daily runtime check (<80%) - HP1/HP2 M2/11 Pump",
    "Pump flowrate alignment with design flowrate check - HP1 M16",
    "Pump flowrate alignment with design flowrate check - HP2 M16",
    "Pump flowrate alignment with design flowrate check - HP2 M18",
    "HP1 M1 compressor runtime > 4.5 min minimum check",
    "HP1 M1 compressor runtime < 90 min maximum check",
    "HP1 M2 compressor runtime > 4.5 min minimum check",
    "HP1 M2 compressor runtime < 90 min maximum check",
    "HP1 M1/M2 compressor runtime > 4.5 min minimum check",
    "HP1 M1/M2 compressor runtime < 90 min maximum check",
    "< 15% difference in compressor runtime check - HP1 M1/M2",
    "HP2 M1 compressor runtime > 4.5 min minimum check",
    "HP2 M1 compressor runtime < 90 min maximum check",
    "HP2 M2 compressor runtime > 4.5 min minimum check",
    "HP2 M2 compressor runtime < 90 min maximum check",
    "HP2 M1/M2 compressor runtime > 4.5 min minimum check",
    "HP2 M1/M2 compressor runtime < 90 min maximum check",
    "< 15% difference in compressor runtime check - HP2 M1/M2",
    "HP1 M16 pump forerun/postrun runtimes within tolerances check",
    "HP1 M2/11 pump forerun/postrun runtimes within tolerances check",
    "HP2 M16/M18 pump forerun/postrun runtimes within tolerances check",
    "HP2 M2/11 pump forerun/postrun runtimes within tolerances check",
    "HTG/DHW load ratio within expected norms check",
    "Refridgerant pressure check - HP1",
    "Refridgerant pressure check - HP2",
    "Average brine-side dT check - HP1",
    "Average brine-side dT check - HP2",
    "Brine average inlet temperature check",
    "DHW average temperature check",
    "HP2 M1 heating gradient check",
    "HP2 M2 heating gradient check",
    "HP2 M1/M2 joint - singular heating gradient check",
    "HP2 M1/M2 joint heating gradient check",
    "HP2 M1/M2 joint heating gradient > cooling rate check",
    "DHW cooling rate within tolerances check",
    "DHW disinfection cycle success check",
    "Immersion health check",
  ];

  const statusColours = {
    1.0: "red",
    0.5: "yellow",
    0.0: "#66FF00",
    "N/A": "white",
  };

  const values = [1.0, 0.5, 0.0, "N/A"];
  for (let i = 1; i <= 63; i++) {
    const formattedNumber = i.toString().padStart(3, "0"); // Pads the number with leading zeros to ensure it has 3 digits
    const faultCode = `FC_${formattedNumber}`;

    const faultObject = {
      fault_code: faultCode,
      status: values[Math.floor(Math.random() * 4)],
      description: descriptions[i - 1],
    };

    faultCodesArray.push(faultObject);
  }

  const exportPDF = () => {
    const input = document.getElementById("heat_pump_data"); // The id of the table you want to export
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${location}_${date}_Fault_Codes.pdf`); // The name of the file you want to save
    });
  };

  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="title">Heat Pump Data</h1>
      <form onSubmit={handleSubmit} className="form-group">
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
        <div>
          <h4>
            <label htmlFor="date">Choose a date:</label>
          </h4>
          <input
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>

      {error && <p>{error}</p>}
      {/*data === null && <Spinner />*/}
      {
        <div id="heat_pump_data">
          <div className="table-heading">
            <h1 id="health_report">Health Report</h1>
            <img id="logo" src={logo} alt="Rendesco logo" />
            <h4>
              <span className="site-info">
                Site: {location.replace("_", " ")}
              </span>
              <span className="date-info">Date: {date}</span>
            </h4>
            <h6>
              <span className="passes">Passes: </span>
              <span className="faults">Faults: </span>
              <span className="warnings">Warnings: </span>
              <span className="nas">N/As:</span>
            </h6>
          </div>
          <table id="table">
            <thead>
              <tr>
                <th>Fault Code</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {faultCodesArray.map((d, i) => (
                <tr key={i}>
                  <td>{d.fault_code}</td>
                  <td style={{ backgroundColor: statusColours[d.status] }}>
                    {d.status}
                  </td>
                  <td>
                    <nobr>{d.description}</nobr>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      <button className="button" onClick={exportPDF}>
        Export as PDF
      </button>
    </div>
  );
};

export default Locs;

/*
          <table id="heat_pump_data">
            <thead>
              <tr>
                <th>Date</th>
                <th>Electricity</th>
                <th>Flow Temp</th>
                <th>Heat</th>
                <th>Return Temp</th>
                <th>Site</th>
                <th>Time</th>
                <th>Type</th>
                <th>Volume Flow</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={i}>
                  <td>{d.Date}</td>
                  <td>{d.Electricity}</td>
                  <td>{d.Flow_Temperature}</td>
                  <td>{d.Heat}</td>
                  <td>{d.Return_Temperature}</td>
                  <td>{d.Site}</td>
                  <td>{d.Time}</td>
                  <td>{d.Type}</td>
                  <td>{d.Volume_Flow}</td>
                </tr>
              ))}
            </tbody>
          </table>
          */
