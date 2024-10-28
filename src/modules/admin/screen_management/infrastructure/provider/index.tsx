import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { adaptScreenDataToBackend } from "../adapters/screen-data";
import { useCreateScreen } from "../hooks/useCreateScreen";
import { useUpdateScreen } from "../hooks/useUpdateScreen";
import { IScreen } from "../../domain/dtos/response";
import { adaptBackendDataToScreenData } from "../adapters/screen-response";

export type ComponentType =
  | "location"
  | "temperature"
  | "humidity"
  | "pressure"
  | "wind"
  | "visibility";

interface CarouselItem {
  id: number;
  imageUrl: string;
}

export interface ScreenData {
  name: string;
  components: { id: number; type: ComponentType }[];
  carouselItems: CarouselItem[];
  isCameraVisible: boolean;
  staticInfoContent: string;
  assignedOperators: string[];
  weatherItems: string[];
}

interface ScreenContextProps {
  screenData: ScreenData;
  addComponent: (type: ComponentType) => void;
  removeComponent: (id: number) => void;
  addOperator: (operatorId: string) => void;
  removeOperator: (operatorId: string) => void;
  addCarouselItem: (imageUrl: string) => void;
  addScreenName: (name: string) => void;
  addWeatherItem: (item: string) => void;
  removeWeatherItem: (item: string) => void;
  removeCarouselItem: (id: number) => void;
  toggleCamera: () => void;
  updateStaticInfoContent: (content: string) => void;
  handleSubmit: () => void;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenProvider: React.FC<{
  children: React.ReactNode;
  initialScreenData?: IScreen;
}> = ({ children, initialScreenData }) => {
  const [screenData, setScreenData] = useState<ScreenData>({
    name: "",
    components: [],
    carouselItems: [],
    isCameraVisible: false,
    staticInfoContent: "",
    assignedOperators: [],
    weatherItems: [],
  });
  console.log(screenData);
  const { addScreen } = useCreateScreen();

  const { modifyScreen } = useUpdateScreen();

  useEffect(() => {
    if (initialScreenData) {
      setScreenData(adaptBackendDataToScreenData(initialScreenData));
    }
  }, [initialScreenData]);

  const addScreenName = (name: string) => {
    setScreenData((prev) => ({
      ...prev,
      name,
    }));
  };

  const addComponent = (type: ComponentType) => {
    const id = new Date().getTime();
    setScreenData((prev) => ({
      ...prev,
      components: [...prev.components, { id, type }],
    }));
  };

  const removeComponent = (id: number) => {
    setScreenData((prev) => ({
      ...prev,
      components: prev.components.filter((component) => component.id !== id),
    }));
  };

  const addWeatherItem = (item: string) => {
    setScreenData((prev) => ({
      ...prev,
      weatherItems: [...prev.weatherItems, item],
    }));
  };

  const removeWeatherItem = (item: string) => {
    setScreenData((prev) => ({
      ...prev,
      weatherItems: prev.weatherItems.filter((i) => i !== item),
    }));
  };

  const addCarouselItem = (imageUrl: string) => {
    const id = new Date().getTime();
    setScreenData((prev) => ({
      ...prev,
      carouselItems: [...prev.carouselItems, { id, imageUrl }],
    }));
  };

  const removeCarouselItem = (id: number) => {
    setScreenData((prev) => ({
      ...prev,
      carouselItems: prev.carouselItems.filter((item) => item.id !== id),
    }));
  };

  const toggleCamera = () => {
    setScreenData((prev) => ({
      ...prev,
      isCameraVisible: !prev.isCameraVisible,
    }));
  };

  const updateStaticInfoContent = (content: string) => {
    setScreenData((prev) => ({
      ...prev,
      staticInfoContent: content,
    }));
  };

  const addOperator = (operatorId: string) => {
    setScreenData((prev) => ({
      ...prev,
      assignedOperators: [...prev.assignedOperators, operatorId],
    }));
  };

  const removeOperator = (operatorId: string) => {
    setScreenData((prev) => ({
      ...prev,
      assignedOperators: prev.assignedOperators.filter(
        (id) => id !== operatorId
      ),
    }));
  };

  const handleSubmit = async () => {
    const payload = adaptScreenDataToBackend(screenData);
    if (initialScreenData) {
      await modifyScreen({ id: initialScreenData._id, screenData: payload });
    } else {
      await addScreen(payload);
    }
  };

  const value = useMemo(
    () => ({
      screenData,
      addComponent,
      removeComponent,
      addCarouselItem,
      removeCarouselItem,
      toggleCamera,
      updateStaticInfoContent,
      handleSubmit,
      addScreenName,
      addWeatherItem,
      removeWeatherItem,
      addOperator,
      removeOperator,
    }),
    [screenData]
  );
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};

export const useScreenContext = () => {
  const context = useContext(ScreenContext);
  if (!context)
    throw new Error("useScreenContext must be used within a ScreenProvider");
  return context;
};
