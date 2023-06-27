import { FormEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Aquí puedes enviar los datos de inicio de sesión al servidor
    // y manejar la respuesta
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="contenedor_login">
      <header className="header_login">
        <h1>Iniciar Sesión</h1>
      </header>
      <main className="main_login">
        <form className="form_login" onSubmit={handleSubmit}>
          <label className="label_login" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="input_login"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Correo electrónico"
            required
          />
          <label className="label_login" htmlFor="password">
            Contraseña
          </label>
          <input
            className="input_login"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            required
          />
          <button className="button_login" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </main>
      <footer className="footer_login">
        <nav className="Navbar_login">
          <p className="NavbarLink_login">¿Olvidaste tu contraseña?</p>
          <p className="NavbarLink_login">¿No tienes una cuenta? Regístrate</p>
        </nav>
      </footer>
    </div>
  );
}