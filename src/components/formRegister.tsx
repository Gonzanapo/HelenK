import type { ZodType } from "zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Password } from "./image";



type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export function FormRegister() {
  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const submitData: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    window.location.href ="/maps"
    // Enviar los datos del formulario a la ruta API
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    // Verificar si la solicitud fue exitosa
    if (response.ok) {
      // La solicitud fue exitosa
      // Aquí puedes manejar el caso de éxito como prefieras
    } else {
      // Ocurrió un error al enviar la solicitud
      // Aquí puedes manejar el caso de error como prefieras
    }
  };
  

  return (
    <section className="main_register">
  <form
    className="form_register"
    onSubmit={(e) => {
      handleSubmit(submitData)(e).catch((error) => {
        // Aquí puedes manejar el error
        console.error(error);
      });
    }}
  >
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
    {errors.email && (
      <span className="errors" aria-live="polite">
        {errors.email.message}
      </span>
    )}
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

    <button type="submit" className="button">
      Regístrate
    </button>
  </form>
</section>
  );
}
