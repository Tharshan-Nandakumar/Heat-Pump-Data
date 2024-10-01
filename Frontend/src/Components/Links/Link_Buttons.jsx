import HTG_Links from "./HTG_Links";
import DHW_Links from "./DHW_Links";
import PropTypes from "prop-types";

const Link_Buttons = ({ selectedLocation }) => {
  return (
    <>
      {" "}
      <p
        style={{
          position: "absolute",
          top: "69.2%", // Different position for another text
          left: "43.7%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        DHW
      </p>
      <a
        href={DHW_Links[selectedLocation]}
        target="_blank"
        className="icon-link"
        title="Go to website"
        style={{
          position: "absolute",
          top: "71.5%", // Different position for another text
          left: "44.3%",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        <i className="fas fa-external-link-alt"></i>
      </a>
      <p
        style={{
          position: "absolute",
          top: "69.2%", // Different position for another text
          left: "15%",
          color: "#3b4049",
          fontSize: "0.7vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        HTG
      </p>
      <a
        href={HTG_Links[selectedLocation]}
        target="_blank"
        className="icon-link"
        title="Go to website"
        style={{
          position: "absolute",
          top: "71.5%", // Different position for another text
          left: "15.5%",
          fontSize: "0.8vw", // Text size scales with viewport width
          fontWeight: "bold",
        }}
      >
        <i className="fas fa-external-link-alt"></i>
      </a>
    </>
  );
};

Link_Buttons.propTypes = {
  selectedLocation: PropTypes.string,
};

export default Link_Buttons;
