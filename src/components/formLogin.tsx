import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Password } from "./image";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function FormLogin() {
  const schema: ZodType<FormData> = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(5, {
      message: "Password should be at least 5 characters long",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false); // State variable for loading state

  const submitData: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    // Perform validation or authentication logic here
    try {
      setIsLoading(true); // Set loading state to true

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login successful
        alert("Login successful!");
        window.location.href = "/maps";
      } else if (response.status === 404) {
        // Email not found
        alert("Email does not exist. Please enter a valid email.");
      } else if (response.status === 401) {
        // Incorrect password
        alert("Incorrect password. Please enter the correct password.");
      } else {
        // Other error occurred
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      // Network error occurred
      console.error(error);
      alert("A network error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <section className="main_login">
      <form className="form_login" onSubmit={handleSubmit(submitData)}>
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
        {errors.email && (
          <span className="errors" aria-live="polite">
            {errors.email.message}
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

        <br />

        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? "Recargando" : "Inicia Sesión"}
        </button>
      </form>
    </section>
  );
}
