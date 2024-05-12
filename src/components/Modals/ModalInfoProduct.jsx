import { useState } from "react";
import { Modal, Card } from "react-bootstrap";
import {
  ModalHeader,
  ModalFooter,
  ModalTextBold,
  ModalTextLight,
  ModalText,
} from "./ModalElements";
import { CardModal, CardModalHeader } from "./CardElements";
import { BtnPrimary } from "../Buttons/ButtonElements";
import style from "./modals.module.css";

function ModalInfoProduct({ orders }) {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState(orders.User.phone_number);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cekPhone = () => {
    if (phone.substring(0, 2) === "62") {
      return phone;
    } else if (phone.substring(0, 3) === "+62") {
      return phone.substring(1);
    } else if (phone.substring(0, 1) === "0") {
      let number = phone.substring(1);
      return `62${number}`;
    }
  };

  return (
    <>
      <BtnPrimary className="w-100 mt-3" onClick={handleShow}>
        Hubungi di WA
      </BtnPrimary>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader closeButton></ModalHeader>
        <Modal.Body>
          <ModalTextBold className="mb-1">
            Horee kamu berhasil mendapatkan harga yang sesuai
          </ModalTextBold>
          <ModalTextLight className="my-1">
            Silahkan hubungi pembeli melalui whatsapp untuk melanjutkan
            transaksi
          </ModalTextLight>
          <CardModal className="mt-1">
            <CardModalHeader>
              <ModalTextBold className="text-center">
                Product Match
              </ModalTextBold>
            </CardModalHeader>
            <Card.Body>
              {/* Pembeli */}
              <div className={style.boxBody}>
                <div className={style.imgBox}>
                  <img
                    className={style.imgModals}
                    src={orders.User.picture}
                    alt={orders.User.picture}
                  />
                </div>
                <div>
                  <ModalTextBold>{orders.User.name}</ModalTextBold>
                  <ModalTextLight>{orders.User.city}</ModalTextLight>
                </div>
              </div>
              {/* Barang */}
              <div className={style.boxBody}>
                <div className={style.imgBox}>
                  <img
                    className={style.imgModals}
                    src={orders.Product.picture}
                    alt={orders.Product.picture}
                  />
                </div>
                <div>
                  <ModalTextBold>{orders.Product.name}</ModalTextBold>
                  <ModalText>
                    <s>Rp {orders.Product.price.toLocaleString("id-ID")}</s>
                  </ModalText>
                  <ModalText>
                    Ditawar Rp {orders.price.toLocaleString("id-ID")}
                  </ModalText>{" "}
                </div>
              </div>
            </Card.Body>
          </CardModal>
        </Modal.Body>
        <ModalFooter>
          <BtnPrimary
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=${cekPhone()}&text=Hallo ${
              orders.User.name
            }, saya tertarik nih dengan penawaran harga yang kamu tawarkan, untuk proses selanjutnya kamu bisa balas chat ini ya untuk melanjutkan proses transaksi.`}
            className="w-100 py-2"
          >
            Contact to {orders.User.phone_number}
          </BtnPrimary>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalInfoProduct;
