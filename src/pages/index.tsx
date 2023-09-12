import React, { useEffect, useState } from "react";
import SessionChecker from "~/components/Sign/sessionChecker";
import Maps from "~/components/Map/maps";
import { useSession } from "next-auth/react";
import { NotUser } from "~/components/image";
import Link from "next/link";
import { useSwipeable } from 'react-swipeable';
export default function Mapa() {
  const { data: session } = useSession();
  const [showNavbar, setShowNavbar] = useState(false);
  const handleFooterClick = () => {
    setShowNavbar(!showNavbar);
  };
  const handleSwipeUp = () => { setShowNavbar(true); };
  const handleSwipeDown = () => { setShowNavbar(false); };
  const handlers = useSwipeable({ onSwipedUp: handleSwipeUp, onSwipedDown: handleSwipeDown });
  return (
    <div className="Contenedor-map">
      <SessionChecker />
      <main className="main-map">
        <Maps />
      </main>
      {showNavbar && (
        <nav className={`navbar-map ${showNavbar ? "clicked" : ""}`} onClick={handleFooterClick}>
          <Link href="/">
            <p className={`navbar-link ${showNavbar ? "clicked" : ""}`}>Home</p>
          </Link>
          <Link href="/link">
            <p className={`navbar-link ${showNavbar ? "clicked" : ""}`}>Link</p>
          </Link>
        </nav>
      )}
      <footer
        className={`footer-map ${showNavbar ? "clicked" : ""}`}
        onClick={handleFooterClick}
        {...handlers}
      >
        {session ? (
          <>
            <img
              className={`img-user ${showNavbar ? "clicked" : ""}`}
              id="user-real"
              src={session.user.image || "/HelenK.png"}
              alt="User image"
            />
            <h1 className={`username ${showNavbar ? "clicked" : ""}`}> {session.user.name}</h1>
          </>
        ) : (
          < >
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