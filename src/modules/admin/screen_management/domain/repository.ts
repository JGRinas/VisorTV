import { IScreenPayload } from "./dtos/request";

export interface IScreenRepository {
  createScreen: (payload: IScreenPayload) => Promise<unknown>;
  updateScreen: (payload: IScreenPayload, id: string) => Promise<unknown>;
  getAssignedScreen: () => Promise<void>;
}
