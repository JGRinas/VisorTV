import { Header } from "~/modules/shared/presentation/components/header";
import { useGetScreens } from "../../infrastructure/hooks/useGetScreens";
import "./styles.css";
import { useDeleteScreen } from "../../infrastructure/hooks/useUpdateScreen";
import { useNavigate } from "react-router-dom";
import { SectionButton } from "../components/buttons/delete-section-button";

const ScreenList = () => {
  const { data } = useGetScreens();
  const navigate = useNavigate();
  const { removeScreen } = useDeleteScreen();

  const handleEdit = (screenId: string) => {
    navigate(`/dashboard/screen-edit/${screenId}`);
  };

  const handleView = (screenId: string) => {
    navigate(`/home/${screenId}`);
  };

  const handleDelete = (screenId: string) => {
    removeScreen(screenId);
  };

  return (
    <div className="screen-builder-container">
      <Header />
      <h2>Listado de Pantallas</h2>
      <div className="screen-cards">
        {data?.map((screen) => (
          <div key={screen._id} className="screen-card">
            <h3 className="screen-name">{screen.name}</h3>
            <div className="btn-list">
              <SectionButton
                onClick={() => handleEdit(screen._id)}
                text="Editar"
              />
              <SectionButton
                onClick={() => handleDelete(screen._id)}
                text="Eliminar"
              />
              <SectionButton
                onClick={() => handleView(screen._id)}
                text="Ver"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenList;
