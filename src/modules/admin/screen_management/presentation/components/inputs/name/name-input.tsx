import "./styles.css";
import { useScreenContext } from "../../../../infrastructure/provider";

const NameInput = () => {
  const { screenData, addScreenName } = useScreenContext();
  return (
    <div className="top-center-panel">
      <input
        type="text"
        placeholder="Nombre de la pantalla"
        onChange={(e) => addScreenName(e.target.value)}
        className="name-input"
        value={screenData.name}
      />
    </div>
  );
};

export default NameInput;
