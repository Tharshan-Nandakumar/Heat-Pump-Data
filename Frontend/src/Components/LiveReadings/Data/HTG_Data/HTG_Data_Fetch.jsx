import { useState, useEffect } from "react";
import * as cheerio from "cheerio";
import PropTypes from "prop-types";

const HTG_Data = (selectedLocation) => {
  const [Ext_T_HTG, set_Ext_T_HTG] = useState(null);
  const [Flow_T_HTG, set_Flow_T_HTG] = useState(null);
  const [Heating_T_HTG, set_Heating_T_HTG] = useState(null);
  const [HS_Out_T_HTG, set_HS_Out_T_HTG] = useState(null);
  const [HS_In_T_HTG, set_HS_In_T_HTG] = useState(null);
  const [High_P_HTG, set_High_P_HTG] = useState(null);
  const [Low_P_HTG, set_Low_P_HTG] = useState(null);
  const [request_HTG, set_request_HTG] = useState(null);
  const [HTG_set_T, set_HTG_set_T] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      set_request_HTG("");
      set_Ext_T_HTG("");
      set_Flow_T_HTG("");
      set_Heating_T_HTG("");
      set_HS_Out_T_HTG("");
      set_HS_In_T_HTG("");
      set_High_P_HTG("");
      set_Low_P_HTG("");
      set_HTG_set_T("");

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data-htg?location=${selectedLocation}` //http://localhost:3306/
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

            if (index !== -1) {
              // Extract the high pressure sensor value
              const HD = scriptContent.match(/var A8 = ([\d.]+).toFix/)[1];
              const HDSensor = ((HD * 10 - 100) * 450) / 800 / 10;
              const HDSensor1 = (Math.floor(HDSensor * 10) / 10).toFixed(1);
              set_High_P_HTG(HDSensor1); // Update the state with the pressure
            } else {
              //console.error('Unable to locate "var A8" in the script');
              let x = $("#anz_hd410a_b8_pcol1");

              // Convert the element to a string
              let J = x.html(); // This gets the inner HTML of the element as a string

              // Locate the value in the string
              index = J.indexOf('"right">');
              const HD = parseFloat(J.match(/var HD = ([\d.]+)/)[1]);
              const HDSensor = ((HD * 10 - 100) * 450) / 800 / 10;
              const HDSensor1 = (Math.floor(HDSensor * 10) / 10).toFixed(1);
              set_High_P_HTG(HDSensor1);
            }

            index = scriptContent.indexOf("var A6");
            try {
              if (index !== -1) {
                const ND = scriptContent.match(/var A6 = ([\d.]+).toFix/)[1];
                const NDSensor = ((ND * 10 - 100) * 345) / 800 / 10;
                const NDSensor1 = (Math.floor(NDSensor * 10) / 10).toFixed(1);
                set_Low_P_HTG(NDSensor1); // Update the state with the pressure
              } else {
                //console.error('Unable to locate "var A8" in the script');
                let x = $("#anz_nd410a_b6_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');
                const ND = parseFloat(J.match(/var ND = ([\d.]+)/)[1]);
                const NDSensor = ((ND * 10 - 100) * 345) / 800 / 10;
                const NDSensor1 = (Math.floor(NDSensor * 10) / 10).toFixed(1);
                set_Low_P_HTG(NDSensor1);
              }
            } catch {
              set_Low_P_HTG("N/A");
            }

            // index = scriptContent.indexOf("var A101");
            // try {
            //   if (index !== -1) {
            //     // Extract the low pressure sensor value
            //     const Low_P_HTG = scriptContent.match(
            //       /var A101 = ([\d.]+).toFix/
            //     )[1]; //
            //     set_Low_P_HTG(Low_P_HTG); // Update the state with the pressure
            //   } else {
            //     //console.error('Unable to locate "var A101" in the script');
            //     let x = $("#anz_EVD_Sh_Evap_Pres_A_pcol1");

            //     // Convert the element to a string
            //     let J = x.html(); // This gets the inner HTML of the element as a string

            //     // Locate the value in the string
            //     index = J.indexOf('"right">');

            //     // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
            //     set_Low_P_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            //   }
            // } catch {
            //   set_Low_P_HTG("N/A");
            // }
            // index = scriptContent.indexOf("var A101");
            // if (index !== -1) {
            //   // Extract the low pressure sensor value
            //   const Low_P_HTG = scriptContent.substring(index + 11, index + 15);
            //   set_Low_P_HTG(Low_P_HTG); // Update the state with the pressure
            // } else {
            //   //console.error('Unable to locate "var A101" in the script');
            //   let x = $("#anz_EVD_Sh_Evap_Pres_A_pcol1");

            //   // Convert the element to a string
            //   let J = x.html(); // This gets the inner HTML of the element as a string

            //   // Locate the value in the string
            //   index = J.indexOf('"right">');

            //   // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
            //   set_Low_P_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            // }

            index = scriptContent.indexOf("var A6");
            try {
              if (index !== -1) {
                // Extract the heat source outlet temperature
                const HS_In_T_HTG = scriptContent.match(
                  /var A6 = ([\d.]+).toFix/
                )[1];
                set_HS_In_T_HTG(HS_In_T_HTG);
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

            index = scriptContent.indexOf("var A7");
            try {
              if (index !== -1) {
                // Extract the heat source outlet temperature
                const HS_Out_T_HTG = scriptContent.match(
                  /var A7 = ([\d.]+).toFix/
                )[1];
                set_HS_Out_T_HTG(HS_Out_T_HTG); // Update the state with the temperature
              } else {
                //console.error('Unable to locate "var A7" in the script');
                let x = $("#anz_nd_b7_wqa_pcol1");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                // Locate the value in the string
                index = J.indexOf('"right">');

                // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
                set_HS_Out_T_HTG(
                  J.match(/<td align="right">([\d.]+)<\/td>/)[1]
                );
              }
            } catch {
              set_HS_Out_T_HTG("N/A");
            }
            //const scriptContent = $(scriptTag).html();

            // if (index !== -1) {
            //   // Extract the heat source outlet temperature
            //   const HS_Out_T_HTG = scriptContent.substring(
            //     index + 9,
            //     index + 13
            //   );
            //   set_HS_Out_T_HTG(HS_Out_T_HTG); // Update the state with the temperature
            // } else {
            //   //console.error('Unable to locate "var A7" in the script');
            //   let x = $("#anz_nd_b7_wqa_pcol1");

            //   // Convert the element to a string
            //   let J = x.html(); // This gets the inner HTML of the element as a string

            //   // Locate the value in the string
            //   index = J.indexOf('"right">');

            //   // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
            //   set_HS_Out_T_HTG(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            // }

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

            let tableData = $(
              "body > div.grauekaesten > div > div.zentral_unter > div.inhalt > div.produkt > div > div > div > div > div > table > tbody > tr:nth-child(34) > td:nth-child(2)"
            );
            try {
              if (
                tableData.text().trim() !== "0.0" &&
                tableData.text().trim() !== "-999.9"
              ) {
                const extractedValue = tableData.text().trim();
                set_HTG_set_T(extractedValue);
              } else {
                const tableData = $(
                  "body > div.grauekaesten > div > div.zentral_unter > div.inhalt > div.produkt > div > div > div > div > div > table > tbody > tr:nth-child(21) > td:nth-child(2)"
                );
                set_HTG_set_T(tableData.text().trim());
              }
            } catch {
              set_HTG_set_T("N/A");
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
          set_HTG_set_T("N/A");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // Initial fetch
    fetchData();

    // Optional: Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedLocation]);
  return {
    Ext_T_HTG,
    Flow_T_HTG,
    Heating_T_HTG,
    HS_Out_T_HTG,
    HS_In_T_HTG,
    High_P_HTG,
    Low_P_HTG,
    request_HTG,
    HTG_set_T,
  };
};

HTG_Data.propTypes = {
  selectedLocation: PropTypes.string,
};

export default HTG_Data;
