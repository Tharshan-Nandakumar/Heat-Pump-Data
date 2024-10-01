import { useState, useEffect } from "react";
import * as cheerio from "cheerio";

const DHW_Status_Data = (selectedLocation) => {
  const [A103, setA103] = useState(null);
  const [A104, setA104] = useState(null);
  const [A105, setA105] = useState(null);
  const [A106, setA106] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setA103("");
      setA104("");
      setA105("");
      setA106("");

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data-start-page?location=${selectedLocation}` //http://localhost:3306/
        ); // Fetch from your Express backend

        //console.log(selectedLocation);
        if (response.ok) {
          const htmlText = await response.text();
          const $ = cheerio.load(htmlText);
          const scriptContent = $(
            "body > div.weisserkasten > div > script"
          ).html();
          try {
            if (scriptContent.match(/var A103 = ([\d.]+)/) !== null) {
              setA103(scriptContent.match(/var A103 = ([\d.]+)/)[1]);
              setA104(scriptContent.match(/var A104 = ([\d.]+)/)[1]);
              setA105(scriptContent.match(/var A105 = ([\d.]+)/)[1]);
              setA106(scriptContent.match(/var A106 = ([\d.]+)/)[1]);
              // console.log(scriptContent);
              // console.log(
              //   "A103 DHW " + scriptContent.match(/var A103 = ([\d.]+)/)[1]
              // );
              // console.log(
              //   "A104 DHW " + scriptContent.match(/var A104 = ([\d.]+)/)[1]
              // );
              // console.log(
              //   "A106 DHW " + scriptContent.match(/var A106 = ([\d.]+)/)[1]
              // );
            } else {
              const scriptContent = $(
                "#l_software > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script:nth-child(1)"
              ).html();
              setA103(scriptContent.match(/var z_hswstatusL=([\d.]+)/)[1]);
              // console.log(
              //   "A103 DHW " +
              //     scriptContent.match(/var z_hswstatusL=([\d.]+)/)[1]
              // );
              const script = $(
                "#l_software > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script:nth-child(3)"
              ).html();
              setA104(script.match(/var z_sp_wertL=([\d.]+)/)[1]);
              // console.log(
              //   "A104 DHW " + script.match(/var z_sp_wertL=([\d.]+)/)[1]
              // );
              const script1 = $(
                "#frei_al_l > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script"
              ).html();
              setA105(script1.match(/var z_statusL=([\d.]+)/)[1]);
              const script2 = $(
                "#frei_al_l > div > div > div > div > div > table > tbody > tr:nth-child(3) > td > div > font > strong > script"
              ).html();
              setA106(script2.match(/var z_statusL1=([\d.]+)/)[1]);
              // console.log(
              //   "A106 DHW " + script2.match(/var z_statusL1=([\d.]+)/)[1]
              // );
            }
          } catch {
            console.error("Failed to fetch the data from the server");
            setA103("N/A");
            setA104("N/A");
            setA105("N/A");
            setA106("N/A");
          }
        } else {
          setA103("N/A");
          setA104("N/A");
          setA105("N/A");
          setA106("N/A");
        }
      } catch (err) {
        console.error(err);
        setA103("N/A");
        setA104("N/A");
        setA105("N/A");
        setA106("N/A");
      }
    };

    // Initial fetch
    fetchData();

    // Optional: Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000); // Fetch every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [selectedLocation]);
  return { A103, A104, A105, A106 };
};

export default DHW_Status_Data;
