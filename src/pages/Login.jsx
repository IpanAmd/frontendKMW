import style from "./login.module.css";
import { Container, Form, Button } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import logo from "../asset/kmw.png";
function Login() {
    return (
        <>
            <Header/>

            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

                <Container className={style.container}>
                    
                <section className={style.section}>
                    <img src={logo} alt="Logo KMW"/>
                    <h3>LOGIN SISTEM</h3>
                </section>

                <Form className={style.main}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Masukan Username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit" className={"mx-5"}>
                            LOGIN
                        </Button>
                    </div>
                </Form>

                </Container>
            </Container>

            <Footer/>
        </>
    )
}

export default Login;