import type { ZodType } from "zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Password } from "./image";
import { useState } from "react";

type FormData = {
  name:string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function FormRegister() {
  // Definición del esquema de validación utilizando Zod
  const schema: ZodType<FormData> = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  // Configuración del formulario utilizando react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Función para manejar el envío del formulario
  const submitData: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    try {
      setIsLoading(true);
      setErrorMessage("");

      // Verificar si el email existe en la base de datos
      const emailExistsResponse = await fetch(`/api/check-email-exists?email=${data.email}`);
      if (!emailExistsResponse.ok) {
        throw new Error("An error occurred. Please try again later.");
      }

      // Enviar el formulario
      const submitFormResponse = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (submitFormResponse.ok) {
        window.location.href = "/";
      } else if (submitFormResponse.status === 401) {
        setErrorMessage("Incorrect password. Please enter the correct password.");
      } else if (submitFormResponse.status === 500) {
        setErrorMessage("El email ya existe. Por favor ingrese otro email.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main_register">
      <form
        className="form_register"
        onSubmit={(e) => {
          handleSubmit(submitData)(e).catch((error) => {
            console.error(error);
          });
        }}
      >
        {/* Campo de entrada para el email */}
        <div className="input_register">
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
        {errorMessage && (
          <span className="errors" aria-live="polite">
            {errorMessage}
          </span>
        )}

        {/* Campo de entrada para la contraseña */}
        <div className="input_register">
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

        {/* Campo de entrada para confirmar la contraseña */}
        <div className="input_register">
          <Password />
          <input
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirma contraseña"
            alt="Confirma contraseña"
          />
        </div>
        {errors.confirmPassword && (
          <span className="errors" aria-live="polite">
            {errors.confirmPassword.message}
          </span>
        )}

        <br />

        {/* Botón de envío del formulario */}
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? (
            <div className="loading-animation"></div>
          ) : (
            "Registrarse"
          )}
        </button>
      </form>
    </section>
  );
}
