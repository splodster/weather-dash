import Location from "./components/Location";
import WeatherData from "./components/WeatherData";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center">
      <div className="fixed shadow-xl top-0 bg-slate-800 w-screen p-5 text-white ">
        <h1 className="text-5xl">Weather Dashboard</h1>
        <Location />
      </div>
      <WeatherData />
    </div>
  );
}

export default App;
