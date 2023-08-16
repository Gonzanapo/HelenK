import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';



const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
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

    useEffect(() => {
        // Rest of the code remains the same as before
        // ...
    }, []);

    // The rest of the code remains the same as before
    // ...

    return (
        <div className='Map'>
            <div className="commutes">
                <button id="button_commute">Centrar</button>
                <div className="commutes-map" aria-label="Map" id="Map">
                    <div className="map-view"></div>
                </div>

            </div>


            <LoadScript
                googleMapsApiKey="TU_CLAVE_API"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Aquí puedes agregar marcadores, polígonos, etc. */}
                </GoogleMap>
            </LoadScript>


        </div>
    );
}

