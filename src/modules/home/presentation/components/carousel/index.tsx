import { useHomeContext } from "~/modules/home/infrastructure/provider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";

const CustomCarousel = () => {
  const { screenData } = useHomeContext();

  const carouselItems =
    screenData?.components
      .filter((component) => component.type === "carousel")
      .map((component) => ({
        id: component._id,
        imageUrl: component?.imageUrl || "",
      })) || [];

  if (!carouselItems.length) return null;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  console.log(carouselItems);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlaySpeed={3000}
      showDots={true}
      containerClass="carousel-container"
      itemClass="carousel-item"
    >
      {carouselItems.map((item) => (
        <img
          key={item.id}
          src={item.imageUrl}
          alt="Carrusel"
          className="carousel-image"
        />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
