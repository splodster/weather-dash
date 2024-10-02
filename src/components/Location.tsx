import { useState, useEffect } from "react";
import { IoMdPin } from "react-icons/io";

const Location = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

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

  return (
    <div className="flex items-center">
      <IoMdPin size={20} />
      <p>
        latitude: {latitude?.toPrecision(3)}, longitude:{" "}
        {longitude?.toPrecision(3)}
      </p>
    </div>
  );
};

export default Location;
