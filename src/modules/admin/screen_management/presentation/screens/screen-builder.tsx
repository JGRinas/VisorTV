import { Header } from "~/modules/shared/presentation/components/header";
import "./styles.css";
import TempInfoInput from "../components/inputs/temperature/temp-info-input";
import CarouselInput from "../components/inputs/carousel/carousel-input";
import CameraInput from "../components/inputs/camera/camera-input";
import StaticInfoInput from "../components/inputs/static-info/static-info-input";
import { ScreenProvider } from "../../infrastructure/provider";

const ScreenWrapper = () => (
  <ScreenProvider>
    <ScreenBuilder />
  </ScreenProvider>
);

const ScreenBuilder = () => {
  return (
    <div className="screen-builder-container">
      <Header />
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
    </div>
  );
};

export default ScreenWrapper;
