import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginRequestDTO } from "../../domain/dtos/request";
import { loginSchema } from "../../domain/schemas/loginSchema";
import "./Login.css";
import { useLogin } from "../../infrastructure/hooks";
import { InputField } from "../components/input-field";

export const Login = () => {
  const methods = useForm<ILoginRequestDTO>({
    resolver: yupResolver(loginSchema),
  });

  const { onLogin, isError, isPending } = useLogin();

  const onSubmit = (data: ILoginRequestDTO) => onLogin(data);

  return (
    <FormProvider {...methods}>
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Ingresa tu correo"
            />
            {methods.formState.errors.email && (
              <p className="error-message">
                {methods.formState.errors.email.message}
              </p>
            )}
            <InputField
              name="password"
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
            />
            {methods.formState.errors.password && (
              <p className="error-message">
                {methods.formState.errors.password.message}
              </p>
            )}
            <button type="submit" className="login-button" disabled={isPending}>
              {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          {isError && (
            <div className="error-message">
              <p>Usuario o contraseña incorrectos</p>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};
