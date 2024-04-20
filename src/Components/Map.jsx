/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../hooks/Geolocation";
import Button from "./Button";

function Map() {
  const [searchParam] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([0, 0]);
  const { cities } = useCities();
  const { isLoading, position, getPosition } = useGeolocation();
  const maplat = searchParam.get("lat");
  const maplng = searchParam.get("lng");

  useEffect(
    function () {
      if (maplat && maplng) setMapPosition([maplat, maplng]);
    },
    [maplat, maplng]
  );
  useEffect(
    function () {
      if (position.lat && position.lng)
        setMapPosition([position.lat, position.lng]);
    },
    [position.lat, position.lng]
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={9}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClicked />
      </MapContainer>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "Loading..." : "Go to Your Position"}
      </Button>
    </div>
  );
}
function ChangeCenter({ position }) {
  // console.log(position);
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClicked() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
