import { useEffect, useState } from "react";
import Locs from "./Locs";
import DisplayLocation from "./Dis";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  const [location, setLocation] = useState("");

  return (
    <div style={{ padding: "50px" }}>
      <Locs location={location} setLocation={setLocation} />
      <DisplayLocation location={location} />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Electricity</th>
            <th>Flow Temp</th>
            <th>Heat</th>
            <th>Return Temp</th>
            <th>Site</th>
            <th>Time</th>
            <th>Type</th>
            <th>Volume Flow</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.Date}</td>
              <td>{d.Electricity}</td>
              <td>{d.Flow_Temperature}</td>
              <td>{d.Heat}</td>
              <td>{d.Return_Temperature}</td>
              <td>{d.Site}</td>
              <td>{d.Time}</td>
              <td>{d.Type}</td>
              <td>{d.Volume_Flow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
