import { useState, useEffect } from "react";
import { NavbarMenu, BackButton } from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import { BtnPrimary } from "../../components/Buttons/ButtonElements";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function NotifHistory({ users }) {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const getNotif = () => {
    axios
      .get("https://easy-school-uniform-ant.cyclic.app/api/v1/notification", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBuyers(response.data.data.buyer);
        setSellers(response.data.data.seller);
      });
  };
  useEffect(() => {
    getNotif();
  }, []);

  return (
    <>
      <NavbarMenu />
      <BackButton />
      <Container className="py-5 mt-5">
        <div className="boxUserOrder">
          <img
            src={users.picture}
            alt={users.picture}
            className="imgUserOrder"
          />
          <div>
            <h5 className="textContent">{users.name}</h5>
            <p className="textGray">{users.city}</p>
          </div>
        </div>
        <Row>
          <Col md={6} className="mb-3">
            <h3 className="textTitle">Notifikasi Seller</h3>
            <div className="scrollContent">
              {sellers.length === 0 ? (
                <p className="textContent">tidak ada notifikasi</p>
              ) : (
                <>
                  {sellers.map((data) => {
                    if (data.Order !== null) {
                      if (
                        data.is_read === false &&
                        data.Order.Product.id_user === users.id
                      ) {
                        axios.patch(
                          `https://easy-school-uniform-ant.cyclic.app/api/v1/notification/${data.id}`,
                          null,
                          {
                            headers: {
                              Authorization:
                                "Bearer " + localStorage.getItem("token"),
                            },
                          }
                        );
                      }
                      return (
                        <div className="productOrder">
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                className="imgProductOrder"
                                src={data.Order.Product.picture}
                                alt={data.Order.Product.picture}
                              />
                            </div>
                            <div>
                              <p className="textGray">Penawaran Produk Baru</p>
                              <h5 className="textContent">
                                {data.Order.Product.name}
                              </h5>
                              <h5 className="textContent">
                                Rp{" "}
                                {data.Order.Product.price.toLocaleString(
                                  "id-ID"
                                )}
                              </h5>
                              <h5 className="textContent">
                                Ditawar Rp{" "}
                                {data.Order.price.toLocaleString("id-ID")}
                              </h5>
                            </div>
                          </div>
                          <div className="text-end">
                            <p className="textGray mb-2">
                              {moment(data.createdAt).format("L")}
                            </p>
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              to={`/info-penawar/${data.id_order}`}
                            >
                              <BtnPrimary>Detail</BtnPrimary>
                            </Link>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              )}
            </div>
          </Col>
          <Col md={6}>
            <h3 className="textTitle">Notifikasi Buyer</h3>
            <div className="scrollContent">
              {buyers.length === 0 ? (
                <p className="textContent">Tidak ada notifikasi</p>
              ) : (
                <>
                  {buyers.map((data) => {
                    if (
                      data.is_read === false &&
                      data.Order.id_user === users.id
                    ) {
                      axios.patch(
                        `https://easy-school-uniform-ant.cyclic.app/api/v1/notification/${data.id}`,
                        null,
                        {
                          headers: {
                            Authorization:
                              "Bearer " + localStorage.getItem("token"),
                          },
                        }
                      );
                    }

                    if (data.status === "bid" && data.Order.Product !== null) {
                      return (
                        <>
                          <div className="productOrder" key={data.id}>
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  className="imgProductOrder"
                                  src={data.Order.Product.picture}
                                  alt={data.Order.Product.picture}
                                />
                              </div>
                              <div>
                                <p className="textGray">
                                  Anda berhasil melakukan penawaran
                                </p>
                                <h5 className="textContent">
                                  {data.Order.Product.name}
                                </h5>
                                <h5 className="textContent">
                                  Rp{" "}
                                  {data.Order.Product.price.toLocaleString(
                                    "id-ID"
                                  )}
                                </h5>
                                <h5 className="textContent">
                                  Ditawar Rp{" "}
                                  {data.Order.price.toLocaleString("id-ID")}
                                </h5>
                              </div>
                              <div className="text-end">
                                <p className="textGray mb-2">
                                  {moment(data.createdAt).format("L")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                    if (
                      data.status === "accepted" &&
                      data.Order.Product !== null
                    ) {
                      return (
                        <>
                          <div className="productOrder" key={data.id}>
                            <div className="d-flex flex-row">
                              <div>
                                <img
                                  className="imgProductOrder"
                                  src={data.Order.Product.picture}
                                  alt={data.Order.Product.picture}
                                />
                              </div>
                              <div>
                                <p className="textGray">
                                  Penawaran anda disetujui
                                </p>
                                <h5 className="textContent">
                                  {data.Order.Product.name}
                                </h5>
                                <h5 className="textContent">
                                  Rp{" "}
                                  {data.Order.Product.price.toLocaleString(
                                    "id-ID"
                                  )}
                                </h5>
                                <h5 className="textContent">
                                  Ditawar Rp{" "}
                                  {data.Order.price.toLocaleString("id-ID")}
                                </h5>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className="textGray mb-2">
                                {moment(data.createdAt).format("L")}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    }
                    if (
                      data.status === "rejected" &&
                      data.Order.Product !== null
                    ) {
                      return (
                        <div className="productOrder" key={data.id}>
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                className="imgProductOrder"
                                src={data.Order.Product.picture}
                                alt={data.Order.Product.picture}
                              />
                            </div>
                            <div>
                              <p className="textGray">Penawaran anda ditolak</p>
                              <h5 className="textContent">
                                {data.Order.Product.name}
                              </h5>
                              <h5 className="textContent">
                                Rp{" "}
                                {data.Order.Product.price.toLocaleString(
                                  "id-ID"
                                )}
                              </h5>
                              <h5 className="textContent">
                                Ditawar Rp{" "}
                                {data.Order.price.toLocaleString("id-ID")}
                              </h5>
                              <p className="textGray">
                                cek history order untuk merubah penawaran.
                              </p>
                            </div>
                          </div>
                          <div className="text-end">
                            <p className="textGray mb-2">
                              {moment(data.createdAt).format("L")}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotifHistory;
