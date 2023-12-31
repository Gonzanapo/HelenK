/* eslint-disable @next/next/link-passhref */
import z from "zod";
import type { ZodType } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Password } from "./image";
import { useState } from "react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export function FormLogin() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email({
      message: "Por favor ingrese un correo electrónico válido",
    }),
    password: z.string().min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const submitData: SubmitHandler<FormData> = (data) => {
    console.log("Submit function called with data:", data);

    try {
      setIsLoading(true); 
      setErrorMessage(""); 
      setErrorEmail("")

      fetch("/api/check-email?email=" + data.email)
        .then((response) => {
          console.log("Check email response:", response);
          if (response.ok) {
            fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                console.log("Login response:", response);
                if (response.ok) {
                  window.location.href = "/";
                } else if (response.status === 401) {
                  setErrorMessage("Incorrect password. Please enter the correct password.");
                } else {
                  setErrorMessage("An error occurred. Please try again later.");
                }
              })
              .catch((error) => {
                console.error(error);
                setErrorMessage("A network error occurred. Please try again later.");
              });
          } else if (response.status === 404) {
            setErrorEmail("El Email no existe o no estás registrado. Por Favor ingresa un email valido.");
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("A network error occurred. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false); 
        });
    } catch (error) {
      console.error(error);
      alert("A network error occurred. Please try again later.");
    }
  };
  return (
    <section className="main_login">

      <form
        className="form_login"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(submitData)(event).catch((error) => {
            console.error(error);
          });
        }}
      >
        <div className="input_login">
          <User />
          <input
            type="email"
            {...register("email")}
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            alt="Correo Electrónico"
          />
        </div>
        {errorEmail && (
          <span className="errors" aria-live="polite">
            {errorEmail}
          </span>
        )}
        <div className="input_login">
          <Password />
          <input
            type="password"
            {...register("password")}
            name="password"
            id="password"
            placeholder="Contraseña"
            alt="Contraseña"
          />
        </div>
        {errors.password && (
          <span className="errors" aria-live="polite">
            {errors.password.message}
          </span>
        )}
        {errorMessage && (
          <span className="errors">{errorMessage}</span>
        )}
        <br />

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? (
            <div className="loading-animation"></div>
          ) : (
            "Inicia Sesión"
          )}
        </button>
        <Link href="/restablecer-contrasena">
          <p className="link_contra">¿Olvidaste tu constraseña?</p>
        </Link>
      </form>
    </section>
  );
}
    