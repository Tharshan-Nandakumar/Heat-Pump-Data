import Spiral from "../../../Images/Spiral.gif";
import PropTypes from "prop-types";

const HTG_Data_Render = ({
  Ext_T_HTG,
  Flow_T_HTG,
  Heating_T_HTG,
  HS_Out_T_HTG,
  HS_In_T_HTG,
  High_P_HTG,
  Low_P_HTG,
  request_HTG,
  HTG_set_T,
}) => {
  return (
    <>
      {request_HTG == "1" && (
        <>
          <img
            src={Spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "49.7%",
              left: "4.3%",
              width: "2.5%",
            }}
          />
          <img
            src={Spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "75.8%",
              left: "20.2%",
              width: "2.5%",
            }}
          />
        </>
      )}
      <p
        style={{
          position: "absolute",
          top: "17%", // Different position for another text
          left: "42.2%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        External Temperature: {Ext_T_HTG}°C (HTG)
      </p>
      <p
        style={{
          position: "absolute",
          top: "70.1%", // Different position for another text
          left: "20.7%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {HS_In_T_HTG}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "74.1%", // Different position for another text
          left: "20.7%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {HS_Out_T_HTG}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "68.7%", // Different position for another text
          left: "9.5%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Flow_T_HTG}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "39.2%", // Different position for another text
          left: "15.3%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Heating_T_HTG}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "39.2%", // Different position for another text
          left: "19.5%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        Set: {HTG_set_T}°C (HTG)
      </p>
      <p
        style={{
          position: "absolute",
          top: "73%", // Different position for another text
          left: "14.1%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {High_P_HTG} bar
      </p>
      <p
        style={{
          position: "absolute",
          top: "75%", // Different position for another text
          left: "14.1%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Low_P_HTG} bar
      </p>
    </>
  );
};

HTG_Data_Render.propTypes = {
  Ext_T_HTG: PropTypes.string,
  Flow_T_HTG: PropTypes.string,
  Heating_T_HTG: PropTypes.string,
  HS_Out_T_HTG: PropTypes.string,
  HS_In_T_HTG: PropTypes.string,
  High_P_HTG: PropTypes.string,
  Low_P_HTG: PropTypes.string,
  request_HTG: PropTypes.string,
  HTG_set_T: PropTypes.string,
};

export default HTG_Data_Render;
