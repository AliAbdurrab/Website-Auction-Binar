import { useState } from "react";
import { Modal, Card, InputGroup } from "react-bootstrap";
import {
  ModalHeader,
  ModalFooter,
  ModalTextBold,
  ModalTextLight,
} from "./ModalElements";
import { CardModal } from "./CardElements";
import { BtnPrimary } from "../Buttons/ButtonElements";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import swal from "sweetalert";

function ModalStatusOrder({ products, orders }) {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateStatus = () => {
    if (status === "sold") {
      const data = {
        status: status,
      };
      axios
        .put(
          `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/product/${products.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          swal({
            title: "Berhasil!",
            text: "Selamat produk anda telah terjual!",
            icon: "success",
            button: "Oke",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast(error.message, {
            type: "error",
          });
        });
    } else {
      const data = {
        status: status,
      };
      axios
        .put(
          `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/order/${orders.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          swal({
            title: "Berhasil!",
            text: "Transaksi telah anda batalkan!",
            icon: "success",
            button: "Oke",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          toast(error.message, {
            type: "error",
          });
        });
    }
  };

  return (
    <>
      <BtnPrimary className="w-100 mt-3" onClick={handleShow}>
        Status
      </BtnPrimary>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <ToastContainer />
        <ModalHeader closeButton></ModalHeader>
        <Modal.Body>
          <ModalTextBold className="mb-2">
            Perbarui status penjualan produkmu
          </ModalTextBold>
          <CardModal>
            <Card.Body>
              <InputGroup>
                <InputGroup.Radio
                  value="sold"
                  name="test"
                  aria-label="Radio 1"
                  onChange={(e) => setStatus(e.target.value)}
                />
                &emsp;Berhasil Terjual
                <ModalTextLight className="ms-5 ps-2 mb-4">
                  Kamu telah sepakat menjual produk ini kepada pembeli
                </ModalTextLight>
              </InputGroup>
              <InputGroup>
                <InputGroup.Radio
                  value="bid"
                  name="test"
                  aria-label="Radio 2"
                  onChange={(e) => setStatus(e.target.value)}
                />
                &emsp;Batalkan Transaksi
                <ModalTextLight className="ms-5 ps-2">
                  Kamu membatalkan transaksi produk ini dengan pembeli
                </ModalTextLight>
              </InputGroup>
            </Card.Body>
          </CardModal>
        </Modal.Body>
        <ModalFooter>
          <BtnPrimary className="w-100" onClick={updateStatus}>
            Kirim
          </BtnPrimary>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalStatusOrder;
