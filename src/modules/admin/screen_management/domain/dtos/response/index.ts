interface ILocation {
  country: string;
  province: string;
}

interface IComponent {
  content: any;
  _id: string;
  type: "weather" | "carousel" | "camera" | "static_info";
  location?: ILocation;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IScreen {
  _id: string;
  name: string;
  assignedOperators: string[];
  components: IComponent[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type TScreensResponse = IScreen[];
