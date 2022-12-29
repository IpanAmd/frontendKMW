import style from "./editKerusakan.module.css"
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import background from "../asset/bg1.png";

function EditKerusakan() {
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
                        <Form.Control type="text" placeholder="Masukan Kode Kerusakan"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Kerusakan</Form.Label>
                        <Form.Control type="text" placeholder="Masukan Nama Kerusakan"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Solusi</Form.Label>
                        <Form.Control as="textarea" aria-label="With textarea" type="text" placeholder="Masukan Solusi Perbaikan"/>
                    </Form.Group>
                    
                    <div className={style.button}>
                        <Button variant="warning" className="mx-3" type="submit" href="/kerusakan">
                            KEMBALI
                        </Button>
                        <Button variant="danger" className="mx-3" type="submit">
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