import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  NavbarPlain,
  ModalStatusOrder,
  ModalInfoProduct,
  BackButton,
} from "../../components";
import { BtnPrimary } from "../../components/Buttons/ButtonElements";
import axios from "axios";
import swal from "sweetalert";
import style from "./infopenawar.module.css";

function InfoPenawar() {
  const [users, setUsers] = useState("");
  const [products, setProduct] = useState("");
  const [orders, setOrders] = useState({});
  const [bid, setBid] = useState(0);
  const [price, setPrice] = useState(0);

  const { id } = useParams();

  const orderProduct = async () => {
    await axios
      .get(`https://easy-school-uniform-ant.cyclic.app/api/v1/seller/order/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.data.User);
        setProduct(response.data.data.Product);
        setPrice(response.data.data.Product.price);
        setOrders(response.data.data);
        setBid(response.data.data.price);
      });
  };

  const Accepted = () => {
    swal({
      title: "Apakah anda yakin?",
      text: "Setelah status penawaran diganti, Anda tidak akan dapat mengubahnya lagi!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAccpted) => {
      if (willAccpted) {
        const data = {
          status: "accepted",
        };
        axios
          .put(
            `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/order/${id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            window.location.reload();
          });
        swal("Status penawaran berhasil diubah!", {
          icon: "success",
        });
      } else {
        swal("Status penawaran tidak jadi diubah!");
      }
    });
  };

  const Rejected = () => {
    swal({
      title: "Apakah anda yakin?",
      text: "Setelah status penawaran diganti, Anda tidak akan dapat mengubahnya lagi!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willRejected) => {
      if (willRejected) {
        const data = {
          status: "rejected",
        };
        axios
          .put(
            `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/order/${id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            window.location.reload();
          });
      } else {
        swal("Status penawaran tidak jadi diubah!");
      }
    });
  };

  useEffect(() => {
    orderProduct();
  }, [orders.price]);
  return (
    <>
      <NavbarPlain title="Info Penawar" />
      <BackButton />
      <Container className="my-5 pt-5">
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
          <Col md={4} className="mb-4">
            <div className={style.userCard}>
              <div>
                <img
                  className={style.userImg}
                  src={users.picture}
                  alt={users.picture}
                />
              </div>
              <div className="d-flex flex-column justify-between w-100 me-2">
                <h3 className={style.fontName}>{users.name}</h3>
                <p className={style.fontCity}>{users.city}</p>
              </div>
              <div className="mt-0">
                <p className={style.fontSeller}>Penawar</p>
              </div>
            </div>
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
                <Card.Text className={style.fontPrice}>
                  Harga &emsp;:&emsp; Rp {price.toLocaleString("id-ID")}
                </Card.Text>
                <Card.Text className={style.fontPrice}>
                  Ditawar &nbsp;:&emsp; Rp {bid.toLocaleString("id-ID")}
                </Card.Text>
                {orders.status === "bid" ? (
                  <>
                    {products.status === "sold" ? (
                      <h5 className={style.fontProduct}>
                        Produk ini telah Terjual!
                      </h5>
                    ) : (
                      <div>
                        <BtnPrimary className={style.button} onClick={Rejected}>
                          Tolak
                        </BtnPrimary>
                        <BtnPrimary className={style.button} onClick={Accepted}>
                          Terima
                        </BtnPrimary>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    {orders.status === "accepted" ? (
                      <>
                        {products.status === "sold" ? (
                          <h5 className={style.fontProduct}>
                            Produk ini telah Terjual!
                          </h5>
                        ) : (
                          <>
                            <ModalStatusOrder
                              products={products}
                              orders={orders}
                            />
                            <ModalInfoProduct orders={orders} />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <h5 className={style.fontProduct}>
                          Kamu telah menolak penawaran ini!
                        </h5>
                      </>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InfoPenawar;
