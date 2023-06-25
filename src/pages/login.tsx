export default function Login() {

    return (
        <div className="contenedor">

            <header className="header">
                <h1>
                    Iniciar Sesión
                </h1>
            </header>
            <main className="main">
                <form className="form">
                    <label className="label">Correo electrónico</label>
                    <input className="input" type="email" placeholder="Correo electrónico" />
                    <label className="label">Contraseña</label>
                    <input className="input" type="password" placeholder="Contraseña" />
                    <button className="button">Iniciar Sesión</button>
                </form>
            </main>
            <footer className="footer">
                <nav className="Navbar">
                    <p className="NavbarLink">¿Olvidaste tu contraseña?</p>
                    <p className="NavbarLink">¿No tienes una cuenta? Regístrate</p>
                </nav>
            </footer>
        </div>
    );

}

