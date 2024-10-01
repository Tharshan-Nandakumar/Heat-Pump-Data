import PropTypes from "prop-types";

const Status = ({
  A103,
  A104,
  A105,
  A106,
  A103_HTG,
  A104_HTG,
  A105_HTG,
  A106_HTG,
  show,
}) => {
  function translate_fault_line_1(A105) {
    return A105 == "0.1"
      ? "N171"
      : A105 == "0.2"
      ? "N172"
      : A105 == "0.3"
      ? "N173"
      : A105 == "0.4"
      ? "N174"
      : A105 == "0.6"
      ? "EvD"
      : A105 == "0.7"
      ? "SmartRTC"
      : A105 == "1.5"
      ? "Sensor"
      : A105 == "1.6"
      ? "Low Pressure Brine"
      : A105 == "1.9"
      ? "Primary Circuit"
      : A105 == "2.1"
      ? "Low Pressure Brine"
      : A105 == "2.2"
      ? "Hot Water"
      : A105 == "2.3"
      ? "Compressor Load"
      : A105 == "2.4"
      ? "Coding"
      : A105 == "2.5"
      ? "Low Pressure"
      : A105 == "2.6"
      ? "Frost Protection"
      : A105 == "2.8"
      ? "High Pressure"
      : A105 == "2.9"
      ? "Temperature Difference"
      : A105 == "3.0"
      ? "High Temperature Thermostat"
      : A105 == "3.1"
      ? "Flow"
      : "";
  }

  return (
    <>
      {A103 !== "3.0" && (
        <td
          style={
            A103 == "" || A103 == "N/A"
              ? { backgroundColor: "white" }
              : A103 == "0.0" || A103 == "0.1"
              ? { backgroundColor: "#D3D3D3" }
              : { backgroundColor: "#66FF00" }
          }
        >
          {A103 == "0.0" || A103 == "0.1"
            ? "Heat Pump Off"
            : A103 == "0.2"
            ? "Heating"
            : A103 == "0.3"
            ? "Swimming Pool"
            : A103 == "0.4"
            ? "Domestic Hot Water"
            : A103 == "0.5"
            ? "Cooling"
            : A103 == "1.0"
            ? "Defrosting"
            : A103 == "1.1"
            ? "Flow Monitoring"
            : A103 == "3.0"
            ? "Heat Pump Block"
            : A103}
        </td>
      )}

      {A103 == "3.0" && A104 !== "3.5" && (
        <td
          style={
            A104 == ""
              ? { backgroundColor: "white" }
              : { backgroundColor: "yellow" }
          }
        >
          {show === "Yes" ? (
            <>
              Heat Pump Block
              <br />
            </>
          ) : (
            ""
          )}
          {A104 == "0.6"
            ? "Operating Limit"
            : A104 == "0.7"
            ? "System Control"
            : A104 == "0.9"
            ? "Pump Forerun"
            : A104 == "1.0"
            ? "Minimum Service Life"
            : A104 == "1.1"
            ? "Network Load"
            : A104 == "1.2"
            ? "Switch Cycle Block"
            : A104 == "1.3"
            ? "DHW reheating"
            : A104 == "1.4"
            ? "Regenerative"
            : A104 == "1.5"
            ? "EVU"
            : A104 == "1.6"
            ? "Soft Starter"
            : A104 == "1.7"
            ? "Flow"
            : A104 == "1.8"
            ? "Operating Limit Heat Pump"
            : A104 == "1.9"
            ? "High Pressure"
            : A104 == "2.0"
            ? "Low Pressure"
            : A104 == "2.1"
            ? "Operating Limit Heat Source"
            : A104 == "2.3"
            ? "System Boundary"
            : A104 == "2.5"
            ? "External"
            : A104 == "3.4"
            ? "2nd Gen Generator"
            : A104 == "3.5"
            ? "Fault"
            : ""}
        </td>
      )}
      {A103 == "3.0" && A104 == "3.5" && (
        <td
          style={
            A106 == ""
              ? { backgroundColor: "white" }
              : { backgroundColor: "red" }
          }
        >
          {show === "Yes" ? (
            <>
              Fault
              <br />
            </>
          ) : (
            ""
          )}
          {A106 == "0.0"
            ? ""
            : A106 == "0.1"
            ? "Outdoor Sensor"
            : A106 == "0.2"
            ? "Return Flow Sensor"
            : A106 == "0.3"
            ? "Hot Water Sensor"
            : A106 == "0.4"
            ? "Coding"
            : A106 == "0.5"
            ? "Flow Sensor"
            : A106 == "0.6"
            ? "HK2"
            : A106 == "0.7"
            ? "HK3"
            : A106 == "0.8"
            ? "Regenerative"
            : A106 == "0.9"
            ? "Room Temperature"
            : A106 == "1.0"
            ? "Room Temperature"
            : A106 == "1.1"
            ? "Well Exit"
            : A106 == "1.2"
            ? "Well Entry"
            : A106 == "1.3"
            ? translate_fault_line_1(A105)
            : A106 == "1.4"
            ? "Collector Sensor"
            : A106 == "1.5"
            ? "Low Pressure Sensor"
            : A106 == "1.6"
            ? "High Pressure Sensor"
            : A106 == "1.7"
            ? "Humidity Sensor"
            : A106 == "1.8"
            ? "Humidity Sensor"
            : A106 == "1.9"
            ? "Frost Protection Cooling"
            : A106 == "2.0"
            ? "Hot Gas"
            : A106 == "2.1"
            ? "Return Flow Sensor"
            : A106 == "2.2"
            ? "Swimming Pool Sensor"
            : A106 == "2.3"
            ? "Forerun Passive"
            : A106 == "2.4"
            ? "Return Flow Passive"
            : A106 == "2.5"
            ? "Heat Source"
            : A106 == "2.6"
            ? "Solar Storage"
            : A106 == "2.7"
            ? "Solar Storage"
            : A106 == "2.9"
            ? "Smart RTM"
            : ""}
        </td>
      )}
      {A103_HTG !== "3.0" && (
        <td
          style={
            A103_HTG == "" || A103_HTG == "N/A"
              ? { backgroundColor: "white" }
              : A103_HTG == "0.0" || A103_HTG == "0.1"
              ? { backgroundColor: "#D3D3D3" }
              : { backgroundColor: "#66FF00" }
          }
        >
          {A103_HTG == "0.0" || A103_HTG == "0.1"
            ? "Heat Pump Off"
            : A103_HTG == "0.2"
            ? "Heating"
            : A103_HTG == "0.3"
            ? "Swimming Pool"
            : A103_HTG == "0.4"
            ? "Domestic Hot Water"
            : A103_HTG == "0.5"
            ? "Cooling"
            : A103_HTG == "1.0"
            ? "Defrosting"
            : A103_HTG == "1.1"
            ? "Flow Monitoring"
            : A103_HTG == "3.0"
            ? "Heat Pump Block"
            : A103_HTG}
        </td>
      )}
      {A103_HTG == "3.0" && A104_HTG !== "3.5" && (
        <td
          style={
            A104_HTG == ""
              ? { backgroundColor: "white" }
              : { backgroundColor: "yellow" }
          }
        >
          {show === "Yes" ? (
            <>
              Heat Pump Block
              <br />
            </>
          ) : (
            ""
          )}
          {A104_HTG == "0.6"
            ? "Operating Limit"
            : A104_HTG == "0.7"
            ? "System Control"
            : A104_HTG == "0.9"
            ? "Pump Forerun"
            : A104_HTG == "1.0"
            ? "Minimum Service Life"
            : A104_HTG == "1.1"
            ? "Network Load"
            : A104_HTG == "1.2"
            ? "Switch Cycle Block"
            : A104_HTG == "1.3"
            ? "DHW reheating"
            : A104_HTG == "1.4"
            ? "Regenerative"
            : A104_HTG == "1.5"
            ? "EVU"
            : A104_HTG == "1.6"
            ? "Soft Starter"
            : A104_HTG == "1.7"
            ? "Flow"
            : A104_HTG == "1.8"
            ? "Operating Limit Heat Pump"
            : A104_HTG == "1.9"
            ? "High Pressure"
            : A104_HTG == "2.0"
            ? "Low Pressure"
            : A104_HTG == "2.1"
            ? "Operating Limit Heat Source"
            : A104_HTG == "2.3"
            ? "System Boundary"
            : A104_HTG == "2.5"
            ? "External"
            : A104_HTG == "3.4"
            ? "2nd Gen Generator"
            : A104_HTG == "3.5"
            ? "Fault"
            : ""}
        </td>
      )}
      {A103_HTG == "3.0" && A104_HTG == "3.5" && (
        <td
          style={
            A106_HTG == ""
              ? { backgroundColor: "white" }
              : { backgroundColor: "red" }
          }
        >
          {show === "Yes" ? (
            <>
              Fault
              <br />
            </>
          ) : (
            ""
          )}
          {A106_HTG == "0.0"
            ? ""
            : A106_HTG == "0.1"
            ? "Outdoor Sensor"
            : A106_HTG == "0.2"
            ? "Return Flow Sensor"
            : A106_HTG == "0.3"
            ? "Hot Water Sensor"
            : A106_HTG == "0.4"
            ? "Coding"
            : A106_HTG == "0.5"
            ? "Flow Sensor"
            : A106_HTG == "0.6"
            ? "HK2"
            : A106_HTG == "0.7"
            ? "HK3"
            : A106_HTG == "0.8"
            ? "Regenerative"
            : A106_HTG == "0.9"
            ? "Room Temperature"
            : A106_HTG == "1.0"
            ? "Room Temperature"
            : A106_HTG == "1.1"
            ? "Well Exit"
            : A106_HTG == "1.2"
            ? "Well Entry"
            : A106_HTG == "1.3"
            ? translate_fault_line_1(A105_HTG)
            : A106_HTG == "1.4"
            ? "Collector Sensor"
            : A106_HTG == "1.5"
            ? "Low Pressure Sensor"
            : A106_HTG == "1.6"
            ? "High Pressure Sensor"
            : A106_HTG == "1.7"
            ? "Humidity Sensor"
            : A106_HTG == "1.8"
            ? "Humidity Sensor"
            : A106_HTG == "1.9"
            ? "Frost Protection Cooling"
            : A106_HTG == "2.0"
            ? "Hot Gas"
            : A106_HTG == "2.1"
            ? "Return Flow Sensor"
            : A106_HTG == "2.2"
            ? "Swimming Pool Sensor"
            : A106_HTG == "2.3"
            ? "Forerun Passive"
            : A106_HTG == "2.4"
            ? "Return Flow Passive"
            : A106_HTG == "2.5"
            ? "Heat Source"
            : A106_HTG == "2.6"
            ? "Solar Storage"
            : A106_HTG == "2.7"
            ? "Solar Storage"
            : A106_HTG == "2.9"
            ? "Smart RTM"
            : ""}
        </td>
      )}
    </>
  );
};

Status.propTypes = {
  A103: PropTypes.string,
  A104: PropTypes.string,
  A105: PropTypes.string,
  A106: PropTypes.string,
  A103_HTG: PropTypes.string,
  A104_HTG: PropTypes.string,
  A105_HTG: PropTypes.string,
  A106_HTG: PropTypes.string,
  show: PropTypes.string,
};

export default Status;
