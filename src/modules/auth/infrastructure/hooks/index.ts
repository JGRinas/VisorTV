import { useMutation, useQuery } from "@tanstack/react-query";
import { createAuthRepository } from "../repository";
import { getProfile, login } from "../../application";
import { ILoginRequestDTO } from "../../domain/dtos/request";

const authRepository = createAuthRepository();

export const useLogin = () => {
  const {
    mutateAsync: onLogin,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: ILoginRequestDTO) =>
      await login(authRepository)(params),
    onSuccess: (data) => console.log("Login success", data),
    onError: (error) => console.error("Login error", error),
  });
  return { onLogin, isPending, isError };
};

export const useGetProfile = () => {
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => getProfile(authRepository)(),
  });
  return { profileData, isLoading, isError };
};
