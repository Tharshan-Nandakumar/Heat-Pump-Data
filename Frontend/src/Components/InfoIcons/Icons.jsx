import React, { useState, useEffect, useRef } from "react";

const InfoIcon = () => {
  const [activePopup, setActivePopup] = useState(null); // To manage which popup is active
  const [hoveredIcon, setHoveredIcon] = useState(null); // To manage hover state
  const popupRef = useRef(null); // Ref to store the currently active popup

  // Array of icon positions and their corresponding pop-up text
  const icons = [
    {
      id: "DHW HP2",
      top: "66.3%",
      left: "42.3%",
      text: "DHW heat pump (HP2) supplies heating (P2 & P4) and DHW (P2, P5 & P7)",
    },
    {
      id: "HTG HP1",
      top: "66.3%",
      left: "13.3%",
      text: "HTG heat pump (HP1) supplies heating (P1 & P3)",
    },
    {
      id: "Pressure",
      top: "72.5%",
      left: "48.2%",
      text: "Heat pump off: Both pressures at 7-12 bar. Heat pump on: High pressure at 28-41 bar.",
    },
  ];

  // Toggle the popup visibility
  const handleIconClick = (id) => {
    setActivePopup(activePopup === id ? null : id); // Toggle the popup for the clicked icon
  };

  // Close popup when clicking outside the active popup
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActivePopup(null); // Close the popup if clicked outside the active one
    }
  };

  useEffect(() => {
    // Add event listener when the popup is active
    if (activePopup !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePopup]);

  return (
    <div>
      {icons.map((icon) => (
        <React.Fragment key={icon.id}>
          {/* Info Icon */}
          <i
            className="fas fa-info-circle"
            style={{
              position: "absolute",
              top: icon.top,
              left: `calc(${icon.left} + 2%)`, // Adjust icon position slightly to the right
              color: hoveredIcon === icon.id ? "#0056b3" : "#007bff", // Change color on hover
              fontSize: "1vw",
              cursor: "pointer",
            }}
            onClick={() => handleIconClick(icon.id)}
            onMouseEnter={() => setHoveredIcon(icon.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          />

          {/* Popup Message */}
          {activePopup === icon.id && (
            <div
              ref={popupRef} // Set a single ref for the currently active popup
              style={{
                position: "absolute",
                top: `calc(${icon.top} + 3%)`, // Position the popup below the icon
                left: `calc(${icon.left} + 2%)`,
                backgroundColor: "#f9f9f9",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                width: "200px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 100,
              }}
            >
              <p style={{ fontSize: "0.8vw", color: "#3b4049" }}>{icon.text}</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfoIcon;
