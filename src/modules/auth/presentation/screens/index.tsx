import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ILoginRequestDTO } from "../../domain/dtos/request";
import { loginSchema } from "../../domain/schemas/loginSchema";

import "./Login.css";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequestDTO>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: ILoginRequestDTO) => {
    console.log("Login data", data);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};
