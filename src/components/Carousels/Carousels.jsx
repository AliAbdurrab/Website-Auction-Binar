import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import style from "./carousels.module.css";

function Carousels() {
  return (
    <Container className={style.styleContainer}>
      <Carousel className={style.styleCarousel}>
        <Carousel.Item className={style.styleItem}>
          <img className={style.styleImg} src={banner1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className={style.styleItem}>
          <img className={style.styleImg} src={banner2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default Carousels;
