import style from "./tambahDataGejala.module.css";
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../asset/bg1.png";

function TambahDataGejala() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const tambahData = (e) => {
        e.preventDefault();
        const data = {
            code: code,
            name: name,
        }
        axios.post(`http://localhost:8000/api/v1/indication/create`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setCode(response.data.data.code)
            setName(response.data.data.name)
            navigate("/gejala")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <>
            <Header/>

            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

                <Container className={style.container}>
                    <section className={style.section}>
                        <h3>TAMBAH GEJALA KERUSAKAN</h3>
                    </section>

                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kode Gejala</Form.Label>
                            <Form.Control type="text" placeholder="Masukan Kode Gejala" value={code} onChange={(e) => setCode(e.target.value)}
                            required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Gejala</Form.Label>
                            <Form.Control type="text" placeholder="Masukan Nama Gejala" value={name} onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </Form.Group>

                        <div className={style.button}>
                            <Button variant="warning" className="mx-3" type="submit" href="/gejala">
                                KEMBALI
                            </Button>
                            <Button onClick={tambahData} variant="danger" className="mx-3" type="submit">
                                SIMPAN
                            </Button>
                        </div>
                    </Form>

                </Container>
            </Container>
            
            <Footer/>
        </>
    )
}

export default TambahDataGejala;