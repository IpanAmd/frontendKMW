import style from "./hasilDiagnosa.module.css";
import { Container, Table, Button} from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function HasilDiagnosa() {
    return(
        <>
        
        <Header/>

        <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

            <Container className={style.container}>
                <section className={style.section}>
                   <h3>HASIL DIAGNOSA</h3> 
                </section>

                <main className={style.main}>
                    <div id="biodata">
                        <p>Identifikasi User</p>
                        <ul>
                            <li>index1</li>
                            <li>index2</li>
                            <li>index3</li>
                        </ul>
                    </div>
                    <div id="Gejala">
                        <p>Gejala Kerusakan</p>
                        <ol>
                            <li>index1</li>
                            <li>index2</li>
                            <li>index3</li>
                        </ol>
                    </div>
                    <Table borderless className={style.table}>
                        <tr>
                            <th id="hasil">Hasil Diagnosa</th>
                            <th id="nilaiCF">Nilai Kepastian (CF)</th>
                        </tr>
                        <tr>
                            <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
                            <td>90%</td>
                        </tr>
                    </Table>
                    <div id="solusi">
                        <p>Solusi</p>
                        <ol>
                            <li>index1</li>
                            <li>index2</li>
                            <li>index3</li>
                            <li>index4</li>
                            <li>index5</li>
                        </ol>
                    </div>
                </main>
                <div className={style.button}>
                        <Button variant="danger" href="/" className="mx-3" type="submit">Kembali</Button>
                </div>
            </Container>

        </Container>

        <Footer/>

        </>
    )
}

export default HasilDiagnosa;