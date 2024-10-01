import PropTypes from "prop-types";
import schematic from "../Images/schematic.png";
import DHW_Data from "./Data/DHW_Data/DHW_Data_Fetch";
import DHW_Data_Render from "./Data/DHW_Data/DHW_Data_Render";
import DHW_Status_Data from "./Data/DHW_Data/DHW_Status_Data";
import HTG_Data from "./Data/HTG_Data/HTG_Data_Fetch";
import HTG_Data_Render from "./Data/HTG_Data/HTG_Data_Render";
import HTG_Status_Data from "./Data/HTG_Data/HTG_Status_Data";
import InfoIcon from "../InfoIcons/Icons";
import Link_Buttons from "../Links/Link_Buttons";
import Table from "./Data/Summary/Table";

const WebScrape = ({ selectedLocation }) => {
  const { A103, A104, A105, A106 } = DHW_Status_Data(selectedLocation);
  const { A103_HTG, A104_HTG, A105_HTG, A106_HTG } =
    HTG_Status_Data(selectedLocation);
  const {
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
  } = DHW_Data(selectedLocation);
  const {
    Ext_T_HTG,
    Flow_T_HTG,
    Heating_T_HTG,
    HS_Out_T_HTG,
    HS_In_T_HTG,
    High_P_HTG,
    Low_P_HTG,
    request_HTG,
    HTG_set_T,
  } = HTG_Data(selectedLocation);

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <img
          src={schematic}
          alt="Plant Room Schematic"
          style={{ width: "100%", height: "auto", margin: "1% auto" }}
        />
        <DHW_Data_Render
          DHW_T={DHW_T}
          Ext_T={Ext_T}
          Flow_T={Flow_T}
          Heating_T={Heating_T}
          HS_Out_T={HS_Out_T}
          HS_In_T={HS_In_T}
          High_P={High_P}
          Low_P={Low_P}
          request_DHW={request_DHW}
          DHWrequest_HTG={DHWrequest_HTG}
          DHW_set_T_HTG={DHW_set_T_HTG}
          DHW_set_T_DHW={DHW_set_T_DHW}
        />
        <HTG_Data_Render
          Ext_T_HTG={Ext_T_HTG}
          Flow_T_HTG={Flow_T_HTG}
          Heating_T_HTG={Heating_T_HTG}
          HS_Out_T_HTG={HS_Out_T_HTG}
          HS_In_T_HTG={HS_In_T_HTG}
          High_P_HTG={High_P_HTG}
          Low_P_HTG={Low_P_HTG}
          request_HTG={request_HTG}
          HTG_set_T={HTG_set_T}
        />
        <Link_Buttons selectedLocation={selectedLocation} />
        <InfoIcon />
        <Table
          selectedLocation={selectedLocation}
          DHW_T={DHW_T}
          Ext_T={Ext_T}
          Flow_T={Flow_T}
          Heating_T={Heating_T}
          HS_Out_T={HS_Out_T}
          HS_In_T={HS_In_T}
          High_P={High_P}
          Low_P={Low_P}
          request_DHW={request_DHW}
          DHWrequest_HTG={DHWrequest_HTG}
          DHW_set_T_HTG={DHW_set_T_HTG}
          DHW_set_T_DHW={DHW_set_T_DHW}
          Ext_T_HTG={Ext_T_HTG}
          Flow_T_HTG={Flow_T_HTG}
          Heating_T_HTG={Heating_T_HTG}
          HS_Out_T_HTG={HS_Out_T_HTG}
          HS_In_T_HTG={HS_In_T_HTG}
          High_P_HTG={High_P_HTG}
          Low_P_HTG={Low_P_HTG}
          request_HTG={request_HTG}
          HTG_set_T={HTG_set_T}
          A103={A103}
          A104={A104}
          A105={A105}
          A106={A106}
          A103_HTG={A103_HTG}
          A104_HTG={A104_HTG}
          A105_HTG={A105_HTG}
          A106_HTG={A106_HTG}
        />
      </div>
    </>
  );
};

WebScrape.propTypes = {
  selectedLocation: PropTypes.string,
};

export default WebScrape;
