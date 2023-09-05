import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSession } from 'next-auth/react';

// Establece el ancho y el alto del componente al 100%
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -34.564959,
  lng: -58.450324,
};

// Define las opciones de mapa
const mapOptions = {
  center: center,
  fullscreenControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  zoom: 16,
  zoomControl: true,
  maxZoom: 20000,
  mapId: "a1167de20e6b3769",
};

export default function Maps() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [realTime, setRealTime] = useState(null);
  const [circulo, setCirculo] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circulos, setCirculos] = useState([]);
  const [coordsUbi, setCoordsUbi] = useState([0, 0]);
  const [semaforos, setSemaforos] = useState(null);
  const [minDistance, setMinDistance] = useState(50000);

  const { data: session } = useSession();

  // Crea refs para cada elemento que quieras seleccionar
  const mapViewRef = useRef(null);
  const initialStatePanelRef = useRef(null);
  const modalRef = useRef(null);

  // Utiliza las refs para acceder a los elementos del DOM
  const commutesEl = {
    map: mapViewRef.current,
    initialStatePanel: initialStatePanelRef.current,
    modal: modalRef.current,
  };

  // Accede a las propiedades del objeto commutesEl
  const mapElement = commutesEl.map;
  const initialStatePanelElement = commutesEl.initialStatePanel;
  const modalElement = commutesEl.modal;

  useEffect(() => {
    // Rest of the code remains the same as before ...
  }, []);

  // The rest of the code remains the same as before ...

  return (
    <div className="Map">
      <div className="buttons-routes">
        <h2 className="button-commute"> Seguimiento de Ruta </h2>
        <h2 className="button-route">
          <li className="h2-route">
            {" "}
            En camino <br /> <h4 className="h4-route">
              {" "}
              Salida 12:22:45 {" "}
            </h4>{" "}
          </li>
          <li className="h2-route">
            {" "}
            10. min restantes <br />{" "}
            <h4 className="h4-route"> Llegada 12:55:14 </h4>{" "}
          </li>
        </h2>
      </div>
      <div className="commutes">
        <div className="commutes-map" aria-label="Map" id="Map">
          <LoadScript googleMapsApiKey="AIzaSyBEJtEhY1iMBrrsDlLMUxbzk-bvZrpJHBQ&">
            <div className="map-view" ref={mapViewRef}>
              {/* Pasa el objeto mapOptions como prop al componente GoogleMap */}
              <GoogleMap
                id="GoogleMap"
                mapContainerStyle={containerStyle}
                options={mapOptions}
              ></GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
      <footer className="footer-maps">
  {session ? (
    // Usar un fragmento para envolver los elementos
    <>
      <h1>Bienvenido {session.user.name}</h1>
      <img src={session.user.image || "/default.png"} alt="User image" />

    </>
  ) : (
    <h1>Bienvenido Invitado</h1>
  )}
</footer>


    </div>
  );
}

//VAMOS BOCA CARAJO
