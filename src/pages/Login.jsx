import style from "./login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import logo from "../asset/kmw.png";
import { ToastContainer, toast } from 'react-toastify';
import swal from "sweetalert";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect( () => {
        token? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [token])

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        }
        axios.post(`http://localhost:8000/api/v1/auth/login`, data)
        .then((response) => {
            localStorage.setItem("token", response.data.data.token)
            navigate("/")
            swal({
                title: "Success",
                text: "Selamat Anda Berhasil Login",
                icon: "success",
                button: "Oke",
              });
        })
        .catch((error) => {
            if (Array.isArray(error.response.data.message)) {
                error.response.data.message.forEach((err) => {
                  toast(err, {
                    type: "error",
                  });
                });
              } else {
                toast("email or password are wrong", {
                  type: "error",
                });
              }      
        })
    }
    

// useState adalah function yang berguna sebagai penampung 
// useEffect berfungsi untuk merefresh secara otomatis data yang ada di dalam function tsb

    return (
        <>
            <Header/>
            <ToastContainer 
                position="top-center"
            />
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                {!isLoggedIn?(
                    <Container className={style.container}>
                    
                    <section className={style.section}>
                        <img src={logo} alt="Logo KMW"/>
                        <h3>LOGIN SYSTEM</h3>
                    </section>
    
                    {/* sesuaikan dengan function diatas untuk onSubmit */}
                    <Form onSubmit={handleLogin} className={style.main}> 
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Masukan Username" 
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
    
                        <div className="d-grid">
                            <Button variant="primary" type="submit" className={"mx-5"}>
                                LOGIN
                            </Button>
                        </div>
                    </Form>
    
                    </Container>
                ):null}
            </Container>

            <Footer/>
        </>
    )
}

export default Login;