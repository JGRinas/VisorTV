import { Header } from "~/modules/shared/presentation/components/header";
import { LeftColumn } from "~/modules/home/presentation/components/left-column";
import "./styles.css";
import { HomeProvider } from "../../infrastructure/provider";
import Carousel from "../components/carousel";
import CameraView from "../components/camera";
import StaticInfo from "../components/static-info/static-info-input";

const HomeWrapper = () => (
  <HomeProvider>
    <Home />
  </HomeProvider>
);

const Home = () => {
  return (
    <div className="screen-builder-container">
      <Header />
      <main className="screen-builder-content">
        <LeftColumn />
        <div className="center-content">
          <Carousel />
          <div className="lower-center-content">
            <CameraView />
            <StaticInfo />
          </div>
        </div>
      </main>
    </div>
  );
};
export default HomeWrapper;
