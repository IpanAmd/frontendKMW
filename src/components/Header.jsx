import style from "./Header.module.css";
import {Nav, Navbar, Stack} from "react-bootstrap";

function Header() {
    return (
        <>
            <Navbar className={style.size}>
                <img className="mx-4" src="../../LogoKMW.png" alt="Logo KMW" />
                <Nav>
                    <div className="d-flex flex-row">
                        <Stack direction="horizontal" gap={3}>
                            <a className={style.navFont} href="/">Home</a>
                            <a className={style.navFont} href="/gejala">Gejala</a>
                            <a className={style.navFont} href="/kerusakan">Kerusakan</a>
                            <a className={style.navFont} href="/basisPengetahuan">Basis Pengetahuan</a>    
                        </Stack>
                        <div className="justify-content-end">
                            <a className={style.styleLogin} href="/login">Login</a>
                        </div>
                    </div>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header;