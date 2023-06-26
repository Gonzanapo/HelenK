import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import Router from 'next/router';
import z from "zod";
import { useState } from "react";
import { Sign } from "crypto";
import { handleGoogleSignIn } from "~/components/handleGoogleSignIn";
import Google from "next-auth/providers/google";
import { LogoGoogle, Atras } from "../components/image";

export default function Register() {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(5).max(20),
        confirmPassword: z.string().min(5).max((20)),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        try {
            schema.parse(formData);
            // Form data is valid
            // Submit form data
        } catch (error) {
            // Form data is invalid
            // Display error message
        }
    };

    return (
        <div className="contenedor_register">
            <header className="top-header">
                <Link href="/" className="boton_atras">
                    {/* agregar este signo "<"con el id boton_atras_p  */}
                    <Atras />
                    
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
                <form className="form_register" onSubmit={handleSubmit}>
                    <input
                        className="input_register"
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                    // onChange={handleChange}
                    />
                    <input
                        className="input_register"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                    // onChange={handleChange}
                    />
                    <input
                        className="input_register"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirma contraseña"
                    // onChange={handleChange}
                    />
                    <br />
                    <button type="submit" className="button" >
                        Regístrate
                    </button>
                </form>
            </main>
            <main className="bottom-main-register">
                <div>
                    <h3 className="google_facebook">Regístrarse con Google</h3>
                </div>
                <div className="button_auth"  >
                    <button className="button_google" onClick={handleGoogleSignIn}>

                        <LogoGoogle />
                        <h3>
                            Google
                        </h3>
                    </button>
                    {/* <AuthShowcase />  */}
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



// () ? () => void signOut() :() => void signIn()

// ¿No tienes una cuenta? Regístrate
// ¿Olvidaste tu contraseña?