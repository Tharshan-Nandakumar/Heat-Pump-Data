import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { useState } from "react";
import Rendesco from "../Images/Rendesco.png";
const Navbar = ({ handleLogoutRedirect }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <nav className="NavbarItems">
      <img
        id="logo_main"
        src={Rendesco}
        alt="Rendesco logo"
        style={{
          width: "20%",
          maxWidth: "300px",
          minWidth: "200px",
          paddingLeft: "4%",
        }}
      />
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.title === "Logout" ? (
                <div
                  style={{
                    padding: clicked ? "2em" : "0",
                    marginLeft: clicked ? "0" : "8vw",
                  }}
                >
                  <a className={item.cName} onClick={handleLogoutRedirect}>
                    {item.title}
                  </a>
                </div>
              ) : (
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {/* <button
        onClick={handleLogoutRedirect}
        style={{
          position: "absolute",
          margin: " -1% 0 0 85%",
          width: "auto",
          padding: "0.2% 0.5%",
        }}
      >
        Logout
      </button> */}
    </nav>
  );
};

export default Navbar;
