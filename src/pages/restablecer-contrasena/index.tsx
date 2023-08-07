import { NextPage } from "next";
import { ColorSchemeProvider, ColorScheme, Button, Autocomplete, Text, Loader, useMantineColorScheme } from "@mantine/core";
import { useState, useRef } from "react";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

const Recover: NextPage = () => {

  return (
    <div className="full-container">
      
      <main className="main">
        <div className="logo-container">
          <Link href="/" passHref>
            {/* <Logo width={40} height={40} /> */}
          </Link>
        </div>
        <section
          className="section"
        >
          <h1
            className="heading"
          >
            Recuperar Contraseña
          </h1>
          <h3 className="subheading">
            Te enviaremos un mail para recuperarla
          </h3>
          <RecoverForm />
        </section>
       
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
     
      <div className="">
        <h2 className="form-label">
          Email
        </h2>
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
      <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? (
            <div className="loading-animation"></div>
          ) : (
            "Recuperar contraseña"
          )}
        </button>
    </form>
  );
};

const MyApp: NextPage = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  const toggleColorScheme = () => {
    setColorScheme((prevColorScheme) =>
      prevColorScheme === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Recover />
    </ColorSchemeProvider>
  );
};



export default MyApp;