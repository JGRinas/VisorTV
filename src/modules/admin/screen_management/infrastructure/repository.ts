import { API } from "~/config/axios";
import { IScreenRepository } from "../domain/repository";
import { IScreenPayload } from "../domain/dtos/request";

export function createScreenRepository(): IScreenRepository {
  return { createScreen, updateScreen, getAssignedScreen };
}

async function createScreen(payload: IScreenPayload) {
  const { data } = await API.SCREEN.post("create", payload);
  return data;
}
async function updateScreen(payload: IScreenPayload, id: string) {
  const { data } = await API.SCREEN.put(`update/${id}`, payload);
  return data;
}

async function getAssignedScreen() {
  const { data } = await API.USER.get("assigned");
  return data;
}
