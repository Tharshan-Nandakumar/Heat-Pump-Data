//import axios from "axios";
//import * as XLSX from "xlsx";
//import moment from "moment";
import { useState, useEffect } from "react";
import * as cheerio from "cheerio";
import PropTypes from "prop-types";
import schematic from "./Schematic.png";
import spiral from "./Spiral.gif";

const DHW_Links = {
  Aldridge:
    "http://engineer:TRDC2012@151.2.207.146:10001/http/index/j_operatingdata.html",
  Ashtead:
    "http://engineer:TRDC2012@151.2.212.222:10000/http/index/j_operatingdata.html",
  Aylesbury:
    "http://engineer:TRDC2012@151.2.172.112:10001/http/index/j_operatingdata.html",
  Bagshot:
    "http://engineer:TRDC2012@51.52.116.223:10001/http/index/j_operatingdata.html",
  Bicester:
    "http://engineer:TRDC2012@82.152.38.63:10001/http/index/j_operatingdata.html",
  Billericay:
    "http://engineer:TRDC2012@51.219.6.1:10000/http/index/j_operatingdata.html",
  Bishops_Waltham:
    "http://engineer:TRDC2012@212.159.33.100:10000/http/index/j_operatingdata.html",
  Bourne_End:
    "http://engineer:TRDC2012@157.231.48.75:10000/http/index/j_operatingdata.html",
  Bridport:
    "http://engineer:TRDC2012@151.2.190.42:10000/http/index/j_operatingdata.html",
  Burnham:
    "http://engineer:TRDC2012@157.231.60.231:10000/http/index/j_operatingdata.html",
  Carshalton:
    "http://engineer:TRDC2012@151.2.239.130:10001/http/index/j_operatingdata.html",
  Cheam:
    "http://engineer:TRDC2012@164.39.129.41:10001/http/index/j_operatingdata.html",
  Cheltenham:
    "http://engineer:TRDC2012@164.39.192.226:10000/http/index/j_operatingdata.html",
  Chichester:
    "http://engineer:TRDC2012@157.231.58.139:10001/http/index/l_operatingdata.html",
  Chippenham:
    "http://engineer:TRDC2012@51.52.37.39:10000/http/index/j_operatingdata.html",
  Cirencester:
    "http://engineer:TRDC2012@51.52.37.205:10000/http/index/j_operatingdata.html",
  Cowbridge:
    "http://engineer:TRDC2012@92.207.67.127:10001/http/index/j_operatingdata.html",
  Crowthorne:
    "http://engineer:TRDC2012@92.207.66.164:10000/http/index/j_operatingdata.html",
  Dartford:
    "http://engineer:TRDC2012@164.39.226.242:10000/http/index/j_operatingdata.html",
  Deal: "http://engineer:TRDC2012@51.219.232.202:10000/http/index/j_operatingdata.html",
  Dorking:
    "http://engineer:TRDC2012@51.52.35.57:10000/http/index/j_operatingdata.html",
  East_Grinstead:
    "http://engineer:TRDC2012@164.39.205.205:10000/http/index/j_operatingdata.html",
  Eastbourne:
    "http://engineer:TRDC2012@138.248.138.209:10000/http/index/j_operatingdata.html",
  Eastleigh:
    "http://engineer:TRDC2012@157.231.195.16:10000/http/index/j_operatingdata.html",
  Eltham:
    "http://engineer:TRDC2012@138.248.171.194:10000/http/index/j_operatingdata.html",
  Frinton:
    "http://engineer:TRDC2012@178.211.198.25:10001/http/index/j_operatingdata.html",
  Haverhill:
    "http://engineer:TRDC2012@157.231.48.239:10000/http/index/j_operatingdata.html",
  Highcliffe:
    "http://engineer:TRDC2012@51.219.172.187:10001/http/index/j_operatingdata.html",
  Hitchin:
    "http://engineer:TRDC2012@81.168.73.116:10000/http/index/j_operatingdata.html",
  Huntingdon:
    "http://engineer:TRDC2012@151.2.207.41:10000/http/index/j_operatingdata.html",
  Hythe:
    "http://engineer:TRDC2012@151.2.172.78:10001/http/index/j_operatingdata.html",
  Knowle:
    "http://engineer:TRDC2012@151.2.207.62:10001/http/index/j_operatingdata.html",
  Littlehampton:
    "http://engineer:TRDC2012@164.39.202.150:10001/http/index/j_operatingdata.html",
  Ludlow:
    "http://engineer:TRDC2012@178.211.198.27:10000/http/index/j_operatingdata.html",
  Lymington:
    "http://engineer:TRDC2012@51.219.32.147:10000/http/index/j_operatingdata.html",
  Maidstone:
    "http://engineer:TRDC2012@91.85.214.102:10001/http/index/j_operatingdata.html",
  Marlow:
    "http://engineer:TRDC2012@151.2.207.26:10001/http/index/j_operatingdata.html",
  Newquay:
    "http://engineer:TRDC2012@51.52.225.17:10000/http/index/j_operatingdata.html",
  Orpington:
    "http://engineer:TRDC2012@157.231.209.118:10000/http/index/j_operatingdata.html",
  Park_Gate:
    "http://engineer:TRDC2012@151.2.205.171:10000/http/index/j_operatingdata.html",
  Peacehaven:
    "http://engineer:TRDC2012@157.231.36.108:10000/http/index/j_operatingdata.html",
  Penrith:
    "http://engineer:TRDC2012@164.39.192.16:10001/http/index/j_operatingdata.html",
  Pinner:
    "http://engineer:TRDC2012@151.2.206.210:10001/http/index/j_operatingdata.html",
  Poole:
    "http://engineer:TRDC2012@164.39.225.62:10000/http/index/j_operatingdata.html",
  Portswood:
    "http://engineer:TRDC2012@157.231.201.101:10000/http/index/j_operatingdata.html",
  Princes_Ris:
    "http://engineer:TRDC2012@82.153.162.201:10001/http/index/j_operatingdata.html",
  Quinton:
    "http://engineer:TRDC2012@151.2.207.141:10000/http/index/j_operatingdata.html",
  Reigate:
    "http://engineer:TRDC2012@51.52.41.39:10000/http/index/j_operatingdata.html",
  Sandhurst:
    "http://engineer:TRDC2012@51.219.162.168:10000/http/index/j_operatingdata.html",
  Selsdon:
    "http://engineer:TRDC2012@51.52.113.179:10000/http/index/j_operatingdata.html",
  Shepperton:
    "http://engineer:TRDC2012@81.168.114.126:10001/http/index/j_operatingdata.html",
  Shirley:
    "http://engineer:TRDC2012@151.2.207.65:10000/http/index/j_operatingdata.html",
  Sidford:
    "http://engineer:TRDC2012@151.2.190.9:10000/http/index/j_operatingdata.html",
  Sittingbourne:
    "http://engineer:TRDC2012@164.39.128.13:10001/http/index/j_operatingdata.html",
  Sketty:
    "http://engineer:TRDC2012@195.166.131.95:10000/http/index/j_operatingdata.html",
  Southgate:
    "http://engineer:TRDC2012@92.207.184.2:10000/http/index/j_operatingdata.html",
  Staines:
    "http://engineer:TRDC2012@92.207.95.228:10001/http/index/j_operatingdata.html",
  Tattenham:
    "http://engineer:TRDC2012@80.252.70.227:10000/http/index/j_operatingdata.html",
  Taunton:
    "http://engineer:TRDC2012@51.52.46.178:10000/http/index/j_operatingdata.html",
  Tavistock:
    "http://engineer:TRDC2012@51.52.226.112:10000/http/index/j_operatingdata.html",
  Thame:
    "http://engineer:TRDC2012@157.231.45.164:10000/http/index/j_operatingdata.html",
  Thornbury:
    "http://engineer:TRDC2012@89.30.233.173:10000/http/index/j_operatingdata.html",
  Tonbridge:
    "http://engineer:TRDC2012@164.39.205.236:10001/http/index/j_operatingdata.html",
  Torquay:
    "http://engineer:TRDC2012@138.248.175.1:10001/http/index/j_operatingdata.html",
  Warlingham:
    "http://engineer:TRDC2012@51.52.112.115:10001/http/index/j_operatingdata.html",
  Wetherby:
    "http://engineer:TRDC2012@157.231.193.104:10000/http/index/j_operatingdata.html",
  Wimborne:
    "http://engineer:TRDC2012@92.207.130.81:10001/http/index/j_operatingdata.html",
  Wokingham:
    "http://engineer:TRDC2012@157.231.9.78:10000/http/index/j_operatingdata.html",
  Yate: "http://engineer:TRDC2012@92.207.108.252:10000/http/index/j_operatingdata.html",
};

