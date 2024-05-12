import React from "react";
import { NavbarMenu, BackButton, Footers } from "../../components";
import { Container, Accordion } from "react-bootstrap";

function FAQ() {
  return (
    <>
      <NavbarMenu />
      <BackButton />
      <Container className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
        <h1 className="text-center mb-5 textTitle">
          Frequently Asked Questions (FAQ)
        </h1>
        <h5 className="align-self-start textTitle">Tentang Website</h5>
        <Accordion className="w-100 mb-5 textContent" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Website Apakah Ini?</Accordion.Header>
            <Accordion.Body>
              <p>
                Ini adalah website online shop, dimana semua orang bisa menjadi
                pembeli maupun penjual dengan sangat mudah, dan anda bisa
                mendapatkan barang bagus dengan harga yang murah di website ini.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Bagaimana cara menjadi pembeli?</Accordion.Header>
            <Accordion.Body>
              <p>
                Penjual akan memasang harga di produknya, dan pembeli bisa
                menawar harga dibawah harga yang telah ditentukan oleh penjual,
                jika penjual setuju dengan harga yang anda berikan, <br />
                maka barang tersebut akan dikirim kepada anda sesuai ketentuan.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Bagaimana cara menjadi penjual?</Accordion.Header>
            <Accordion.Body>
              <p>
                Anda harus melengkapi profile anda, lalu anda bisa memasukan
                produk yang akan anda jual di profile anda, anda harus mengisi
                form dengan lengkap untuk memasang produk yang akan anda jual.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h5 className="align-self-start textTitle">Tentang Toko</h5>
        <Accordion className="w-100 mb-5 textContent" defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Haruskah saya membayar untuk menjadi penjual?
            </Accordion.Header>
            <Accordion.Body>
              <p className="textContent">
                Tidak, disini untuk penjual sama sekali tidak dipungut biaya.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              Bisakah saya menaikan level toko saya?
            </Accordion.Header>
            <Accordion.Body>
              <p className="textContent">
                Tidak, disini anda tidak bisa menaikan level toko anda, semua
                toko akan sama derajatnya.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Bisakah dalam satu akun saya menjadi pembeli dan penjual
              sekaligus?
            </Accordion.Header>
            <Accordion.Body>
              <p className="textContent">
                Bisa, anda tidak perlu membuat 2 akun untuk menjadi pembeli dan
                penjual, karna disini bisa menjadi pembeli dan penjual dalam
                satu akun saja.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Footers />
    </>
  );
}
export default FAQ;
