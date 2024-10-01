import Status from "./Status";
import PropTypes from "prop-types";

const Table = ({
  selectedLocation,
  DHW_T,
  Ext_T,
  Flow_T,
  Heating_T,
  HS_Out_T,
  HS_In_T,
  High_P,
  Low_P,
  request_DHW,
  DHWrequest_HTG,
  DHW_set_T_HTG,
  DHW_set_T_DHW,
  Ext_T_HTG,
  Flow_T_HTG,
  Heating_T_HTG,
  HS_Out_T_HTG,
  HS_In_T_HTG,
  High_P_HTG,
  Low_P_HTG,
  request_HTG,
  HTG_set_T,
  A103,
  A104,
  A105,
  A106,
  A103_HTG,
  A104_HTG,
  A105_HTG,
  A106_HTG,
}) => {
  return (
    <>
      <table
        id="live_data"
        style={{
          position: "absolute",
          top: "59.5%", // Different position for another text
          left: "74.2%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        <thead>
          <tr>
            <th>{selectedLocation.replace("_", " ")}</th>
            <th>DHW</th>
            <th>HTG</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>External Temp</td>
            <td>{Ext_T} °C</td>
            <td>{Ext_T_HTG}°C</td>
          </tr>
          <tr>
            <td>Flow Temp</td>
            <td>{Flow_T} °C</td>
            <td>{Flow_T_HTG} °C</td>
          </tr>
          <tr>
            <td>Heating Return Set Temp</td>
            <td>{DHW_set_T_HTG} °C</td>
            <td>{HTG_set_T} °C</td>
          </tr>
          <tr>
            <td>Heating Return Temp</td>
            <td>{Heating_T} °C</td>
            <td>{Heating_T_HTG} °C</td>
          </tr>
          <tr>
            <td>Hot Water Set Point</td>
            <td>{DHW_set_T_DHW} °C</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Hot Water Temp</td>
            <td>{DHW_T} °C</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Heat Source Inlet Temp</td>
            <td>{HS_In_T} °C</td>
            <td>{HS_In_T_HTG} °C</td>
          </tr>
          <tr>
            <td>Heat Source Outlet Temp</td>
            <td>{HS_Out_T} °C</td>
            <td>{HS_Out_T_HTG} °C</td>
          </tr>
          <tr>
            <td>High Pressure Sensor</td>
            <td>{High_P} bar</td>
            <td>{High_P_HTG} bar</td>
          </tr>
          <tr>
            <td>Low Pressure Sensor</td>
            <td>{Low_P} bar</td>
            <td>{Low_P_HTG} bar</td>
          </tr>
          <tr>
            <td>Heating Request</td>
            <td>
              {DHWrequest_HTG == ""
                ? ""
                : DHWrequest_HTG == "N/A"
                ? "N/A"
                : DHWrequest_HTG == "1"
                ? "Yes"
                : "No"}
            </td>
            <td>
              {request_HTG == ""
                ? ""
                : request_HTG == "N/A"
                ? "N/A"
                : request_HTG == "1"
                ? "Yes"
                : "No"}
            </td>
          </tr>
          <tr>
            <td>DHW Request</td>
            <td>
              {request_DHW == ""
                ? ""
                : request_DHW == "N/A"
                ? "N/A"
                : request_DHW == "1"
                ? "Yes"
                : "No"}
            </td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Status</td>
            <Status
              A103={A103}
              A104={A104}
              A105={A105}
              A106={A106}
              A103_HTG={A103_HTG}
              A104_HTG={A104_HTG}
              A105_HTG={A105_HTG}
              A106_HTG={A106_HTG}
            />
          </tr>
        </tbody>
      </table>

      <table
        id="status"
        style={{
          position: "absolute",
          top: "2.5%", // Different position for another text
          left: "34.5%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        <thead>
          <tr>
            <th>DHW</th>
            <th>HTG</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Status
              A103={A103}
              A104={A104}
              A105={A105}
              A106={A106}
              A103_HTG={A103_HTG}
              A104_HTG={A104_HTG}
              A105_HTG={A105_HTG}
              A106_HTG={A106_HTG}
              show={"Yes"}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  selectedLocation: PropTypes.string,
  DHW_T: PropTypes.string,
  Ext_T: PropTypes.string,
  Flow_T: PropTypes.string,
  Heating_T: PropTypes.string,
  HS_Out_T: PropTypes.string,
  HS_In_T: PropTypes.string,
  High_P: PropTypes.string,
  Low_P: PropTypes.string,
  request_DHW: PropTypes.string,
  DHWrequest_HTG: PropTypes.string,
  DHW_set_T_HTG: PropTypes.string,
  DHW_set_T_DHW: PropTypes.string,
  Ext_T_HTG: PropTypes.string,
  Flow_T_HTG: PropTypes.string,
  Heating_T_HTG: PropTypes.string,
  HS_Out_T_HTG: PropTypes.string,
  HS_In_T_HTG: PropTypes.string,
  High_P_HTG: PropTypes.string,
  Low_P_HTG: PropTypes.string,
  request_HTG: PropTypes.string,
  HTG_set_T: PropTypes.string,
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

export default Table;
