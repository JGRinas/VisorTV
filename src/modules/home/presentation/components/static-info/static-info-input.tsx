import "./styles.css";
import ReactMarkdown from "react-markdown";
import { useHomeContext } from "~/modules/home/infrastructure/provider";

const StaticInfo = () => {
  const { screenData } = useHomeContext();

  // Buscar el componente con tipo "static_info" dentro de los componentes
  const staticInfoComponent = screenData?.components.find(
    (component) => component.type === "static_info"
  );
  return (
    <div className="right-center-panel">
      <div className="markdown-preview">
        <ReactMarkdown>
          {staticInfoComponent?.content || "No hay contenido disponible."}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default StaticInfo;
