import style from "./tambahDataKerusakan.module.css";
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../asset/bg1.png";

function TambahDataKerusakan() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [solution, setSolution] = useState("");
    const navigate = useNavigate();
    const tambahData = (e) => {
        e.preventDefault();
        const data = {
            code: code,
            name: name,
            solution: solution,
        }
        axios.post(`http://localhost:8000/api/v1/fault/create`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setCode(response.data.data.code)
            setName(response.data.data.name)
            setSolution(response.data.data.solution)
            navigate("/kerusakan")
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <Header/>
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

                <Container className={style.container}>
                    <section className={style.section}>
                        <h3>TAMBAH DATA KERUSAKAN</h3>
                    </section>

                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kode Kerusakan</Form.Label>
                            <Form.Control type="text" placeholder="Masukan Kode Kerusakan" value={code} onChange={(e) => setCode(e.target.value)}
                            required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kerusakan</Form.Label>
                            <Form.Control type="text" placeholder="Masukan Nama Kerusakan" value={name} onChange={(e) => setName(e.target.value)}
                            required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Solusi</Form.Label>
                            <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Masukan Solusi Perbaikan" value={solution} onChange={(e) => setSolution (e.target.value)} required/>
                        </Form.Group>

                        <div className={style.button}>
                            <Button variant="warning" href="/Kerusakan" className="mx-3" type="submit">
                                KEMBALI
                            </Button>
                            <Button onClick={tambahData} variant="danger" href="/Kerusakan" className="mx-3" type="submit">
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

export default TambahDataKerusakan;