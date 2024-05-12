import { useState, useEffect } from "react";
import { NavbarMenu, BackButton, ModalOrderBuyer } from "../../components";
import { Container } from "react-bootstrap";
import axios from "axios";

function OrderHistory({ users }) {
  const [orders, setOrders] = useState([]);

  const getOrderBuyer = () => {
    axios
      .get("https://easy-school-uniform-ant.cyclic.app/api/v1/buyer/order", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setOrders(response.data.data);
      });
  };

  useEffect(() => {
    getOrderBuyer();
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
        <h3 className="textTitle">Daftar produk yang ditawar</h3>
        <div>
          {orders.map((order) => {
            if (order.Product !== null) {
              return (
                <div className="productOrder" key={order.id}>
                  <div className="d-flex flex-row">
                    <div>
                      {order.status === "rejected" ? (
                        <>
                          <img
                            className="imgProductOrder"
                            src={order.Product.picture}
                            alt={order.Product.picture}
                          />
                          <ModalOrderBuyer order={order} />
                        </>
                      ) : (
                        <img
                          className="imgProductOrder"
                          src={order.Product.picture}
                          alt={order.Product.picture}
                        />
                      )}
                    </div>
                    <div>
                      <p className="textGray">Penawaran Produk</p>
                      <h5 className="textContent">{order.Product.name}</h5>
                      <h5 className="textContent">
                        Rp {order.Product.price.toLocaleString("id-ID")}
                      </h5>
                      <h5 className="textContent">
                        Ditawar Rp {order.price.toLocaleString("id-ID")}
                      </h5>
                      {order.status === "bid" ? (
                        <p className="textGray">
                          Penawaran produk masih diproses.
                        </p>
                      ) : (
                        <>
                          {order.status === "accepted" ? (
                            <p className="textGray">
                              Penawaran produk berhasil, tunggu penjual
                              menghubungi anda untuk melanjutkan proses
                              transaksi.
                            </p>
                          ) : (
                            <p className="textGray">
                              Penawaran produk ditolak, anda bisa mengubah
                              penawaran dengan klik UPDATE.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-end">
                    {order.status === "bid" ? (
                      <div
                        className="statusOrder"
                        style={{ background: "#47B5FF" }}
                      >
                        <p className="textContent">Pending</p>
                      </div>
                    ) : (
                      <>
                        {order.status === "accepted" ? (
                          <div
                            className="statusOrder"
                            style={{ background: "#3CCF4E" }}
                          >
                            <p className="textContent">Success</p>
                          </div>
                        ) : (
                          <>
                            <div
                              className="statusOrder"
                              style={{ background: "#F32424" }}
                            >
                              <p className="textContent">Rejected</p>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </Container>
    </>
  );
}
export default OrderHistory;
