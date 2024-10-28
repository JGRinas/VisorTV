import React, { createContext, useContext, useState, useMemo } from "react";

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

interface ScreenData {
  components: { id: number; type: ComponentType }[];
  carouselItems: CarouselItem[];
  isCameraVisible: boolean;
  staticInfoContent: string;
}

interface ScreenContextProps {
  screenData: ScreenData;
  addComponent: (type: ComponentType) => void;
  removeComponent: (id: number) => void;
  addCarouselItem: (imageUrl: string) => void;
  removeCarouselItem: (id: number) => void;
  toggleCamera: () => void;
  updateStaticInfoContent: (content: string) => void;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [screenData, setScreenData] = useState<ScreenData>({
    components: [],
    carouselItems: [],
    isCameraVisible: false,
    staticInfoContent: "",
  });
  console.log(screenData);
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

  const value = useMemo(
    () => ({
      screenData,
      addComponent,
      removeComponent,
      addCarouselItem,
      removeCarouselItem,
      toggleCamera,
      updateStaticInfoContent,
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
