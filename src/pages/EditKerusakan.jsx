import style from "./editKerusakan.module.css"
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background from "../asset/bg1.png";

function EditKerusakan() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [solution, setSolution] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/fault/${id}`)
            setCode(res.data.data.code)
            setName(res.data.data.name)
            setSolution(res.data.data.solution)
            console.log(res);
        } catch (error) {
            
        }
    }
    const editData = (e) => {
        e.preventDefault();
        const data = {
            code: code,
            name: name,
            solution: solution,
        }
        axios.put(`http://localhost:8000/api/v1/fault/${id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setCode(response.data.data?.code);
            setName(response.data.data?.name);
            setSolution(response.data.data?.solution);
            navigate("/kerusakan");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
        <Header/>
        <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
            <Container className={style.container}>
                <section className={style.section}>
                    <h3>UBAH DATA KERUSAKAN</h3>
                </section>

                <Form className={style.main}>
                    <Form.Group className="mb-3">
                        <Form.Label>Kode Kerusakan</Form.Label>
                        <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Kerusakan</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Solusi</Form.Label>
                        <Form.Control as="textarea" aria-label="With textarea" type="text" value={solution} onChange={(e) => setSolution(e.target.value)} required/>
                    </Form.Group>
                    
                    <div className={style.button}>
                        <Button variant="warning" className="mx-3" type="submit" href="/kerusakan">
                            KEMBALI
                        </Button>
                        <Button onClick={editData} variant="danger" className="mx-3" type="submit">
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

export default EditKerusakan;
