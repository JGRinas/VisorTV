import { useQuery } from "@tanstack/react-query";
import { createAdminRepository } from "../repository";
import { getUsers } from "../../application";

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
