import style from "./pendaftaran.module.css"
import {Container, Button, Form, Row, Col} from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function Pendaftaran() {
    return (
        <>
            <Header/>

            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                <Container className={style.container}>
                    
                    <section className={style.section}>
                        <h3>FORM PENDAFTARAN USER</h3>
                    </section>
                    
                    <Form className={style.main}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" placeholder="Masukan Nama" />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Kategori</Form.Label>
                                <Form.Select defaultValue="Montir">
                                    <option>Montir</option>
                                    <option>Pengguna awam</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Mobil</Form.Label>
                                <Form.Control  placeholder="Toyota Innova" disabled />
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Tahun</Form.Label>
                            <Form.Select defaultValue="Choose...">
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                                <option>2009</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>2006</option>
                                <option>2005</option>
                            </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Plat Nomor</Form.Label>
                            <Form.Control type="text" placeholder="Plat Nomor" />
                            </Form.Group>
                        </Row>

                    </Form>

                    <div className={style.button}>
                        <Button variant="warning" href="/" className="mx-3">KEMBALI</Button>
                        <Button variant="danger" href="/Diagnosa" className="mx-3" type="submit">SIMPAN & MULAI</Button>
                    </div>

                </Container>

            </Container>

            <Footer/>
        </>
    )
}

export default Pendaftaran;