import { useState, useEffect } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import Header from "./components/Header";

function App() {
  const [wildfires, setWildfires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events");
      const { events } = await res.json();
      setWildfires(
        events.filter((event) => event.categories[0].id === "wildfires")
      );
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="App">
      <Header />
      {!loading ? <Map wildfires={wildfires} /> : <Loader />}
    </div>
  );
}

export default App;
