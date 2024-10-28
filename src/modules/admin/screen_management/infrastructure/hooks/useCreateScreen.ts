import { useMutation } from "@tanstack/react-query";
import { createScreenRepository } from "../repository";
import { createScreen } from "../../application";
import { IScreenPayload } from "../../domain/dtos/request";

const screenRepository = createScreenRepository();

export const useCreateScreen = () => {
  const {
    mutateAsync: addScreen,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["createScreen"],
    mutationFn: async (screenData: IScreenPayload) =>
      createScreen(screenRepository)(screenData),
    onSuccess: () => {
      console.log("creado");
    },
  });

  return { addScreen, isError, isPending };
};
