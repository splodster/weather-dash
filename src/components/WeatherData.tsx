import {
  WiBarometer,
  WiCloudy,
  WiDirectionUpRight,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiWindy,
} from "react-icons/wi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Widgets from "./Widgets";
import { MdOutlineVisibility } from "react-icons/md";

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
}

const WeatherData = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error: GeolocationPositionError) => {
          console.error("error getting current position", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Weather API fetch
  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeatherData = async () => {
        const apiKEY = import.meta.env.VITE_WEATHER_API_KEY;
        const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly,daily&appid=${apiKEY}`;

        const response = await fetch(apiURL);
        const data = await response.json();
        setWeatherData(data);
      };
      fetchWeatherData();
    }
  }, [latitude, longitude]);

  const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15;
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div>
      {weatherData ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Widgets
            label="Weather conditions"
            value={weatherData.current.weather[0].description}
            icon={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`}
          />
          <Widgets
            label="Sunrise"
            value={`${formatDate(weatherData.current.sunrise)}`}
            icon={<WiSunrise />}
          />
          <Widgets
            label="Sunset"
            value={`${formatDate(weatherData.current.sunset)}`}
            icon={<WiSunset />}
          />
          <Widgets
            label="Temperature"
            value={`${kelvinToCelsius(weatherData.current.temp).toFixed(2)}°C`}
            icon={<FaTemperatureHalf />}
          />
          <Widgets
            label="Feels like"
            value={`${kelvinToCelsius(weatherData.current.feels_like).toFixed(2)}°C`}
            icon={<WiThermometer />}
          />

          <Widgets
            label="Humidity"
            value={`${weatherData.current.humidity}%`}
            icon={<WiHumidity />}
          />
          <Widgets
            label="Pressure"
            value={`${weatherData.current.pressure} hPA`}
            icon={<WiBarometer />}
          />
          <Widgets label="UV Index" value={`${weatherData.current.uvi}`} />
          <Widgets
            label="Cloud Cover"
            value={`${weatherData.current.clouds} %`}
            icon={<WiCloudy />}
          />
          <Widgets
            label="Visibility"
            value={`${weatherData.current.visibility / 1000} km`}
            icon={<MdOutlineVisibility />}
          />
          <Widgets
            label="Wind Speed"
            value={`${weatherData.current.wind_speed} m/s`}
            icon={<WiWindy />}
          />
          <Widgets
            label="Wind Direction"
            value={`${weatherData.current.wind_deg}°`}
            icon={<WiDirectionUpRight />}
          />
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherData;
