import { useQuery } from "@tanstack/react-query";
import { createScreenRepository } from "../repository";
import { getAssignedScreen, getScreen } from "../../application";
const screenRepository = createScreenRepository();

export const useGetScreens = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["screen-list"],
    queryFn: async () => getAssignedScreen(screenRepository)(),
  });
  return { data, isLoading, isError };
};

export const useGetScreen = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["screen"],
    queryFn: async () => getScreen(screenRepository)(id),
  });
  return { data, isLoading, isError };
};
