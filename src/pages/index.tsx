import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import SessionChecker from "~/components/Sign/sessionChecker";
import Maps from "~/components/Map/maps";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { NotUser } from "~/components/image";

export default function Mapa() {
  useEffect(() => {
    // Rest of the code remains the same as before
    // ...
  }, []);

  // The rest of the code remains the same as before
  // ...

  const { data: session } = useSession();

  return (
    <div className="Contenedor-map">
      <SessionChecker />
      <header className="top-header-map">
        {/* Placeholder for the logo */}
        <a href="#">
          <div className="marca-map">
            {/* <img src="LOGO.svg" alt="Logo" /> */}
          </div>
        </a>
      </header>
      <header className="header-map">
        {/* Placeholder for navigation links */}
        {/* ... */}
      </header>
      <main className="main-map">
        <Maps />
      </main>
      <footer className="footer-map">
        {session ? (
          // Usar un fragmento para envolver los elementos
          <>
            <img
              className="img-user"
              src={session.user.image || "/HelenK.png"}
              alt="User image"
            />
            <h1 className="username"> {session.user.name}</h1>
          </>
        ) : (
          <>
              <NotUser/>
            <h1 className="username"> Invitado </h1>
          </>
        )}
      </footer>
    </div>
  );
}

// <footer className="footer-responsive">
// HOLIS
// {/* Placeholder for responsive footer content */}
// {/* ... */}
// </footer>
