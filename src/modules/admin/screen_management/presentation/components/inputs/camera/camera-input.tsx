import { CameraBridge } from "~/modules/shared/presentation/components/camera/camera";
import AddSectionButton from "../../buttons/add-section-button";
import "./styles.css";
import { useScreenContext } from "~/modules/admin/screen_management/infrastructure/provider";
import DeleteSectionButton from "../../buttons/delete-section-button";

const CameraInput = () => {
  const { screenData, toggleCamera } = useScreenContext();

  return (
    <div className="left-center-panel">
      <div className="camera-toggle-container">
        {screenData.isCameraVisible ? (
          <>
            <CameraBridge />
            <DeleteSectionButton onClick={toggleCamera} />
          </>
        ) : (
          <AddSectionButton onClick={toggleCamera} />
        )}
      </div>
    </div>
  );
};

export default CameraInput;
