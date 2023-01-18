import style from "./Header.module.css";
import { Container, Nav, Navbar, Stack, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import imgUser from "../asset/fi_user.svg";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Navbar className={style.size}>
        <Container className="w-100 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-row">
            <Navbar.Brand href="/">
              <img className="mx-4" src="../../LogoKMW.png" alt="Logo KMW" />
            </Navbar.Brand>
            <Stack direction="horizontal" gap={3}>
              <a className={style.navFont} href="/">
                Home
              </a>
              <a className={style.navFont} href="/gejala">
                Gejala
              </a>
              <a className={style.navFont} href="/kerusakan">
                Kerusakan
              </a>
              <a className={style.navFont} href="/basisPengetahuan">
                Basis Pengetahuan
              </a>
            </Stack>
          </div>
          <div>
            {!isLoggedIn ? (
              <div>
                <a className={style.styleLogin} href="/login">
                  Masuk
                </a>
              </div>
            ) : (
              <Dropdown className="me-4">
                <Dropdown.Toggle className="bg-transparent border-0">
                  <img src={imgUser} alt={imgUser} />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item href="/InfoAkun">Info Akun</Dropdown.Item>
                  <Dropdown.Item href="/UbahKataSandi">
                    Ubah Kata Sandi
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
