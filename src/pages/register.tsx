import Link from "next/link";
import { useState } from "react";
import { handleGoogleSignIn } from "~/components/handleGoogleSignIn";
import { LogoGoogle, Previous, User, Password, PasswordFill } from "../components/image";
import { FormRegister } from "~/components/formRegister";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Validate form data
        } catch (error) {
            // Handle validation error
        }
    };

    return (
        <div className="contenedor_register">
            <header className="top-header">
                <Link href="/" className="boton_atras" passHref>
                    <Previous />
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
                <FormRegister />
            </main>
            <main className="bottom-main-register">
                <div>
                    <h3 className="google_facebook">Iniciar Sesión con Google</h3>
                </div>
                <div className="button_auth">
                    <button className="button_google" onClick={handleGoogleSignIn}>
                        <LogoGoogle />
                        <h3>Google</h3>
                    </button>
                </div>
            </main>
            <footer className="footer_register">
                <nav className="Navbar_register">
                    <Link href="" className="NavbarLink_register" passHref>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link href="" className="NavbarLink_register" passHref>
                        Términos y condiciones y la Política de privacidad
                    </Link>
                </nav>
            </footer>
        </div>
    );
}
