import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

export default function Register() {
    return (
        <div className="contenedor_register">
            <header className="top-header">
                <Link href="/" className="boton_atras">
                    {/* agregar este signo "<"con el id boton_atras_p  */}
                    <p id="boton_atras_p"></p>
                </Link>
            </header>
            <header className="header_register">
                <h1>Bienvenido a HelenK</h1>
                <h2>
                    Estamos felices de verte!
                    <br />
                    Gracias por elegirnos.
                </h2>   
            </header>
            <main className="main_register">
                <form className="form_register">
                    
                    <input className="input_register" type="name" placeholder="Nombre Completo" />
                    <input className="input_register" type="email" placeholder="Correo Electrónico" />
                    <input className="input_register" type="password" placeholder="Contraseña" />
                    <input className="input_register" type="password" placeholder="Confirma contraseña" />
                    <br />
                    <button type="submit" className="button">Regístrate</button>
                </form>
            </main>
            <main className="bottom-main-register">
                <div>
                    <h3 className="google_facebook">Iniciar Sesión con Google</h3>
                </div>
                <div className="button_auth">
                    <AuthShowcase />
                </div>

            </main>
            <footer className="footer_register">
                <nav className="Navbar_register">
                    <Link href="" className="NavbarLink_register">¿Ya tenes una cuenta? Inicia Sesión</Link>
                    <Link href="" className="NavbarLink_register"> Términos y condiciones y la Política de privacidad</Link>
                </nav>
            </footer>
        </div>
    );
}

function AuthShowcase() {
    const { data: sessionData } = useSession();

    const { data: secretMessage } = api.example.getSecretMessage.useQuery(
        undefined, // no input
        { enabled: sessionData?.user !== undefined },
    );

    return  (
        <div className="button_auth">
            <button
                className="button_google"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
}

// ¿No tienes una cuenta? Regístrate
// ¿Olvidaste tu contraseña?