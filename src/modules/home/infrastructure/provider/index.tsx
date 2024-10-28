import React, { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { IScreen } from "~/modules/admin/screen_management/domain/dtos/response";
import { useGetScreen } from "~/modules/admin/screen_management/infrastructure/hooks/useGetScreens";

interface HomeContextProps {
  screenData?: IScreen;
  isError: boolean;
  isLoading: boolean;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

export const HomeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { screenId } = useParams();
  const {
    data: screenData,
    isError,
    isLoading,
  } = useGetScreen(screenId ?? "671fcfdc9355e29e309eda18");

  const value = useMemo(
    () => ({ screenData, isError, isLoading }),
    [screenData, isError, isLoading]
  );
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error("useHomeContext must be used within a HomeProvider");
  return context;
};
