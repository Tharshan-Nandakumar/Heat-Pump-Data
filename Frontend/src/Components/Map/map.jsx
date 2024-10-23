import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Circle,
} from "@react-google-maps/api";
import markers from "./markers";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Dial from "../Dials/Dial";

const defaultCenter = {
  lat: 52.7134984,
  lng: -1.198804,
};

function Map() {
  const API_Key = import.meta.env.VITE_GOOGLE_API;
  console.log(API_Key);
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_Key,
  });
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const sidebarRef = useRef(null);
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // Store the search input
  const [filteredMarkers, setFilteredMarkers] = useState([]); // Store filtered marker list
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([
    "Churchill Retirement Living",
    "McCarthy and Stone",
    "Lifestory",
    "Park View Care Home",
    "Engineer",
  ]);
  const inputRef = useRef(null);

  const handleLegendClick = (customer) => {
    console.log(customer);
    if (selectedCustomers.length === 5) {
      console.log(selectedCustomers);
      setSelectedCustomers([customer]);
      console.log(selectedCustomers);
    } else {
      if (selectedCustomers.includes(customer)) {
        console.log(selectedCustomers.length);
        // Remove customer from selected list if already selected

        setSelectedCustomers(selectedCustomers.filter((c) => c !== customer));
      } else {
        // Add customer to the selected list
        setSelectedCustomers([...selectedCustomers, customer]);
        console.log("ij");
      }
    }
  };
  console.log(selectedCustomers.length);
  // Handle search input change and filter marker predictions
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filtered = markers.filter((marker) =>
        marker.site.toLowerCase().includes(value)
      );
      setFilteredMarkers(filtered); // Update filtered list based on input
      if (filteredMarkers.length > 0) {
        const firstMatch = filteredMarkers[0];
        setSelectedMarker(firstMatch);
      }
    } else {
      setFilteredMarkers([]); // Clear the list when input is empty
      setSelectedMarker(null);
    }
  };

  // Handle 'Enter' key to select the first matching marker
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && selectedMarker) {
      handleMarkerClickNavigate(selectedMarker);
    } else if (e.key === "Enter" && filteredMarkers.length > 0) {
      const firstMatch = filteredMarkers[0];
      setSelectedMarker(firstMatch); // Set the selected marker
      console.log(firstMatch);
    }
  };
  //console.log(selectedMarker);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMarkerClickNavigate = (marker) => {
    navigate(`/live_data/${marker.site}`);
  };

  const customerColors = {
    "Churchill Retirement Living": "#3463d0", // Soft Red
    "McCarthy and Stone": "#d96218", // Soft Blue
    Lifestory: "#FFF566", // Soft Yellow
    "Park View Care Home": "#a918d9", // Soft Purple
    Engineer: "#3b4049",
  };

  const handleMarkerMouseOver = (marker) => {
    setHoveredMarker(marker);
  };

  const handleInfoWindowMouseOut = () => {
    setHoveredMarker(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isMarkerClick =
        event.target.tagName === "IMG" &&
        event.target.src.includes(
          "https://maps.gstatic.com/mapfiles/transparent.png"
        );

      // Check if click happened outside the sidebar, input, or any marker
      const isClickOutside =
        !(sidebarRef.current && sidebarRef.current.contains(event.target)) &&
        !(inputRef.current && inputRef.current.contains(event.target)) &&
        !isMarkerClick; // Check if the click is on any marker

      // Only reset selectedMarker if the click was outside of all markers, sidebar, and input
      if (isClickOutside) {
        setSelectedMarker(null); // Close the sidebar only if it's a true outside click
        setSearchTerm("");
        setHoveredMarker(null);
      }
    };

    // Attach event listener when the sidebar is open
    if (selectedMarker !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on component unmount or when sidebar is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMarker, searchTerm, hoveredMarker]);
  // console.log(selectedCustomers);

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Function to update the window size
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize(); // Call to set initial size

      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures this effect runs only on mount

    return windowSize;
  }

  const size = useWindowSize();

  const containerStyle = {
    width: "60%",
    height: "65vh",
    margin: size.width > 660 ? "1.9vh auto" : "1.9vh 5%",
    paddingTop: "1.2%",
    border: "1px solid black",
  };

  const searchBarStyles = {
    position: "relative",
    left: size.width > 660 ? "50%" : "35%",
    transform: "translateX(-50%)",
    minWidth: "150px",
    width: "30%",
    maxWidth: "250px",
    padding: "1%",
    marginBottom: "-2%",
    borderRadius: "1%",
    fontSize: "1em",
    height: "5.5vh",
    border: isFocused ? "3px solid #299f76" : "3px solid #ccc",
    outline: "none",
  };

  return isLoaded ? (
    <>
      <div
        id="dials"
        style={{
          position: "relative",
          marginTop: "0.2%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "90vw",
          minWidth: "20vw",
          marginBottom: "-0.5%",
          padding: 0,
        }}
      >
        <div
          style={{
            padding: "0px",
            margin: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="gauge"
            style={{
              maxWidth: size.width > 660 ? "150px" : "80px",
              minHeight: "80px",
            }}
          >
            <Dial
              value={87}
              label="Control"
              fontsize={size.width > 660 ? "16em" : "14em"}
            />
          </div>
          <p
            style={{
              marginTop: size.width > 660 ? "-18%" : "-38%",
              fontSize: "1.2em",
            }}
          >
            87%
          </p>
        </div>

        <div
          width="0"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="gauge"
            style={{
              maxWidth: size.width > 660 ? "150px" : "80px",
              minHeight: "80px",
            }}
          >
            <Dial
              value={87}
              label="Meter"
              fontsize={size.width > 660 ? "16em" : "14em"}
            />
          </div>
          <p
            style={{
              marginTop: size.width > 660 ? "-18%" : "-38%",
              fontSize: "1.2em",
            }}
          >
            87%
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="gauge"
            style={{
              maxWidth: size.width > 660 ? "150px" : "80px",
              minHeight: "80px",
            }}
          >
            <Dial
              value={96}
              label={size.width > 660 ? "Fault Code (24hrs)" : "Fault Code"}
              fontsize={size.width > 660 ? "16em" : "14em"}
            />
          </div>
          <p
            style={{
              marginTop: size.width > 660 ? "-18%" : "-38%",
              fontSize: "1.2em",
            }}
          >
            96%
          </p>
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <svg
          height="30vh"
          viewBox="0 0 1070 1905"
          fill="none"
          overflow="hidden"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            scale: "8",
            position: "fixed", // Place it in the background
            top: "60%", // Adjust as needed
            left: 0, // Adjust as needed
            transform: "rotate(180deg)", // Rotate 180 degrees
            opacity: 0.2, // Make it faint
            zIndex: -1, // Ensure it's in the background
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <path
            d="M650 1503V0L0 799.5L650 1503Z"
            fill="#299F76"
            style={{ overflow: "hidden" }}
          />
          <path
            d="M650 310L19 1106.56L650 1801"
            stroke="#CCCCCC"
            strokeWidth="9"
            style={{ overflow: "hidden" }}
          />
        </svg>
      </div>
      {/* <p>{size.width}</p> */}
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyPress}
        placeholder="Search for a site..."
        style={searchBarStyles}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <GoogleMap
        id="google_map"
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={6.4}
        options={{ streetViewControl: false, mapTypeControl: false }}
        onLoad={(map) => (mapRef.current = map)}
      >
        <div>
          {markers
            .filter((marker) => selectedCustomers.includes(marker.customer))
            .map((marker) => (
              <MarkerF
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: customerColors[marker.customer],
                  border:
                    selectedMarker && selectedMarker.site === marker.site
                      ? "#1cb683" // Highlight the selected marker
                      : "None",
                  fillOpacity: 1,
                  strokeWeight:
                    selectedMarker && selectedMarker.site === marker.site
                      ? 2
                      : 0,
                  scale:
                    selectedMarker && selectedMarker.site === marker.site
                      ? 6
                      : 4,
                }}
                onMouseOver={() => handleMarkerMouseOver(marker)}
                onClick={
                  selectedMarker && selectedMarker.site === marker.site
                    ? () => handleMarkerClickNavigate(marker)
                    : () => handleMarkerClick(marker)
                }
              />
            ))}

          {hoveredMarker && hoveredMarker.site !== selectedMarker?.site && (
            <div
              onClick={() => {
                setSelectedMarker(hoveredMarker);
                setHoveredMarker(null);
              }}
            >
              <InfoWindowF
                position={{
                  lat: hoveredMarker.latitude,
                  lng: hoveredMarker.longitude,
                }}
                options={{ disableAutoPan: true, headerDisabled: true }}
              >
                <div onMouseOut={handleInfoWindowMouseOut}>
                  <p style={{ margin: "1% 0", fontSize: "0.8em" }}>
                    <strong>Site:</strong> {hoveredMarker.site}
                  </p>
                  <p style={{ margin: "1% 0", fontSize: "0.8em" }}>
                    <strong>Customer:</strong> {hoveredMarker.customer}
                  </p>
                  <p style={{ margin: "1% 0", fontSize: "0.8em" }}>
                    <strong>Type:</strong> {hoveredMarker.type}
                  </p>
                  <p style={{ margin: "1% 0", fontSize: "0.8em" }}>
                    <strong>Postcode:</strong> {hoveredMarker.postcode}
                  </p>
                </div>
              </InfoWindowF>
            </div>
          )}
        </div>
        {/* Child components, such as markers, info windows, etc. */}

        <></>
      </GoogleMap>
      <Sidebar
        marker={selectedMarker}
        sidebarRef={sidebarRef}
        width={size.width}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        {Object.entries(customerColors).map(([customer, color], index) => {
          let displayName;
          if (customer === "Churchill Retirement Living" && size.width < 1350) {
            displayName = customer.split(" ")[0];
          }
          if (customer === "Park View Care Home" && size.width < 1140) {
            displayName = "Park View";
          }
          if (customer === "McCarthy and Stone" && size.width < 1090) {
            displayName = "McCarthy";
          }
          if (customer === "Park View Care Home" && size.width < 675) {
            displayName = "Park";
          }
          return (
            <div
              key={customer}
              onClick={() => handleLegendClick(customer)}
              style={{
                cursor: "pointer",
                padding: "5px 10px",
                opacity: selectedCustomers.includes(customer) ? 1.0 : 0.5,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: size.width > 660 ? "82%" : "67%",
                top: `${40 + index * 6}%`,
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  marginRight: "10px",
                }}
              ></div>
              {displayName ? displayName : customer}
            </div>
          );
        })}
        <button
          style={{
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "5px",
            display: "flex",
            fontSize: "1em",
            alignItems: "center",
            position: "absolute",
            left: size.width > 660 ? "85%" : "70%",
            top: `71%`,
          }}
          onClick={() => {
            setSelectedMarker(null);
            setHoveredMarker(null);
            setSelectedCustomers([
              "Churchill Retirement Living",
              "McCarthy and Stone",
              "Lifestory",
              "Park View Care Home",
              "Engineer",
            ]);
            mapRef.current.setCenter(defaultCenter);
            mapRef.current.setZoom(6.4);
          }}
        >
          Reset
        </button>
      </div>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
