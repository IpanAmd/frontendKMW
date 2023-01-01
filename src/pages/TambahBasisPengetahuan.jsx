import style from "./tambahBasisPengetahuan.module.css";
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import background from "../asset/bg1.png"

function TambahBasisPengetahuan() {
    return(
        <>
            <Header/>
            <Container fluid className={style.containerFluid} style={{backgroundImage:`url(${background})`}}>
                
                <Container className={style.container}>

                    <section className={style.section}>
                        <h3>TAMBAH BASIS PENGETAHUAN</h3>
                    </section>
                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kerusakan</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Gejala</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nilai MB</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>

                        <div className={style.button}>
                            <Button variant="warning" href="/BasisPengetahuan" className="mx-3" type="submit">
                                KEMBALI
                            </Button>
                            <Button variant="danger" href="/BasisPengetahuan" className="mx-3" type="submit">
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

export default TambahBasisPengetahuan;