const HTG_Links = {
  Aldridge:
    "http://engineer:TRDC2012@151.2.207.146:10000/http/index/j_operatingdata.html",
  Ashtead:
    "http://engineer:TRDC2012@151.2.212.222:10001/http/index/j_operatingdata.html",
  Aylesbury:
    "http://engineer:TRDC2012@151.2.172.112:10000/http/index/j_operatingdata.html",
  Bagshot:
    "http://engineer:TRDC2012@51.52.116.223:10000/http/index/j_operatingdata.html",
  Bicester:
    "http://engineer:TRDC2012@82.152.38.63:10000/http/index/j_operatingdata.html",
  Billericay:
    "http://engineer:TRDC2012@51.219.6.1:10001/http/index/j_operatingdata.html",
  Bishops_Waltham:
    "http://engineer:TRDC2012@212.159.33.100:10001/http/index/j_operatingdata.html",
  Bourne_End:
    "http://engineer:TRDC2012@157.231.48.75:10001/http/index/j_operatingdata.html",
  Bridport:
    "http://engineer:TRDC2012@151.2.190.42:10001/http/index/j_operatingdata.html",
  Burnham:
    "http://engineer:TRDC2012@157.231.60.231:10001/http/index/j_operatingdata.html",
  Carshalton:
    "http://engineer:TRDC2012@151.2.239.130:10000/http/index/j_operatingdata.html",
  Cheam:
    "http://engineer:TRDC2012@164.39.129.41:10000/http/index/j_operatingdata.html",
  Cheltenham:
    "http://engineer:TRDC2012@164.39.192.226:10001/http/index/j_operatingdata.html",
  Chichester:
    "http://engineer:TRDC2012@157.231.58.139:10000/http/index/l_operatingdata.html",
  Chippenham:
    "http://engineer:TRDC2012@51.52.37.39:10001/http/index/j_operatingdata.html",
  Cirencester:
    "http://engineer:TRDC2012@51.52.37.205:10001/http/index/j_operatingdata.html",
  Cowbridge:
    "http://engineer:TRDC2012@92.207.67.127:10000/http/index/j_operatingdata.html",
  Crowthorne:
    "http://engineer:TRDC2012@92.207.66.164:10001/http/index/j_operatingdata.html",
  Dartford:
    "http://engineer:TRDC2012@164.39.226.242:10001/http/index/j_operatingdata.html",
  Deal: "http://engineer:TRDC2012@51.219.232.202:10001/http/index/j_operatingdata.html",
  Dorking:
    "http://engineer:TRDC2012@51.52.35.57:10001/http/index/j_operatingdata.html",
  East_Grinstead:
    "http://engineer:TRDC2012@164.39.205.205:10001/http/index/j_operatingdata.html",
  Eastbourne:
    "http://engineer:TRDC2012@138.248.138.209:10001/http/index/j_operatingdata.html",
  Eastleigh:
    "http://engineer:TRDC2012@157.231.195.16:10001/http/index/j_operatingdata.html",
  Eltham:
    "http://engineer:TRDC2012@138.248.171.194:10001/http/index/j_operatingdata.html",
  Frinton:
    "http://engineer:TRDC2012@178.211.198.25:10000/http/index/j_operatingdata.html",
  Haverhill:
    "http://engineer:TRDC2012@157.231.48.239:10001/http/index/j_operatingdata.html",
  Highcliffe:
    "http://engineer:TRDC2012@51.219.172.187:10000/http/index/j_operatingdata.html",
  Hitchin:
    "http://engineer:TRDC2012@81.168.73.116:10001/http/index/j_operatingdata.html",
  Huntingdon:
    "http://engineer:TRDC2012@151.2.207.41:10001/http/index/j_operatingdata.html",
  Hythe:
    "http://engineer:TRDC2012@151.2.172.78:10000/http/index/j_operatingdata.html",
  Knowle:
    "http://engineer:TRDC2012@151.2.207.62:10000/http/index/j_operatingdata.html",
  Littlehampton:
    "http://engineer:TRDC2012@164.39.202.150:10000/http/index/j_operatingdata.html",
  Ludlow:
    "http://engineer:TRDC2012@178.211.198.27:10001/http/index/j_operatingdata.html",
  Lymington:
    "http://engineer:TRDC2012@51.219.32.147:10001/http/index/j_operatingdata.html",
  Maidstone:
    "http://engineer:TRDC2012@91.85.214.102:10000/http/index/j_operatingdata.html",
  Marlow:
    "http://engineer:TRDC2012@151.2.207.26:10000/http/index/j_operatingdata.html",
  Newquay:
    "http://engineer:TRDC2012@51.52.225.17:10001/http/index/j_operatingdata.html",
  Orpington:
    "http://engineer:TRDC2012@157.231.209.118:10001/http/index/j_operatingdata.html",
  Park_Gate:
    "http://engineer:TRDC2012@151.2.205.171:10001/http/index/j_operatingdata.html",
  Peacehaven:
    "http://engineer:TRDC2012@157.231.36.108:10001/http/index/j_operatingdata.html",
  Penrith:
    "http://engineer:TRDC2012@164.39.192.16:10000/http/index/j_operatingdata.html",
  Pinner:
    "http://engineer:TRDC2012@151.2.206.210:10000/http/index/j_operatingdata.html",
  Poole:
    "http://engineer:TRDC2012@164.39.225.62:10001/http/index/j_operatingdata.html",
  Portswood:
    "http://engineer:TRDC2012@157.231.201.101:10001/http/index/j_operatingdata.html",
  Princes_Ris:
    "http://engineer:TRDC2012@82.153.162.201:10000/http/index/j_operatingdata.html",
  Quinton:
    "http://engineer:TRDC2012@151.2.207.141:10001/http/index/j_operatingdata.html",
  Reigate:
    "http://engineer:TRDC2012@51.52.41.39:10001/http/index/j_operatingdata.html",
  Sandhurst:
    "http://engineer:TRDC2012@51.219.162.168:10001/http/index/j_operatingdata.html",
  Selsdon:
    "http://engineer:TRDC2012@51.52.113.179:10001/http/index/j_operatingdata.html",
  Shepperton:
    "http://engineer:TRDC2012@81.168.114.126:10000/http/index/j_operatingdata.html",
  Shirley:
    "http://engineer:TRDC2012@151.2.207.65:10001/http/index/j_operatingdata.html",
  Sidford:
    "http://engineer:TRDC2012@151.2.190.9:10001/http/index/j_operatingdata.html",
  Sittingbourne:
    "http://engineer:TRDC2012@164.39.128.13:10000/http/index/j_operatingdata.html",
  Sketty:
    "http://engineer:TRDC2012@195.166.131.95:10001/http/index/j_operatingdata.html",
  Southgate:
    "http://engineer:TRDC2012@92.207.184.2:10001/http/index/j_operatingdata.html",
  Staines:
    "http://engineer:TRDC2012@92.207.95.228:10000/http/index/j_operatingdata.html",
  Tattenham:
    "http://engineer:TRDC2012@80.252.70.227:10001/http/index/j_operatingdata.html",
  Taunton:
    "http://engineer:TRDC2012@51.52.46.178:10001/http/index/j_operatingdata.html",
  Tavistock:
    "http://engineer:TRDC2012@51.52.226.112:10001/http/index/j_operatingdata.html",
  Thame:
    "http://engineer:TRDC2012@157.231.45.164:10001/http/index/j_operatingdata.html",
  Thornbury:
    "http://engineer:TRDC2012@89.30.233.173:10001/http/index/j_operatingdata.html",
  Tonbridge:
    "http://engineer:TRDC2012@164.39.205.236:10000/http/index/j_operatingdata.html",
  Torquay:
    "http://engineer:TRDC2012@138.248.175.1:10000/http/index/j_operatingdata.html",
  Warlingham:
    "http://engineer:TRDC2012@51.52.112.115:10000/http/index/j_operatingdata.html",
  Wetherby:
    "http://engineer:TRDC2012@157.231.193.104:10001/http/index/j_operatingdata.html",
  Wimborne:
    "http://engineer:TRDC2012@92.207.130.81:10000/http/index/j_operatingdata.html",
  Wokingham:
    "http://engineer:TRDC2012@157.231.9.78:10001/http/index/j_operatingdata.html",
  Yate: "http://engineer:TRDC2012@92.207.108.252:10001/http/index/j_operatingdata.html",
};

