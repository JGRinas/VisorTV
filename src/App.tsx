import "./styles/global.css";
import { MainRoutes } from "./routes/main-routes";
import Notification from "./modules/shared/presentation/components/notification";

const App = () => {
  return (
    <>
      <MainRoutes />
      <Notification />
    </>
  );
};

export default App;
