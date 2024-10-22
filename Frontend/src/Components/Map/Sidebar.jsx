import { useNavigate } from "react-router-dom";
import { useState } from "react";
let marker = null;
const Sidebar = ({ marker, sidebarRef }) => {
  const navigate = useNavigate();
  const liveData = () => {
    navigate(`/live_data/${marker.site}`);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleGetDirections = () => {
    //const destination = `${marker.latitude},${marker.longitude}`;
    //const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    const destination =
      marker.customer !== "Engineer"
        ? encodeURIComponent(`${marker.site}, ${marker.postcode}`)
        : encodeURIComponent(`${marker.postcode}`);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, "_blank"); // Open Google Maps directions in a new tab
  };
  return (
    <div
      ref={sidebarRef}
      style={marker ? sidebarVisibleStyles : sidebarHiddenStyles}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#1cb683",
          color: "#fff",
          padding: "1%",
          position: "relative",
          justifyContent: "space-between", // Ensures space between the text and image
          alignItems: "center", // Vertically center the content
        }}
      >
        <h4
          style={{
            margin: "4%",
            marginRight: 0,
            width: "50%",
            fontWeight: "bolder",
            color: "black",
            fontSize: "1.4em",
          }}
        >
          {marker?.customer !== "Engineer"
            ? marker?.site.split("- ")[1]
            : marker?.site}
        </h4>
        {marker?.customer !== "Engineer" ? (
          <p
            className="click2"
            style={{
              padding: "1%",
              margin: "0",
              marginLeft: "0%",
              border: "None",
              fontSize: "1.3em",
              fontWeight: "strong",
              color: "black",
            }}
            onClick={liveData}
          >
            Live Data
          </p>
        ) : null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="direction"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="15%"
          cursor="pointer"
          onClick={handleGetDirections}
        >
          <path
            d="M22.115,8.884L14.121,.89c-1.17-1.17-3.072-1.17-4.242,0L1.885,8.884c-.566,.566-.879,1.32-.879,2.121s.312,1.556,.879,2.121l10.115,10.116,10.115-10.115c.566-.566,.879-1.32,.879-2.122s-.312-1.555-.879-2.121Zm-1.414,2.828l-8.701,8.702L3.299,11.711c-.189-.188-.293-.438-.293-.706s.104-.518,.293-.707L11.293,2.304c.195-.195,.451-.292,.707-.292s.512,.097,.707,.292l7.994,7.994c.188,.189,.293,.44,.293,.707s-.104,.518-.293,.707Zm-4.236-3.003c.345,.344,.535,.803,.535,1.291s-.19,.947-.536,1.292l-2.757,2.758-1.414-1.414,1.635-1.636h-2.928c-.552,0-1,.448-1,1v3.586l-2-2v-1.585c0-1.654,1.346-3,3-3h2.928l-1.635-1.636,1.414-1.414,2.758,2.759Z"
            fill="#fff"
          />
        </svg>
      </div>
      {marker?.customer !== "Engineer" ? (
        <div style={{ padding: "4%", position: "relative" }}>
          <p>
            <strong>Lodge:</strong> {marker?.site.split(" - ")[0]}
          </p>
          <p>
            <strong>Customer:</strong> {marker?.customer}
          </p>
          <p>
            <strong>Type:</strong> {marker?.type}
          </p>
          <p>
            <strong>Postcode:</strong> {marker?.postcode}
          </p>
        </div>
      ) : (
        <div style={{ padding: "4%", position: "relative" }}>
          <p>
            <strong>Engineer:</strong> {marker?.site}
          </p>

          <p>
            <strong>Postcode:</strong> {marker?.postcode}
          </p>
        </div>
      )}
    </div>
  );
};

// Sidebar styles (you can adjust these to match your design)
const sidebarVisibleStyles = {
  position: "fixed",
  left: 0,
  top: 0,
  width: "25%",
  height: "100%",
  backgroundColor: "#f8f9fa",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  transition: "left 0.5s ease-in-out",
  color: "#3b4049",
};

const sidebarHiddenStyles = {
  ...sidebarVisibleStyles,
  left: "-30%", // Hidden state: position the sidebar off-screen
};

const buttonStyles = {
  marginTop: "20px",
  padding: "10px 15px",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

export default Sidebar;
