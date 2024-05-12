import { Container, Row, Col } from "react-bootstrap";
import IconFacebook from "../../assets/icons/icon_facebook.svg";
import IconInstagram from "../../assets/icons/icon_instagram.svg";
import IconTwitter from "../../assets/icons/icon_twitter.svg";
import IconMail from "../../assets/icons/icon_mail.svg";
import fi_logo from "../../assets/images/imgLogo.png";
import style from "./footer.module.css";

function Footers() {
  return (
    <div className={style.styleFooter}>
      <Container className="mt-5 mb-3">
        <Row>
          <Col md={3} className={style.footerText}>
            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p>tokoku@mail.com</p>
            <p>081-233-334-808</p>
          </Col>
          <Col className="mb-3" md={4}>
            <a className={style.textLink} href="/daftar-jual">
              <p>Produk</p>
            </a>
            <a className={style.textLink} href="/daftar-order">
              <p>Order</p>
            </a>
            <a className={style.textLink} href="/faq">
              <p>FAQ</p>
            </a>
          </Col>
          <Col className="mb-4" md={3}>
            <p className={style.footerText}>Contact with us :</p>
            <div className="d-flex flex-wrap gap-3">
              <img
                className={style.styleIcon}
                alt="instagram"
                src={IconInstagram}
              />
              <img
                className={style.styleIcon}
                alt="facebook"
                src={IconFacebook}
              />
              <img
                className={style.styleIcon}
                alt="twitter"
                src={IconTwitter}
              />
              <img className={style.styleIcon} alt="mail" src={IconMail} />
            </div>
          </Col>
          <Col md={2}>
            <img alt="logo" className={style.styleLogo} src={fi_logo} />
            <p className={style.footerText}>© Copyright Tokoku 2022</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footers;
