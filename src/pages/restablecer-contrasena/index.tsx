import { NextPage } from "next";
import {
  Autocomplete,
  Loader,
} from "@mantine/core";
import { useState, useRef } from "react";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { HelenK, Previous } from "~/components/image";

const Recover: NextPage = () => {
  return (
    <div className="full">
      <header className="top-header">
        <Link href="/" className="boton_atras" passHref>
          <Previous />
        </Link>
      </header>
      <header className="header-helenk">
        <HelenK />
      </header>
      <section className="section-resetpwd">
        <h1 className="heading-resetpwd">Recupera tu contraseña</h1>
        <h3 className="subheading-resetpwd">
          Ups. Nos pasa a los mejores.
          <br />Ingrese su dirección de correo
          electrónico para solucionar el problema.
        </h3>
      </section>
      <main className="main-resetpwd">
        <RecoverForm />
      </main>
    </div>
  );
};

const RecoverForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const { mutate: sendPasswordEmail } =
    api.email.sendPasswordEmail.useMutation();

  const timeoutRef = useRef<number>(-1);

  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setError(false);
    setValue(val);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes("@")) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(
          ["gmail.com", "outlook.com", "yahoo.com"].map(
            (provider) => `${val}@${provider}`
          )
        );
      }, 500);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    let errorMessage = "";

    if (!email.includes("@") || !email.includes(".")) {
      errorMessage = "Ingrese un Email";
      setError(true);
    }

    if (errorMessage) {
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
      setIsLoading(false);
    } else {
      sendPasswordEmail(
        { email },
        {
          onSuccess: () => {
            notifications.show({
              title: "Email enviado",
              message: "Se envio un email para recuperar la contraseña",
              color: "green",
            });
            setIsLoading(false);
            setError(false);
          },
          onError: (error) => {
            notifications.show({
              title: "Error",
              message: error.message,
              color: "red",
            });
            setIsLoading(false);
          },
        }
      );
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="email-form">
        {/* <h2 className="form-label">Email</h2> */}
        <Autocomplete  
          {...(error ? { error } : {})}
          value={value}
          data={data}
          onChange={handleChange}
          rightSection={loading ? <Loader size="1rem" /> : null}
          placeholder="Your email"
          className="form-input"
          
        />
      </div>
      <div className="form-footer">

      <button type="submit" className="form-button" disabled={isLoading}>
        {isLoading ? (
          <div className="loading-animation"></div>
        ) : (
          "Recupera tu contraseña"
        )}
      </button>
      </div>
    </form>
  );
};

const MyApp: NextPage = () => {

  return (
    <Recover />
  );
};

export default MyApp;
