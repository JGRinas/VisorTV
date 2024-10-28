import "./styles.css";

const DeleteSectionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="delete-section-button" onClick={onClick}>
      Eliminar
    </button>
  );
};

export default DeleteSectionButton;

export const SectionButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => {
  return (
    <button className="delete-section-button" onClick={onClick}>
      {text}
    </button>
  );
};
