import "./App.css";
import React from "react";
import axios from "axios";
import { Select } from "antd";

function App() {
  const [station, setStation] = React.useState<string>("");
  const [stations, setStations] = React.useState<Station[]>([]);
  React.useEffect(() => {
    axios
      .get(
        "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions",
      )
      .then((response) => setStations(response.data.stations))
      .catch((error) => console.error(error));
  }, []);

  const [tides, setTides] = React.useState<Tide[]>([]);
  React.useEffect(() => {
    if (!station) return; // No station chosen yet
    axios
      .get(
        `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&begin_date=20230707&end_date=20230810&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred`,
      )
      .then(({ data }) => setTides(data.predictions))
      .catch((error) => console.error(error));
  }, [station]);

  return (
    <>
      <Select
        showSearch
        placeholder="Choose a Tide Station"
        optionFilterProp="children"
        onChange={(station: string) => setStation(station)}
        size="large"
        filterOption={filterSearch}
        options={stations.map((station) => {
          return {
            label: `${station.name}, ${station.state}`,
            value: station.id,
          };
        })}
      />
      <h1>Tides</h1>
      <h3>{tides.length} Tides</h3>
      <ul>
        {tides.map((i) => (
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

/** Filter which items match the user input.
 *
 * User input must match the start of any word in the phrase.
 *
 * "hi" matches "Honolulu, HI"
 */
const filterSearch = (input: string, item: Option) => {
  const s = item?.label;
  if (!s) return false;
  return s
    .toLowerCase()
    .split(" ")
    .some((word: string) => {
      return word.startsWith(input.toLowerCase());
    });
};

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

interface Option {
  value: string;
  label: string;
}

export default App;
