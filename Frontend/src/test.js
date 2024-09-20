import * as cheerio from "cheerio";
const username = "engineer";
const password = "TRDC2012";
const URL = "http://151.2.207.146:10001/http/index/j_operatingdata.html";
try {
  const credentials = btoa(`${username}:${password}`);
  const response = await fetch(URL, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
  if (response.ok) {
    const htmlText = await response.text();

    const $ = cheerio.load(htmlText);

    // Find the 10th <script> tag (index starts from 0, so [9] is the 10th one)
    const scriptTags = $("script");
    const scriptTag = scriptTags[9];
    if (scriptTag) {
      const scriptContent = $(scriptTag).html(); // Extract the script content as text

      // Find the 'var A3' in the script content
      const index = scriptContent.indexOf("var A3");

      if (index !== -1) {
        // Extract the hot water temperature (4 characters after 'var A3')
        const DHW_T = scriptContent.substring(index + 9, index + 13);
        console.log(`Hot Water Temperature: ${DHW_T}°C`);
      } else {
        console.error('Unable to locate "var A3" in the script');
      }
    }
  }
} catch (err) {
  console.log(err);
}
