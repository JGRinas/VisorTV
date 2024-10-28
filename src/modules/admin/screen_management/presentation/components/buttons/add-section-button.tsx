import "./styles.css";

const AddSectionButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text?: string;
}) => {
  return (
    <button className="add-section-button" onClick={onClick}>
      {text ?? "+"}
    </button>
  );
};

export default AddSectionButton;
