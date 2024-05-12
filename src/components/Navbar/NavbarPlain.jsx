import { Navbar, Nav, Container } from "react-bootstrap";
import fi_logo from "../../assets/images/imgLogo.png";
import style from "./navbar.module.css";

function NavbarPlain(props) {
  return (
    <>
      <Navbar expand="lg" className={style.navbar} fixed="top">
        <Container className="w-100">
          <Navbar.Brand href="/">
            <img className={style.logo} src={fi_logo} />
          </Navbar.Brand>
          <Nav className="justify-content-center flex-grow-1 mt-2">
            <h3 className={style.fontTitle}>{props.title}</h3>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarPlain;
