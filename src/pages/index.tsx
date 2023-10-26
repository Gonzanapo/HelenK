/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import SessionChecker from "~/components/Sign/sessionChecker";
import Maps from "~/components/Map/maps";
import { useSession, signOut } from "next-auth/react";
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
  const logout = () => {
    void signOut();
  };


  return (
    <div className="Contenedor-map">
      <SessionChecker />
      <main className="main-map">
        <Maps />
      </main>
      {showNavbar && (
        <nav
          className={`navbar-map ${showNavbar ? "clicked" : ""}`}
          onClick={handleFooterClick}
        >
          <Link href="/sign" passHref>
            <p className={`navbar-link ${showNavbar ? "clicked" : ""}`}>Sign</p>
          </Link>
          <Link href="/sign" passHref>
            <button
              className={`navbar-link ${showNavbar ? "clicked" : ""}`}
              onClick={logout} 
            >
              Log Out
            </button>
          </Link>
        </nav>

        
      )}
      <footer
        className={`footer-map ${showNavbar ? "clicked" : ""}`}
        onClick={handleFooterClick}
      >
        {session ? (
          <>
            <img
              className={`img-user ${showNavbar ? "clicked" : ""}`}
              id="user-real"
              src={session.user.image || "/HelenK.png"}
              alt="User image"
            />
            <h1 className={`username ${showNavbar ? "clicked" : ""}`}>
              {" "}
              {session.user.name}
            </h1>
          </>
        ) : (
          <>
            <NotUser />
            <h1 className={`username ${showNavbar ? "clicked" : ""}`}>
              Invitado
            </h1>
          </>
        )}
      </footer>
    </div>
  );
}
