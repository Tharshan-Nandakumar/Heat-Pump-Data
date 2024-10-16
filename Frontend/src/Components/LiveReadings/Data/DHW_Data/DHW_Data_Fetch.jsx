import { useState, useEffect } from "react";
import * as cheerio from "cheerio";
import PropTypes from "prop-types";

const DHW_Data = (selectedLocation) => {
  const [DHW_T, setDHW_T] = useState(null); // State to hold the hot water temperature
  const [Ext_T, set_Ext_T] = useState(null);
  const [Flow_T, set_Flow_T] = useState(null);
  const [Heating_T, set_Heating_T] = useState(null);
  const [HS_Out_T, set_HS_Out_T] = useState(null);
  const [HS_In_T, set_HS_In_T] = useState(null);
  const [High_P, set_High_P] = useState(null);
  const [Low_P, set_Low_P] = useState(null);
  const [request_DHW, set_request_DHW] = useState(null);
  const [DHWrequest_HTG, set_DHWrequest_HTG] = useState(null);
  const [DHW_set_T_HTG, set_DHW_set_T_HTG] = useState(null);
  const [DHW_set_T_DHW, set_DHW_set_T_DHW] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setDHW_T("");
      set_Ext_T("");
      set_Flow_T("");
      set_Heating_T("");
      set_HS_Out_T("");
      set_HS_In_T("");
      set_High_P("");
      set_Low_P("");
      set_request_DHW("");
      set_DHWrequest_HTG("");
      set_DHW_set_T_HTG("");
      set_DHW_set_T_DHW("");

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data?location=${selectedLocation}` /// http://localhost:3306
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
                const HD = scriptContent.match(/var A8 = ([\d.]+).toFix/)[1];
                const HDSensor = ((HD * 10 - 100) * 450) / 800 / 10;
                const HDSensor1 = (Math.floor(HDSensor * 10) / 10).toFixed(1);
                set_High_P(HDSensor1); // Update the state with the pressure
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
                set_High_P(HDSensor1);
              }
            } catch {
              set_High_P("N/A");
            }

            index = scriptContent.indexOf("var A6");
            try {
              if (index !== -1) {
                const ND = scriptContent.match(/var A6 = ([\d.]+).toFix/)[1];
                const NDSensor = ((ND * 10 - 100) * 345) / 800 / 10;
                const NDSensor1 = (Math.floor(NDSensor * 10) / 10).toFixed(1);
                set_Low_P(NDSensor1); // Update the state with the pressure
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
                set_Low_P(NDSensor1);
              }
            } catch {
              set_Low_P("N/A");
            }
            // index = scriptContent.indexOf("var A101");
            // try {
            //   if (index !== -1) {
            //     // Extract the low pressure sensor value
            //     const Low_P = scriptContent.match(
            //       /var A101 = ([\d.]+).toFix/
            //     )[1]; //
            //     set_Low_P(Low_P); // Update the state with the pressure
            //   } else {
            //     //console.error('Unable to locate "var A101" in the script');
            //     let x = $("#anz_A6ratR410");

            //     // Convert the element to a string
            //     let J = x.html(); // This gets the inner HTML of the element as a string

            //     // Locate the value in the string
            //     index = J.indexOf('"right">');

            //     // Extract the hot water temperature (4 characters after '"right">' at 1 decimal place)
            //     set_Low_P(J.match(/<td align="right">([\d.]+)<\/td>/)[1]);
            //   }
            // } catch {
            //   set_Low_P("N/A");
            // }

            let tableData = $(
              "body > div.grauekaesten > div > div.zentral_unter > div.inhalt > div.produkt > div > div > div > div > div > table > tbody > tr:nth-child(34) > td:nth-child(2)"
            );

            try {
              if (
                tableData.text().trim() !== "0.0" &&
                tableData.text().trim() !== "-999.9"
              ) {
                const extractedValue = tableData.text().trim();
                set_DHW_set_T_HTG(extractedValue);
              } else {
                const tableData = $(
                  "body > div.grauekaesten > div > div.zentral_unter > div.inhalt > div.produkt > div > div > div > div > div > table > tbody > tr:nth-child(21) > td:nth-child(2)"
                );
                set_DHW_set_T_HTG(tableData.text().trim());
              }
            } catch {
              set_DHW_set_T_HTG("N/A");
            }

            index = scriptContent.indexOf("var A58");
            try {
              if (index !== -1) {
                // Extract the high pressure sensor value
                const DHW_set_T_DHW = scriptContent.match(
                  /var A58 = ([\d.]+).toFix/
                )[1];

                set_DHW_set_T_DHW(DHW_set_T_DHW); // Update the state with the pressure
              } else {
                //console.error('Unable to locate "var A8" in the script');
                let x = $("#anz_ww_soll");

                // Convert the element to a string
                let J = x.html(); // This gets the inner HTML of the element as a string

                set_DHW_set_T_DHW(
                  J.match(/<td align="right">([\d.]+)<\/td>/)[1]
                );
              }
            } catch {
              set_DHW_set_T_DHW("N/A");
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
          set_DHW_set_T_DHW("N/A");
          set_DHW_set_T_HTG("N/A");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();

    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedLocation]);
  return {
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
  };
};

DHW_Data.propTypes = {
  selectedLocation: PropTypes.string,
};

export default DHW_Data;
