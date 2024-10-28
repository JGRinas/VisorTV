import { CameraBridge } from "~/modules/shared/presentation/components/camera/camera";
import "./styles.css";
import { useHomeContext } from "~/modules/home/infrastructure/provider";

const CameraView = () => {
  const { screenData } = useHomeContext();

  // Verificar si hay un componente de tipo "camera"
  const isCameraVisible = screenData?.components.some(
    (component) => component.type === "camera"
  );

  return (
    <div className="left-center-panel">
      {isCameraVisible && <CameraBridge />}
    </div>
  );
};

export default CameraView;
