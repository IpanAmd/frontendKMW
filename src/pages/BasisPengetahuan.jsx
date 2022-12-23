import style from "./basisPengetahuan.module.css";
import {Container, Button, Table } from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function BasisPengetahuan() {
    return (
        <>
            <Header />

            {/* Container start */}
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                
                <Container className={style.container}>
                    
                    <section className={style.section}>
                        <h3>BASIS PENGETAHUAN</h3>
                    </section>

                    <div className={style.button}>
                        <Button variant="warning" href="/TambahBasisPengetahuan" className="mx-3">TAMBAH DATA</Button>

                    </div>

                    <Table striped bordered size="md" className={style.main}>
                        <thead className={style.tableHead}>
                            <tr>
                                <td>No</td>
                                <td>Nama Kerusakan</td>
                                <td>Gejala Kerusakan</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>G001</td>
                                <td>Kerusakan 1</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>G002</td>
                                <td>Kerusakan 2</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>G003</td>
                                <td>Kerusakan 3</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>G004</td>
                                <td>Kerusakan 4</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>G005</td>
                                <td>Kerusakan 5</td>
                                <td></td>
                            </tr>
                        </tbody>   
                    </Table>


                </Container>

            </Container>
            {/* Container end */}

            <Footer />
        </>
    )
}

export default BasisPengetahuan;