const WebScrape = ({ selectedLocation }) => {
  const [DHW_T, setDHW_T] = useState(null); // State to hold the hot water temperature
  const [Ext_T, set_Ext_T] = useState(null);
  const [Ext_T_HTG, set_Ext_T_HTG] = useState(null);
  const [Flow_T, set_Flow_T] = useState(null);
  const [Flow_T_HTG, set_Flow_T_HTG] = useState(null);
  const [Heating_T, set_Heating_T] = useState(null);
  const [Heating_T_HTG, set_Heating_T_HTG] = useState(null);
  const [HS_Out_T, set_HS_Out_T] = useState(null);
  const [HS_Out_T_HTG, set_HS_Out_T_HTG] = useState(null);
  const [HS_In_T, set_HS_In_T] = useState(null);
  const [HS_In_T_HTG, set_HS_In_T_HTG] = useState(null);
  const [High_P, set_High_P] = useState(null);
  const [Low_P, set_Low_P] = useState(null);
  const [High_P_HTG, set_High_P_HTG] = useState(null);
  const [Low_P_HTG, set_Low_P_HTG] = useState(null);
  const [request_DHW, set_request_DHW] = useState(null);
  const [DHWrequest_HTG, set_DHWrequest_HTG] = useState(null);
  const [request_HTG, set_request_HTG] = useState(null);

  //   const username = "engineer";
  //   const password = "TRDC2012";
  //   const URL = "http://151.2.207.146:10001/http/index/j_operatingdata.html";

  useEffect(() => {
    const fetchData = async () => {
      setDHW_T("N/A");
      set_Ext_T("");
      set_Flow_T("");
      set_Heating_T("");
      set_HS_Out_T("");
      set_HS_In_T("");
      set_High_P("");
      set_Low_P("");
      set_request_DHW("");
      set_DHWrequest_HTG("");
      set_request_HTG("");
      set_Ext_T_HTG("");
      set_Flow_T_HTG("");
      set_Heating_T_HTG("");
      set_HS_Out_T_HTG("");
      set_HS_In_T_HTG("");
      set_High_P_HTG("");
      set_Low_P_HTG("");

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data?location=${selectedLocation}`
        ); // Fetch from your Express backend

        if (response.ok) {
          const htmlText = await response.text();
          const $ = cheerio.load(htmlText);
          const scriptTags = $("script");
          const scriptTag = scriptTags[9];

          if (scriptTag) {
            const scriptContent = $(scriptTag).html();
            let index = scriptContent.indexOf("var A3");

            try {
              if (index !== -1) {
                // Extract the hot water temperature (4 characters after 'var A3')
                let DHW_T = scriptContent.substring(index + 9, index + 13);
                setDHW_T(DHW_T); // Update the state with the temperature
              } else {
                // Find the element with id 'anz_e_b3'
                let x = $("#anz_e_b3");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                setDHW_T(J.substring(index + 8, index + 12));
              }
            } catch {
              setDHW_T("N/A");
            }

            index = scriptContent.indexOf("var A1");
            try {
              if (index !== -1) {
                // Extract the external temperature
                const Ext_T = scriptContent.substring(index + 9, index + 13);
                set_Ext_T(Ext_T); // Update the state with the temperature
              } else {
                // console.error('Unable to locate "var A1" in the script');
                // Find the <script> tag that contains 'document.write(Aussentemperatur);'
                const scriptTag = $(
                  'script:contains("document.write(Aussentemperatur);")'
                );

                // Find the parent <td> of this script tag
                const parentTd = scriptTag.closest("td");

                // Now find the next <td> element with align="right" after the script's parent <td>
                const tempElement = parentTd.next('td[align="right"]');

                // Extract the temperature value (24.3 in this case)
                const temperature = tempElement.text().trim(); // "24.3"
                set_Ext_T(temperature);
                //console.log(`Extracted Temperature: ${temperature}°C`);
              }
            } catch {
              set_Ext_T("N/A");
            }

            index = scriptContent.indexOf("var A5");
            try {
              if (index !== -1) {
                // Extract the flow temperature
                const Flow_T = scriptContent.substring(index + 9, index + 13);
                set_Flow_T(Flow_T); // Update the state with the temperature
              } else {
                //console.error('Unable to locate "var A5" in the script');
                // Find the element with id 'anz_e_b3'
                let x = $("#anz_vl_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_Flow_T(J.substring(index + 8, index + 12));
              }
            } catch {
              set_Flow_T("N/A");
            }

            index = scriptContent.indexOf("var A2");
            try {
              if (index !== -1) {
                // Extract the heating temperature
                const Heating_T = scriptContent.substring(
                  index + 9,
                  index + 13
                );
                set_Heating_T(Heating_T); // Update the state with the temperature
              } else {
                //console.error('Unable to locate "var A2" in the script');
                let x = $("#anz_rl_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_Heating_T(J.substring(index + 8, index + 12));
              }
            } catch {
              set_Heating_T("N/A");
            }

            index = scriptContent.indexOf("var A7");
            try {
              if (index !== -1) {
                // Extract the heat source outlet temperature
                const HS_Out_T = scriptContent.match(
                  /var A7 = ([\d.]+).toFix/
                )[1];
                set_HS_Out_T(HS_Out_T); // Update the state with the temperature
              } else {
                //console.error('Unable to locate "var A7" in the script');
                let x = $("#anz_nd_b7_wqa_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_HS_Out_T(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
              }
            } catch {
              set_HS_Out_T("N/A");
            }

            index = scriptContent.indexOf("var A6");
            try {
              if (index !== -1) {
                // Extract the heat source outlet temperature
                const HS_In_T = scriptContent.match(
                  /var A6 = ([\d.]+).toFix/
                )[1];
                set_HS_In_T(HS_In_T); // Update the state with the temperature
              } else {
                let x = $("#anz_nd_b6_wqe_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_HS_In_T(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
              }
            } catch {
              set_HS_In_T("N/A");
            }

            index = scriptContent.indexOf("var D147");
            try {
              if (index !== -1) {
                let D147 = scriptContent.substring(index + 12, index + 13);
                set_request_DHW(D147);
              } else {
                let x = $("#anz_wpa_w");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');
                if (index !== -1) {
                  let Val = J.substring(index + 26, index + 27);
                  set_request_DHW(Val);
                }
              }
            } catch {
              set_request_DHW("N/A");
            }

            index = scriptContent.indexOf("var D146");
            try {
              if (index !== -1) {
                let D146 = scriptContent.substring(index + 12, index + 13);
                set_DHWrequest_HTG(D146);
              } else {
                const scriptTag = $(
                  'script:contains("document.write(HeizungAnforderung);")'
                );

                // Find the parent <td> of this script tag
                const parentTd = scriptTag.closest("td");

                // Now find the next <td> element with align="right" after the script's parent <td>
                const request_Element = parentTd.next('td[align="right"]');

                const DHWRequest_HTG = request_Element
                  .text()
                  .trim()
                  .slice(10, 11);
                set_DHWrequest_HTG(DHWRequest_HTG);
              }
            } catch {
              set_DHWrequest_HTG("N/A");
            }

            //set_request_DHW(index);
            //let J = x.html();
            //set_request_DHW(scriptContent.substring(index + 12, index + 13));

            index = scriptContent.indexOf("var A8");
            try {
              if (index !== -1) {
                // Extract the high pressure sensor value
                const High_P = scriptContent.substring(index + 9, index + 13);

                set_High_P(High_P); // Update the state with the pressure
              } else {
                //console.error('Unable to locate "var A8" in the script');
                let x = $("#anz_hd_b8_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');
                const HD = parseFloat(J.substring(index + 25, index + 29));
                const HDSensor = ((HD * 10 - 100) * 345) / 800 / 10;
                const HDSensor1 = (Math.floor(HDSensor * 10) / 10).toFixed(1);
                set_High_P(HDSensor1);
              }
            } catch {
              set_High_P("N/A");
            }

            index = scriptContent.indexOf("var A101");
            try {
              if (index !== -1) {
                // Extract the low pressure sensor value
                const Low_P = scriptContent.match(
                  /var A101 = ([\d.]+).toFix/
                )[1]; //
                set_Low_P(Low_P); // Update the state with the pressure
              } else {
                //console.error('Unable to locate "var A101" in the script');
                let x = $("#anz_EVD_Sh_Evap_Pres_A_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_Low_P(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
              }
            } catch {
              set_Low_P("N/A");
            }
          }
        } else {
          console.error("Failed to fetch the data from the server");
          setDHW_T("N/A");
          set_Ext_T("N/A");
          set_Flow_T("N/A");
          set_Heating_T("N/A");
          set_HS_Out_T("N/A");
          set_HS_In_T("N/A");
          set_High_P("N/A");
          set_Low_P("N/A");
          set_request_DHW("N/A");
          set_DHWrequest_HTG("N/A");
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data-htg?location=${selectedLocation}`
        ); // Fetch from your Express backend

        if (response.ok) {
          const htmlText = await response.text();
          const $ = cheerio.load(htmlText);
          const scriptTags = $("script");
          const scriptTag = scriptTags[9];

          if (scriptTag) {
            const scriptContent = $(scriptTag).html();

            let index = scriptContent.indexOf("var A1");
            if (index !== -1) {
              // Extract the external temperature
              const Ext_T_HTG = scriptContent.substring(index + 9, index + 13);
              set_Ext_T_HTG(Ext_T_HTG); // Update the state with the temperature
            } else {
              // console.error('Unable to locate "var A1" in the script');
              // Find the <script> tag that contains 'document.write(Aussentemperatur);'
              const scriptTag = $(
                'script:contains("document.write(Aussentemperatur);")'
              );

              // Find the parent <td> of this script tag
              const parentTd = scriptTag.closest("td");

              // Now find the next <td> element with align="right" after the script's parent <td>
              const tempElement = parentTd.next('td[align="right"]');

              // Extract the temperature value (24.3 in this case)
              const temperature = tempElement.text().trim(); // "24.3"
              set_Ext_T_HTG(temperature);
              //console.log(`Extracted Temperature: ${temperature}°C`);
            }

            index = scriptContent.indexOf("var A5");
            if (index !== -1) {
              // Extract the flow temperature
              const Flow_T_HTG = scriptContent.substring(index + 9, index + 13);
              set_Flow_T_HTG(Flow_T_HTG); // Update the state with the temperature
            } else {
              //console.error('Unable to locate "var A5" in the script');
              // Find the element with id 'anz_e_b3'
              let x = $("#anz_vl_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');

              // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
              set_Flow_T_HTG(J.substring(index + 8, index + 12));
            }

            index = scriptContent.indexOf("var A2");
            if (index !== -1) {
              // Extract the heating temperature
              const Heating_T_HTG = scriptContent.substring(
                index + 9,
                index + 13
              );
              set_Heating_T_HTG(Heating_T_HTG); // Update the state with the temperature
            } else {
              //console.error('Unable to locate "var A2" in the script');
              let x = $("#anz_rl_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');

              // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
              set_Heating_T_HTG(J.substring(index + 8, index + 12));
            }

            index = scriptContent.indexOf("var A8");
            console.log("HP " + index);
            if (index !== -1) {
              // Extract the high pressure sensor value
              const High_P_HTG = scriptContent.substring(index + 9, index + 13);
              set_High_P_HTG(High_P_HTG); // Update the state with the pressure
            } else {
              //console.error('Unable to locate "var A8" in the script');
              let x = $("#anz_hd_b8_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');
              const HD = parseFloat(J.substring(index + 25, index + 29));
              const HDSensor = ((HD * 10 - 100) * 345) / 800 / 10;
              const HDSensor1 = (Math.floor(HDSensor * 10) / 10).toFixed(1);
              set_High_P_HTG(HDSensor1);
            }

            index = scriptContent.indexOf("var A101");
            if (index !== -1) {
              // Extract the low pressure sensor value
              const Low_P_HTG = scriptContent.substring(index + 11, index + 15);
              set_Low_P_HTG(Low_P_HTG); // Update the state with the pressure
            } else {
              //console.error('Unable to locate "var A101" in the script');
              let x = $("#anz_EVD_Sh_Evap_Pres_A_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');

              // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
              set_Low_P_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            }

            index = scriptContent.indexOf("var A6");
            try {
              if (index !== -1) {
                const HS_In_T_HTG = scriptContent.substring(
                  index + 9,
                  index + 13
                );
                set_HS_In_T_HTG(HS_In_T_HTG); // Update the state with the pressure
              } else {
                let x = $("#anz_nd_b6_wqe_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_HS_In_T_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
              }
            } catch {
              set_HS_In_T_HTG("N/A");
            }

            //const scriptContent = $(scriptTag).html();
            index = scriptContent.indexOf("var A7");
            if (index !== -1) {
              // Extract the heat source outlet temperature
              const HS_Out_T_HTG = scriptContent.substring(
                index + 9,
                index + 13
              );
              set_HS_Out_T_HTG(HS_Out_T_HTG); // Update the state with the temperature
            } else {
              //console.error('Unable to locate "var A7" in the script');
              let x = $("#anz_nd_b7_wqa_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');

              // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
              set_HS_Out_T_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            }

            index = scriptContent.indexOf("var D146");
            try {
              if (index !== -1) {
                let D146 = scriptContent.substring(index + 12, index + 13);
                set_request_HTG(D146);
              } else {
                const scriptTag = $(
                  'script:contains("document.write(HeizungAnforderung);")'
                );

                // Find the parent <td> of this script tag
                const parentTd = scriptTag.closest("td");

                // Now find the next <td> element with align="right" after the script's parent <td>
                const request_Element = parentTd.next('td[align="right"]');

                const Request_HTG = request_Element.text().trim().slice(10, 11);
                set_request_HTG(Request_HTG);
              }
            } catch {
              set_request_HTG("N/A");
            }
          }
        } else {
          console.error("Failed to fetch the data from the server");
          set_Ext_T_HTG("N/A");
          set_Flow_T_HTG("N/A");
          set_Heating_T_HTG("N/A");
          set_HS_Out_T_HTG("N/A");
          set_HS_In_T_HTG("N/A");
          set_High_P_HTG("N/A");
          set_Low_P_HTG("N/A");
          set_request_HTG("N/A");
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Initial fetch
    fetchData();

    // Optional: Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedLocation]);

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
        {request_HTG == "1" && (
          <>
            <img
              src={spiral}
              alt="HP Running"
              style={{
                position: "absolute",
                top: "49.7%",
                left: "4.3%",
                width: "2.5%",
              }}
            />
          </>
        )}
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
            top: "5.5%", // Different position for another text
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
            top: "7%", // Different position for another text
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
            top: "36.8%", // Different position for another text
            left: "19.5%",
            color: "#3b4049",
            fontSize: "0.8vw", // Text size scales with viewport width
            fontWeight: "bold",
          }}
        >
          {Heating_T}°C
        </p>
        <p
          style={{
            position: "absolute",
            top: "38.6%", // Different position for another text
            left: "19.5%",
            color: "#3b4049",
            fontSize: "0.8vw", // Text size scales with viewport width
            fontWeight: "bold",
          }}
        >
          {Heating_T_HTG}°C
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
      </div>
    </>
  );
};

WebScrape.propTypes = {
  selectedLocation: PropTypes.string,
};

export default WebScrape;
