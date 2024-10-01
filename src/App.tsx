import Location from "./components/Location";
import WeatherData from "./components/WeatherData";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center">
      <Location />
      <WeatherData />
    </div>
  );
}

export default App;
