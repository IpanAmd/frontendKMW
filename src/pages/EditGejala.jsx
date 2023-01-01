import style from "./editGejala.module.css"
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import background from "../asset/bg1.png";

function EditGejala() {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    // useParams untuk mengambil parameter yang akan kita pakai
    const {id} = useParams();
    const getData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/indication/${id}`) 
            setCode(res.data.data.code)
            setName(res.data.data.name)
            console.log(res);
        } catch (error) {
            
        }
    }
    const editData = (e) => {
        e.preventDefault();
        const data = {
            code: code,
            name: name,
        }
        axios.put(`http://localhost:8000/api/v1/indication/${id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setCode(response.data.data?.code);
            setName(response.data.data?.name);
            navigate("/gejala");
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
                        <h3>UBAH GEJALA KERUSAKAN</h3>
                    </section>

                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kode Gejala</Form.Label>
                            <Form.Control type="text" value={code} onChange={(e) => setCode(e.target.value)}
                            required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Gejala</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </Form.Group>
                        
                        <div className={style.button}>
                            <Button variant="warning" className="mx-3" type="submit" href="/gejala">
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

export default EditGejala;