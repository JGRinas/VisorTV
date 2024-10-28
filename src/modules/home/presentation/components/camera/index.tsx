import { CameraBridge } from "~/modules/shared/presentation/components/camera/camera";
import "./styles.css";
import { useHomeContext } from "~/modules/home/infrastructure/provider";

const CameraView = () => {
  const { screenData } = useHomeContext();
  const isCameraVisible = screenData?.components.some(
    (component) => component.type === "camera"
  );

  const isOnline = navigator.onLine;

  return (
    <div className="left-center-panel">
      {isCameraVisible &&
        (isOnline ? (
          <CameraBridge />
        ) : (
          <div>No hay conexión a Internet para mostrar el video en vivo</div>
        ))}
    </div>
  );
};

export default CameraView;
