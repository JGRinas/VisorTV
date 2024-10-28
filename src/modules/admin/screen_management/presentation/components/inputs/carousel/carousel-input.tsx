import { useState } from "react";
import AddSectionButton from "../../buttons/add-section-button";
import "./styles.css";
import { useScreenContext } from "../../../../infrastructure/provider";
import DeleteSectionButton from "../../buttons/delete-section-button";

const CarouselInput = () => {
  const { screenData, addCarouselItem, removeCarouselItem } =
    useScreenContext();
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      addCarouselItem(imageUrl.trim());
      setImageUrl("");
    }
  };

  return (
    <div className="top-center-panel">
      <h3>Carrusel</h3>
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="carousel-input"
      />
      <AddSectionButton onClick={handleAddImage} />

      <div className="carousel-images">
        {screenData.carouselItems.map((item) => (
          <div key={item.id} className="carousel-image-item">
            <img
              src={item.imageUrl}
              alt="Carrusel"
              className="carousel-image"
            />
            <DeleteSectionButton onClick={() => removeCarouselItem(item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselInput;
