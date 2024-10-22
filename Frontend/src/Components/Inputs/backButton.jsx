const strokeWidth = 20;
let fillColor = "none";
const strokeColor = "#000000";

const BackButton = (
  <svg
    width="3%"
    height="800px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className="back" // Apply the class to enable hover and active effects
    style={{
      position: "absolute",
      cursor: "pointer",
      top: "-360px",
      left: "1%",
      minWidth: "18px",
    }}
    // onClick={handleBack}
  >
    <g data-name="Layer 2" id="Layer_2">
      <g
        data-name="E421, Back, buttons, multimedia, play, stop"
        id="E421_Back_buttons_multimedia_play_stop"
      >
        {/* Outer circle */}
        <circle
          cx="256"
          cy="256"
          r="246"
          fill={fillColor} // Dynamic fill color
          stroke={strokeColor} // Dynamic stroke color
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        {/* Line across the middle */}
        <line
          x1="352.26"
          x2="180.43"
          y1="256"
          y2="256"
          fill={strokeColor}
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        {/* Arrow pointing left */}
        <polyline
          points="223.91 202.52 170.44 256 223.91 309.48"
          fill="none"
          stroke={strokeColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </g>
    </g>
  </svg>
);

export default BackButton;
