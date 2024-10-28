import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScreenRepository } from "../repository";
import { deleteScreen, updateScreen } from "../../application";
import { IUpdateScreenParams } from "../../domain/dtos/request";

const screenRepository = createScreenRepository();

export const useUpdateScreen = () => {
  const {
    mutateAsync: modifyScreen,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["update-screen"],
    mutationFn: async ({ screenData, id }: IUpdateScreenParams) =>
      updateScreen(screenRepository)(screenData, id),
    onSuccess: () => {
      console.log("modificado");
    },
  });

  return { modifyScreen, isError, isPending };
};

export const useDeleteScreen = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: removeScreen,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["delete-screen"],
    mutationFn: async (id: string) => deleteScreen(screenRepository)(id),
    onSuccess: () => {
      console.log("eliminado");
      queryClient.invalidateQueries({ queryKey: ["screen-list"] });
    },
  });

  return { removeScreen, isError, isPending };
};
