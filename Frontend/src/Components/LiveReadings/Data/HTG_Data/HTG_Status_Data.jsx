import { useState, useEffect } from "react";
import * as cheerio from "cheerio";

const HTG_Status_Data = (selectedLocation) => {
  const [A103_HTG, setA103_HTG] = useState(null);
  const [A104_HTG, setA104_HTG] = useState(null);
  const [A105_HTG, setA105_HTG] = useState(null);
  const [A106_HTG, setA106_HTG] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setA103_HTG("");
      setA104_HTG("");
      setA105_HTG("");
      setA106_HTG("");

      try {
        const response = await fetch(
          `https://heat-pump-data-backend.onrender.com/api/proxy-data-htg-start-page?location=${selectedLocation}` //https://heat-pump-data-backend.onrender.com/
        ); // Fetch from your Express backend
        // 104 3.4 2nd gen generator, A103 0.3 DHW
        if (response.ok) {
          const htmlText = await response.text();
          const $ = cheerio.load(htmlText);
          const scriptContent = $(
            "body > div.weisserkasten > div > script"
          ).html();
          try {
            if (scriptContent.match(/var A103 = ([\d.]+)/) !== null) {
              setA103_HTG(scriptContent.match(/var A103 = ([\d.]+)/)[1]);
              setA104_HTG(scriptContent.match(/var A104 = ([\d.]+)/)[1]);
              setA105_HTG(scriptContent.match(/var A105 = ([\d.]+)/)[1]);
              setA106_HTG(scriptContent.match(/var A106 = ([\d.]+)/)[1]);
              // console.log(
              //   "A103 HTG " + scriptContent.match(/var A103 = ([\d.]+)/)[1]
              // );
              // console.log(
              //   "A104 HTG " + scriptContent.match(/var A104 = ([\d.]+)/)[1]
              // );
              // console.log(
              //   "A106 HTG " + scriptContent.match(/var A106 = ([\d.]+)/)[1]
              // );
            } else {
              const scriptContent = $(
                "#l_software > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script:nth-child(1)"
              ).html();
              setA103_HTG(scriptContent.match(/var z_hswstatusL=([\d.]+)/)[1]);
              // console.log(
              //   "A103 HTG " +
              //     scriptContent.match(/var z_hswstatusL=([\d.]+)/)[1]
              // );
              const script = $(
                "#l_software > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script:nth-child(3)"
              ).html();
              setA104_HTG(script.match(/var z_sp_wertL=([\d.]+)/)[1]);
              // console.log(
              //   "A104 HTG " + script.match(/var z_sp_wertL=([\d.]+)/)[1]
              // );
              const script1 = $(
                "#frei_al_l > div > div > div > div > div > table > tbody > tr:nth-child(2) > td > div > font > strong > script"
              ).html();
              setA105_HTG(script1.match(/var z_statusL=([\d.]+)/)[1]);
              const script2 = $(
                "#frei_al_l > div > div > div > div > div > table > tbody > tr:nth-child(3) > td > div > font > strong > script"
              ).html();
              setA106_HTG(script2.match(/var z_statusL1=([\d.]+)/)[1]);
              // console.log(
              //   "A106 HTG " + script2.match(/var z_statusL1=([\d.]+)/)[1]
              // );
            }
          } catch {
            setA103_HTG("N/A");
            setA104_HTG("N/A");
            setA105_HTG("N/A");
            setA106_HTG("N/A");
          }
        } else {
          setA103_HTG("N/A");
          setA104_HTG("N/A");
          setA105_HTG("N/A");
          setA106_HTG("N/A");
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

  return { A103_HTG, A104_HTG, A105_HTG, A106_HTG };
};

export default HTG_Status_Data;
