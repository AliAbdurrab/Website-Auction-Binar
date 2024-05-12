import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Offcanvas,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BtnLogin } from "../Buttons/ButtonElements";
import { useNavigate } from "react-router-dom";
import fi_logo from "../../assets/images/imgLogo.png";
import fi_search from "../../assets/icons/fi_search-bar.svg";
import fi_login from "../../assets/icons/fi_log-in.svg";
import fi_list from "../../assets/icons/fi_list.svg";
import fi_bell from "../../assets/icons/fi_bell.svg";
import fi_user from "../../assets/icons/fi_user.svg";
import style from "./navbar.module.css";
import Notifikasi from "../Notification/Notifikasi";

function NavbarMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate("/produk", {
      state: { search: search },
    });
  }

  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="lg" className={style.navbars} fixed="top">
        <Container className="w-100">
          <div className="d-flex flex-row justify-content-between w-100">
            <div className="d-flex flex-row me-2">
              <Navbar.Brand href="/" className="me-0">
                <img className={style.logo} src={fi_logo} />
              </Navbar.Brand>
              <Form className={style.formSearch} onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  className={style.formInput}
                  placeholder="Cari disini ..."
                  aria-label="Cari disini ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="link"
                  style={{ borderRadius: "16px", boxShadow: "none" }}
                >
                  <img src={fi_search} alt="" />
                </Button>
              </Form>
            </div>
            {!isLoggedIn ? (
              <>
                <div className="mt-2 pt-1" id="navDekstop">
                  <Nav className="justify-content-end">
                    <Link to="/login">
                      <BtnLogin className={style.button}>
                        <p className={style.btnText}>
                          <img src={fi_login} alt="" />
                          &nbsp; Masuk
                        </p>
                      </BtnLogin>
                    </Link>
                  </Nav>
                </div>
                <div className="mt-2 pt-1" id="navMobile">
                  <Nav className="justify-content-end">
                    <Link to="/login">
                      <BtnLogin className={style.button}>
                        <p className={style.btnText}>Masuk</p>
                      </BtnLogin>
                    </Link>
                  </Nav>
                </div>
              </>
            ) : (
              <div>
                <div id="navMobile">
                  <Nav className="d-flex flex-row mt-2 pt-1">
                    <div>
                      <Link to="/daftar-notif">
                        <Notifikasi />
                      </Link>
                    </div>
                    <div>
                      <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-md`}
                        className="border-0"
                        style={{ boxShadow: "none" }}
                      />
                      <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-md`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                        placement="end"
                        style={{ width: "280px" }}
                      >
                        <Offcanvas.Header closeButton>
                          <Offcanvas.Title
                            id={`offcanvasNavbarLabel-expand-md`}
                          >
                            <h5 className="textTitle">Tokoku</h5>
                          </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link
                              className="textContent text-body"
                              href="/daftar-jual"
                            >
                              Daftar Jual
                            </Nav.Link>
                            <Nav.Link
                              className="textContent text-body"
                              href="/daftar-order"
                            >
                              Histori Order
                            </Nav.Link>
                            <Nav.Link
                              className="textContent text-body"
                              href="/edit-profile"
                            >
                              Info Akun
                            </Nav.Link>
                            <Nav.Link
                              className="textContent text-body"
                              href="/ubah-kata-sandi"
                            >
                              Ubah Kata Sandi
                            </Nav.Link>
                            <Nav.Item
                              className="textContent text-body mt-2"
                              type="button"
                              onClick={logout}
                            >
                              Logout
                            </Nav.Item>
                          </Nav>
                        </Offcanvas.Body>
                      </Navbar.Offcanvas>
                    </div>
                  </Nav>
                </div>
                <div id="navDekstop">
                  <Nav className="text-end mt-2 pt-1">
                    <Row>
                      <Col>
                        <Dropdown className="">
                          <Dropdown.Toggle
                            className="bg-transparent border-0"
                            id="dropdown-basic"
                          >
                            <img src={fi_list} alt="fi_list" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item href="/daftar-jual">
                              Daftar Jual
                            </Dropdown.Item>
                            <Dropdown.Item href="/daftar-order">
                              Histori Order
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                      <Col>
                        <Link to="/daftar-notif">
                          <Notifikasi />
                        </Link>
                      </Col>
                      <Col>
                        <Dropdown className="">
                          <Dropdown.Toggle
                            className="bg-transparent border-0"
                            id="dropdown-basic"
                          >
                            <img src={fi_user} alt="fi_user" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item href="/edit-profile">
                              Info Akun
                            </Dropdown.Item>
                            <Dropdown.Item href="/ubah-kata-sandi">
                              Ubah Kata Sandi
                            </Dropdown.Item>
                            <Dropdown.Item onClick={logout}>
                              Keluar
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Nav>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMenu;
