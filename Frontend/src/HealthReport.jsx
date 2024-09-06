//import Spinner from "./Components/Spinner/Spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";
import logo from "./rendesco.png";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Spinner from "./Components/Spinner/Spinner";

const HealthReport = ({ location, date, data, error }) => {
  const [faultCodesArray, setfaultCodesArray] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    Pass: 0,
    Warning: 0,
    Fault: 0,
    "N/A": 0,
  }); // State to hold counts for each status
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
    Fault: "red",
    Warning: "yellow",
    Pass: "#66FF00",
    "N/A": "white",
  };

  // Function to map status values to their respective labels
  const mapStatus = (status) => {
    switch (status) {
      case "0.0":
        return "Pass";
      case "0.5":
        return "Warning";
      case "1.0":
        return "Fault";
      case "-99.0":
        return "N/A";
      default:
        return "Unknown"; // Handle unexpected values, if necessary
    }
  };

  // Use useEffect to detect when the data has been set
  useEffect(() => {
    if (data && data.length > 0) {
      const faultCodes = [];
      let counts = { Pass: 0, Warning: 0, Fault: 0, "N/A": 0 }; // Reset counts to zero

      for (let i = 1; i <= 63; i++) {
        const formattedNumber = i.toString().padStart(3, "0"); // Pads the number with leading zeros to ensure it has 3 digits
        const faultCode = `FC_${formattedNumber}`;

        const faultObject = {
          fault_code: faultCode,
          status: mapStatus(data[0][faultCode]),
          description: descriptions[i - 1],
        };

        // Increment the appropriate count based on the status
        if (counts[faultObject.status] !== undefined) {
          counts[faultObject.status] += 1;
        }

        faultCodes.push(faultObject);
        setStatusCounts(counts);
      }

      setfaultCodesArray(faultCodes);
    } else if (date && !data) {
      const faultCodes = [];
      for (let i = 1; i <= 63; i++) {
        const formattedNumber = i.toString().padStart(3, "0"); // Pads the number with leading zeros to ensure it has 3 digits
        const faultCode = `FC_${formattedNumber}`;

        const faultObject = {
          fault_code: faultCode,
          status: "N/A",
          description: descriptions[i - 1],
        };
        faultCodes.push(faultObject);
      }
      setfaultCodesArray(faultCodes);
      setStatusCounts({
        Pass: 0,
        Warning: 0,
        Fault: 0,
        "N/A": 63,
      });
    }
  }, [data, date, error]);

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
  console.log(error);
  return (
    <div>
      {error && <p className="error">{error}</p>}
      {data === null && !error && <Spinner />}
      {faultCodesArray.length !== 0 && !error && (
        <div id="heat_pump_data">
          <div className="table-heading">
            <h1 id="health_report">Health Report</h1>
            <img id="logo" src={logo} alt="Rendesco logo" />
          </div>
          <div className="data">
            <h4>
              <span className="site-info">
                Site: {location.replace("_", " ")}
              </span>
              <span className="date-info">Date: {date}</span>
            </h4>
            <h6>
              <span className="passes">Passes: {statusCounts.Pass}</span>
              <span className="faults">Faults: {statusCounts.Fault}</span>
              <span className="warnings">Warnings: {statusCounts.Warning}</span>
              <span className="nas">N/As: {statusCounts["N/A"]}</span>
            </h6>

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
                    <td style={{ backgroundColor: statusColours[d.status] }}>
                      {d.fault_code}
                    </td>
                    <td style={{ backgroundColor: statusColours[d.status] }}>
                      {d.status}
                    </td>
                    <td style={{ backgroundColor: statusColours[d.status] }}>
                      <nobr>{d.description}</nobr>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {faultCodesArray.length !== 0 && !error && (
        <button className="export_button" onClick={exportPDF}>
          Export as PDF
        </button>
      )}
    </div>
  );
};

HealthReport.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
};

export default HealthReport;

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
