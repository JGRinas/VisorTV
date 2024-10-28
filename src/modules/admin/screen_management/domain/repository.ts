import { IScreenPayload } from "./dtos/request";
import { IScreen, TScreensResponse } from "./dtos/response";

export interface IScreenRepository {
  createScreen: (payload: IScreenPayload) => Promise<unknown>;
  updateScreen: (payload: IScreenPayload, id: string) => Promise<unknown>;
  getAssignedScreen: () => Promise<TScreensResponse>;
  getScreen: (id: string) => Promise<IScreen>;
  deleteScreen: (id: string) => Promise<void>;
}
