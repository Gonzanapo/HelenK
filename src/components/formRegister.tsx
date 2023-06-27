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

  const submitData: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Aquí puedes realizar cualquier lógica adicional
  };

  return (
    <div className="main_register">
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
            placeholder="Correo Electrónico"
            // onChange={handleChange}
          />
        </div>
        {errors.email && <span className="errors">{errors.email.message}</span>}
        <div className="input_register">
          <Password />
          <input
            type="password"
            {...register("password")}
            name="password"
            placeholder="Contraseña"
          />
        </div>
        {errors.password && (
          <span className="errors">{errors.password.message}</span>
        )}
        <div className="input_register">
          <Password />
          <input
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
            placeholder="Confirma contraseña"
          />
        </div>
        {errors.confirmPassword && (
          <span className="errors">{errors.confirmPassword.message}</span>
        )}
        <br />
        <button type="submit" className="button">
          Regístrate
        </button>
      </form>
    </div>
  );
}
