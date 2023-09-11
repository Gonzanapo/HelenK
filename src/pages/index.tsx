

import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import SessionChecker from "~/components/Sign/sessionChecker";
import Maps from "~/components/Map/maps";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useSession } from "next-auth/react";
import { NotUser } from "~/components/image";
import Link from "next/link"; // Import Link component from next/link

export default function Mapa() {
  useEffect(() => {
    // Rest of the code remains the same as before
    // ...
  }, []);

  // The rest of the code remains the same as before
  // ...

  const { data: session } = useSession();

  // Define state variable and setter function for navbar visibility
  const [showNavbar, setShowNavbar] = useState(false);

  // Define a function to toggle the navbar visibility
  const handleFooterClick = () => {
    setShowNavbar(!showNavbar);
  };

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
      {/* Añade una condición al atributo className del footer */}
      <footer
        className={`footer-map ${showNavbar ? "clicked" : ""}`}
        onClick={handleFooterClick}
      >
        {session ? (
          // Usar un fragmento para envolver los elementos
          <>
            <img
              className="img-user"
              id="user-real"
              src={session.user.image || "/HelenK.png"}
              alt="User image"
            />
            <h1 className="username"> {session.user.name}</h1>
          </>
        ) : (
          <>
            <NotUser />
            <h1 className="username"> Invitado </h1>
          </>
        )}
      </footer>

      {/* Add a conditional rendering expression for the navbar */}
      {showNavbar && (
        <nav className="navbar-map">
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/link">
            <p>Link</p>
          </Link>
        </nav>
      )}
    </div>
  );
}

// <footer className="footer-responsive">
// HOLIS
// {/* Placeholder for responsive footer content */}
// {/* ... */}
// </footer>
