import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { coordsX, coordsY } from "~/components/Map/sema";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -34.564959,
  lng: -58.450324,
};

const mapOptions = {
  center: center,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoom: 18,
  zoomControl: false,
  maxZoom: 20000,
  mapId: "a1167de20e6b3769",
};

export default function Maps() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  const [coords, setCoords] = useState<
    Array<{
      lat: number;
      lng: number;
    }>
  >([]);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapViewRef = useRef(null);
  let minDistance = Infinity;
  const radius = 0.00026903;

  function isInCircle() {
    console.log(minDistance <= radius ** 2);
    return minDistance <= radius ** 2;
  }
  setInterval(isInCircle, 500);
  useEffect(() => {
    console.log("El componente GoogleMap se ha renderizado");
    navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: -34.6333901,
          lng: -58.39829843,
        });
      },
      () => alert("Geolocation is not supported by this browser.")
    );
  }, []);

  const newCoords: { lat: number; lng: number }[] = [];

  navigator.geolocation.getCurrentPosition(function(position) {
    if (coordsX && coordsY) {
      const coordsUbi = [position.coords.longitude, position.coords.latitude];
  
      for (let i = 0; i < coordsX.length; i++) {
        newCoords.push({
          lat: parseFloat(coordsX[i] || "0"),
          lng: parseFloat(coordsY[i] || "0"),
        });
        const d =
          (parseFloat(coordsX[i] || "0") - coordsUbi[0]) ** 2 +
          (parseFloat(coordsY[i] || "0") - coordsUbi[1]) ** 2;
        if (minDistance > d) {
          minDistance = d;
        }
      }
  
      setCoords(newCoords); // Asegúrate de que esta función esté definida
    }
  });
    return (
      <div className="Map">
        <div className="buttons-routes">
          <h2 className="button-commute">Seguimiento de Ruta</h2>
          <h2 className="button-route">
            <li className="h2-route">
              En camino
              <br />
              <h4 className="h4-route">Salida 12:22:45</h4>
            </li>
            <li className="h2-route">
              10. min restantes
              <br />
              <h4 className="h4-route">Llegada 12:55:14</h4>
            </li>
          </h2>
        </div>
        <button
          className="button-centrar"
          onClick={() => {
            if (map && userLocation) {
              map.panTo(
                new google.maps.LatLng(userLocation.lat, userLocation.lng)
              );
              map.setZoom(18);
            }
          }}
        >
          Centrar
        </button>
        <div className="commutes">
          <div className="commutes-map" aria-label="Map" id="Map">
            <LoadScript googleMapsApiKey="AIzaSyBEJtEhY1iMBrrsDlLMUxbzk-bvZrpJHBQ&">
              <div className="map-view" ref={mapViewRef}>
                <GoogleMap
                  onLoad={setMap}
                  id="GoogleMap"
                  mapContainerStyle={containerStyle}
                  options={mapOptions}
                >
                  {userLocation && coords && (
                    <>
                      <Marker
                        position={userLocation}
                        icon={
                          window.google?.maps && {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: "#3083C4",
                            fillOpacity: 1,
                            strokeColor: "#fff",
                            strokeWeight: 3,
                            strokeOpacity: 1,
                          }
                        }
                      />
                      <Circle
                        center={userLocation}
                        radius={10}
                        options={{
                          strokeColor: "#115A9D",
                          strokeOpacity: 0,
                          strokeWeight: 2,
                          fillColor: "#115A9D",
                          fillOpacity: 0.15,
                        }}
                      />
                      {coords.map((coords, index) => (
                        <Circle
                          key={index}
                          center={coords}
                          radius={30}
                          options={{
                            strokeColor: "grey",
                            strokeOpacity: 0,
                            strokeWeight: 0,
                            fillColor: "grey",
                            fillOpacity: 0.2,
                          }}
                        />
                      ))}
                    </>
                  )}
                </GoogleMap>
              </div>
            </LoadScript>
          </div>
        </div>
      </div>
    );
  }
}
