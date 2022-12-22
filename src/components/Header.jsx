import style from "./Header.module.css";
import {Nav, Navbar, Stack} from "react-bootstrap";
import { useState, useEffect } from "react";

function Header() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(()=>{
        token? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [token])

    const handleLogout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("token")
        window.location.reload()
    }

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
                            {!isLoggedIn?(
                                <a className={style.styleLogin} href="/login">Login</a>
                            ):(     
                                <a className={style.styleLogin} type="button" onClick={handleLogout}>Logout</a>
                            )}
                        </div>
                    </div>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header;