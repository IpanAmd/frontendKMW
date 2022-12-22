import style from "./login.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import logo from "../asset/kmw.png";
function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("token");

    const handleLogin = () => {
        axios.post("http://localhost:8000/api/v1/auth/login",{
            username: name,
            password: password,
        })
        .then((Response)=>{
            localStorage.setItem("token", Response.data.data.token)
        })
    }
    useEffect(()=>{
        token? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [token])

// useState adalah function yang berguna sebagai penampung 
// useEffect berfungsi untuk merefresh secara otomatis data yang ada di dalam function tsb

    return (
        <>
            <Header/>

            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                {!isLoggedIn?(
                    <Container className={style.container}>
                    
                    <section className={style.section}>
                        <img src={logo} alt="Logo KMW"/>
                        <h3>LOGIN SISTEM</h3>
                    </section>
    
                    {/* sesuaikan dengan function diatas untuk onSubmit */}
                    <Form onSubmit={handleLogin} className={style.main}> 
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Masukan Username" 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
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
                ):(
                    null
                )}
            </Container>

            <Footer/>
        </>
    )
}

export default Login;