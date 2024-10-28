import { Header } from "~/modules/shared/presentation/components/header";
import "./styles.css";
import TempInfoInput from "../components/inputs/temperature/temp-info-input";
import CarouselInput from "../components/inputs/carousel/carousel-input";
import CameraInput from "../components/inputs/camera/camera-input";
import StaticInfoInput from "../components/inputs/static-info/static-info-input";
import {
  ScreenProvider,
  useScreenContext,
} from "../../infrastructure/provider";
import NameInput from "../components/inputs/name/name-input";
import { useParams } from "react-router-dom";
import { useGetScreen } from "../../infrastructure/hooks/useGetScreens";

const ScreenWrapper = () => {
  const { screenId } = useParams();
  const { data: screenData } = useGetScreen(screenId!);

  return (
    <ScreenProvider initialScreenData={screenData}>
      <ScreenEdit />
    </ScreenProvider>
  );
};

const ScreenEdit = () => {
  const { handleSubmit } = useScreenContext();

  return (
    <div className="screen-builder-container">
      <Header />
      <NameInput />
      <div className="screen-builder-content">
        <TempInfoInput />
        <div className="center-content">
          <CarouselInput />
          <div className="lower-center-content">
            <CameraInput />
            <StaticInfoInput />
          </div>
        </div>
      </div>
      <button className="add-screen" onClick={handleSubmit}>
        Editar pantalla
      </button>
    </div>
  );
};

export default ScreenWrapper;
