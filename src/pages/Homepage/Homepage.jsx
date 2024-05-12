import { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavbarMenu, CardProduct, Carousels, Footers } from "../../components";
import { BtnPrimary } from "../../components/Buttons/ButtonElements";
import { TailSpin } from "react-loader-spinner";
import fi_search from "../../assets/icons/fi_search.svg";
import style from "./homepage.module.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [buttons, setButtons] = useState("");
  const [spinner, setSpinner] = useState(true);

  const getData = async () => {
    const response = await fetch(
      `https://easy-school-uniform-ant.cyclic.app/api/v1/buyer/product`
    );
    const data = await response.json();
    setProducts(data.data);
    setSpinner(false);
  };

  const getCategories = async () => {
    const response = await fetch(
      `https://easy-school-uniform-ant.cyclic.app/api/v1/category`
    );
    const data = await response.json();
    setCategories(data.data);
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const handleButton = (e) => setButtons(e.target.innerText);

  return (
    <>
      <NavbarMenu />
      <Carousels />
      <Container className="mb-5">
        <Row>
          <Col className="d-flex justify-content-center mb-3 mt-2">
            <Stack
              className={style.categoryList}
              direction="horizontal"
              gap={3}
            >
              <BtnPrimary
                className="d-flex flex-row justify-content-center align-items-center"
                onClick={handleButton}
              >
                <img className={style.imgIcon} src={fi_search} alt="search" />
                <p className={style.styleText}>Semua</p>
              </BtnPrimary>
              {categories.map((category) => (
                <div key={category.id}>
                  <BtnPrimary
                    className="d-flex flex-row justify-content-center align-items-center"
                    onClick={handleButton}
                  >
                    <img
                      className={style.imgIcon}
                      src={fi_search}
                      alt="search"
                    />
                    <p className={style.styleText}>{category.name}</p>
                  </BtnPrimary>
                </div>
              ))}
            </Stack>
          </Col>
        </Row>
        {spinner ? (
          <Row>
            <Col className="d-flex justify-content-center" md={12}>
              <TailSpin width="100" />
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-start align-items-start mt-2">
            <Stack className={style.cardList} direction="horizontal" gap={3}>
              {products.map((product) => {
                if (buttons === product.CategoryProduct.name) {
                  return (
                    <div key={product.id} type="button">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/detail-produk/${product.id}`}
                      >
                        <CardProduct
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          picture={product.picture}
                          category={product.CategoryProduct.name}
                        />
                      </Link>
                    </div>
                  );
                }
                if (buttons === "Semua" || buttons === "") {
                  return (
                    <div key={product.id} type="button">
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/detail-produk/${product.id}`}
                      >
                        <CardProduct
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          picture={product.picture}
                          category={product.CategoryProduct.name}
                        />
                      </Link>
                    </div>
                  );
                }
              })}
            </Stack>
          </Row>
        )}
      </Container>
      <Footers />
    </>
  );
}

export default HomePage;
