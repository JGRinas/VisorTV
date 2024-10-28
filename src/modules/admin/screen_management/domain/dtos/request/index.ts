export interface IComponentPayload {
  type: "weather" | "carousel" | "camera" | "static_info";
  location?: {
    country: string;
    province: string;
  };
  imageUrl?: string;
  content?: string;
}

export interface IScreenPayload {
  name: string;
  assignedOperators: string[];
  components: IComponentPayload[];
}
