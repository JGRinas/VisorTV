import "./styles.css";

const AddSectionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="add-section-button" onClick={onClick}>
      +
    </button>
  );
};

export default AddSectionButton;
