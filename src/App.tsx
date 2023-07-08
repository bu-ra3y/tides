import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  const [data, setData] = React.useState<Tide[]>([]);
  React.useEffect(() => {
    console.log(`Starting data request`);
    axios
      .get(
        "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=20230707&end_date=20230810&datum=MLLW&station=8446166&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred",
      )
      .then(({ data }) => {
        setData(data.predictions);
      })
      .catch((error) => console.log(error));
  }, []);

  const [stations, setStations] = React.useState<Station[]>([]);
  React.useEffect(() => {
    console.log(`Starting data request`);
    axios
      .get(
        "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions",
      )
      .then((response) => {
        const data = response.data.stations;
        console.log(data);
        setStations(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Tides</h1>
      <ul>
        {data.map((i) => (
          <li key={i.t}> {`${i.t} ${i.type}: ${i.v}`}</li>
        ))}
      </ul>
      <h1>Stations</h1>
      <ul>
        {stations.map((station) => (
          <li key={station.id}>{`[${station.state}] ${station.name}`}</li>
        ))}
      </ul>
    </>
  );
}

interface Tide {
  t: string;
  v: string;
  type: string;
}
interface Station {
  affiliations: string;
  disclaimers: string;
  expand: string;
  id: string;
  lat: number;
  lng: number;
  name: string;
  notices: string;
  portscode: string;
  products: null;
  reference_id: string;
  self: string;
  state: string;
  tidesType: string;
  tidepredoffsets: { self: string };
  timemeridian: number;
  timezonecorr: number;
  type: string;
}

export default App;
