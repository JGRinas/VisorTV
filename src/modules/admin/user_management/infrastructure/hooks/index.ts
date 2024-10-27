import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdminRepository } from "../repository";
import { getUsers } from "../../application";
import {
  IEditUserRequestDTO,
  IRegisterUserDTO,
} from "../../domain/dtos/request";

const adminRepository = createAdminRepository();
export function useUsers(page = 1, limit = 10) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: async () => await getUsers(adminRepository)({ page, limit }),
  });

  return {
    users: data?.users,
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.currentPage ?? 1,
    isLoading,
    isError,
  };
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminRepository.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IEditUserRequestDTO;
    }) => adminRepository.editUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (newUser: IRegisterUserDTO) => {
      return await adminRepository.registerUser(newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error registrando el usuario", error);
    },
  });
};
