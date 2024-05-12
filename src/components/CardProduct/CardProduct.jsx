import { Card } from "react-bootstrap";
import toRupiah from "@develoka/angka-rupiah-js";
import style from "./cardproduct.module.css";

function CardProduct({ id, name, price, picture, category }) {
  return (
    <>
      <Card className={style.productCard} key={id} type="button">
        <div className={style.cardBox}>
          <Card.Img
            className={style.imgCard}
            variant="top"
            src={picture}
            alt={picture}
          />
        </div>
        <Card.Body className={style.bodyCard}>
          <Card.Text className={style.titleText}>{name}</Card.Text>
          <Card.Text className={style.categoryText}>{category}</Card.Text>
          <Card.Text className={style.titleText}>
            Rp{" "}
            {toRupiah(price.toString(), {
              symbol: false,
              floatingPoint: 0,
              spaceBeforeUnit: true,
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardProduct;
