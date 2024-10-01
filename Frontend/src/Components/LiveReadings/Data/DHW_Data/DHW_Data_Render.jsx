import spiral from "../../../Images/spiral.gif";
import PropTypes from "prop-types";

const DHW_Data_Render = ({
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
}) => {
  return (
    <>
      {DHWrequest_HTG == "1" && (
        <>
          <img
            src={spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "50.4%",
              left: "31.8%",
              width: "2.5%",
            }}
          />
          <img
            src={spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "76.2%",
              left: "48.8%",
              width: "2.5%",
            }}
          />
        </>
      )}
      {request_DHW == "1" && (
        <>
          <img
            src={spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "43.7%",
              left: "61.9%",
              width: "2.5%",
            }}
          />
          <img
            src={spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "50%",
              left: "42.7%",
              width: "2.5%",
            }}
          />
          <img
            src={spiral}
            alt="HP Running"
            style={{
              position: "absolute",
              top: "76.2%",
              left: "48.8%",
              width: "2.5%",
            }}
          />
        </>
      )}
      <p
        style={{
          position: "absolute",
          top: "32.5%", // Different position for another text
          left: "62.5%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {DHW_T}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "15.5%", // Different position for another text
          left: "42%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        External Temperature: {Ext_T}°C (DHW)
      </p>
      <p
        style={{
          position: "absolute",
          top: "70.1%", // Different position for another text
          left: "49.7%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {HS_In_T}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "74.1%", // Different position for another text
          left: "49.7%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {HS_Out_T}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "68.7%", // Different position for another text
          left: "38%",
          color: "#3b4049",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Flow_T}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "35.8%", // Different position for another text
          left: "15.3%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Heating_T}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "35.8%", // Different position for another text
          left: "19.5%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        Set: {DHW_set_T_HTG}°C (DHW)
      </p>
      <p
        style={{
          position: "absolute",
          top: "38%", // Different position for another text
          left: "67%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        Set: {DHW_set_T_DHW}°C
      </p>
      <p
        style={{
          position: "absolute",
          top: "73%", // Different position for another text
          left: "43.1%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {High_P} bar
      </p>
      <p
        style={{
          position: "absolute",
          top: "75%", // Different position for another text
          left: "43.1%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        {Low_P} bar
      </p>
    </>
  );
};

DHW_Data_Render.propTypes = {
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
};

export default DHW_Data_Render;
