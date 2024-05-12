import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import { NavbarMenu, BackButton, ModalTawar, Footers } from "../../components";
import { BtnPrimary } from "../../components/Buttons/ButtonElements";
import axios from "axios";
import style from "./productdetail.module.css";
import swal from "sweetalert";

function ProductDetail({ users }) {
  const [sellers, setSellers] = useState("");
  const [products, setProducts] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const { id } = useParams();

  const getProduct = async () => {
    await axios
      .get(`https://easy-school-uniform-ant.cyclic.app/api/v1/seller/product/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setSellers(response.data.data.User);
        setProducts(response.data.data);
        setPrice(response.data.data.price);
        setCategory(response.data.data.CategoryProduct.name);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  function handleDelete() {
    swal({
      title: "Apakah anda yakin?",
      text: "Setelah dihapus, Anda tidak akan dapat mengembalikan produk ini!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/product/${id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {})
          .catch((error) => {})
          .finally(() => {
            window.location.href = "/daftar-jual";
          });
        swal("Data produk berhasil dihapus!", {
          icon: "success",
        });
      } else {
        swal("Data produk tidak jadi dihapus!");
      }
    });
  }

  return (
    <>
      <NavbarMenu />
      <BackButton />
      <Container className="mt-5 py-5">
        <Row className="mb-4">
          <Col
            md={8}
            className="d-flex justify-content-center align-items-center mb-4"
          >
            <Container className={style.productBox}>
              <img
                className={style.productImg}
                src={products.picture}
                alt={products.picture}
              />
            </Container>
          </Col>
          <Col md={4}>
            <Card
              style={{
                border: "none",
                borderRadius: "16px",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Card.Body>
                <Card.Title className={style.fontProduct}>
                  {products.name}
                </Card.Title>
                <Card.Text className={style.fontContent}>{category}</Card.Text>
                <Card.Text className={style.fontProduct}>
                  Rp {price.toLocaleString("id-ID")}
                </Card.Text>
                {users.id === sellers.id ? (
                  <div className="text-center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/edit-produk/${products.id}`}
                    >
                      <BtnPrimary className={style.button}>Edit</BtnPrimary>
                    </Link>
                    <BtnPrimary onClick={handleDelete} className={style.button}>
                      Delete
                    </BtnPrimary>
                  </div>
                ) : (
                  <ModalTawar users={users} products={products} />
                )}
              </Card.Body>
            </Card>
            <div className={style.userCard}>
              <div>
                <img
                  className={style.userImg}
                  src={sellers.picture}
                  alt={sellers.picture}
                />
              </div>
              <div className="d-flex flex-column justify-between w-100 me-2">
                <h3 className={style.fontName}>{sellers.name}</h3>
                <p className={style.fontCity}>{sellers.city}</p>
              </div>
              <div className="mt-0">
                <p className={style.fontSeller}>Penjual</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="desc">
              <h2 className={style.fontProduct}>Deskripsi Produk</h2>
              <div className={style.descBox}>
                <h5 className={style.fontContent}>
                  Status : {products.status}
                </h5>
                <h5 className={style.fontContent}>
                  Lokasi : {products.location}
                </h5>
              </div>
              <div className="mt-3">
                <p className={style.fontContent}>{products.description}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footers />
    </>
  );
}
export default ProductDetail;
