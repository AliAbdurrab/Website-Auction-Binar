import { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavbarMenu, CardProduct } from "../../components";
import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import style from "./searchpage.module.css";

function Searchpage() {
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const location = new useLocation();

  const getData = async () => {
    const response = await fetch(
      `https://easy-school-uniform-ant.cyclic.app/api/v1/buyer/product?search=${location.state.search}`
    );
    const data = await response.json();
    setProducts(data.data);
    setSpinner(false);
  };

  useEffect(() => {
    getData();
  }, [location.state.search]);

  return (
    <div>
      <NavbarMenu />
      <Container className="my-5 pt-5">
        <Row>
          <Col>
            <h3 className={style.textTitle}>
              Hasil pencarian <b>{location.state.search}</b> :
            </h3>
          </Col>
        </Row>
        {spinner ? (
          <Row>
            <Col className="d-flex justify-content-center" md={12}>
              <TailSpin width="100" />
            </Col>
          </Row>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="textTitle text-center mt-5">
                Produk tidak ditemukan
              </div>
            ) : (
              <Row className="d-flex justify-content-start align-items-start mt-2">
                <Stack
                  className={style.cardList}
                  direction="horizontal"
                  gap={3}
                >
                  {products.map((product) => {
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
                  })}
                </Stack>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Searchpage;
