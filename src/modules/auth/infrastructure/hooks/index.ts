import { useMutation, useQuery } from "@tanstack/react-query";
import { createAuthRepository } from "../repository";
import { getProfile, login } from "../../application";
import { ILoginRequestDTO } from "../../domain/dtos/request";
import { useAppDispatch } from "~/store";
import { fetchUserInfo, saveJWT } from "../user-slice";
import { useNavigate } from "react-router-dom";

const authRepository = createAuthRepository();

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutateAsync: onLogin,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (params: ILoginRequestDTO) =>
      await login(authRepository)(params),
    onSuccess: ({ token }) => {
      dispatch(saveJWT({ token }));
      dispatch(fetchUserInfo());
      navigate("/");
    },
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
