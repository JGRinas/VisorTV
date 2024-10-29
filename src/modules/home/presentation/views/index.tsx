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
    <div className="container-home">
      <Header />
      <main className="main-container">
        <LeftColumn />
        <div className="center-content-home">
          <Carousel />
          <div className="lower-center-content-home">
            <CameraView />
            <StaticInfo />
          </div>
        </div>
      </main>
    </div>
  );
};
export default HomeWrapper;
