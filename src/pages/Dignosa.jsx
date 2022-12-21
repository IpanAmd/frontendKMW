import style from "./diagnosa.module.css";
import { Container, Button, Table} from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function Diagnosa() {
    return (
        <>
            <Header/>
            
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

                <Container className={style.container}>
                    <section className={style.section}>
                        <h3>FORM DIAGNOSA</h3>
                    </section>

                    <main className={style.main}>
                        <Table bordered className={style.table}>
                            <tr>
                                <th id="namaGejala">Nama Gejala</th>
                                <th id="aksi">YA / TIDAK</th>
                            </tr>
                            <tr>
                                <td>Kesalahan Isi Bahan Bakar</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Indikator Check Engine Menyala</td>
                            </tr>
                        </Table>
                    </main>
{/* 
                    <main className={style.judulDiagnosa}>
                        <div>
                            <p>Nama Gejala</p>
                        </div>
                        <div>
                            <p>YA / TIDAK</p>
                        </div>
                    </main> */}

                    {/* <div className={style.namaGejala}>
                        <ol>
                            <li>Kesalahan Isi Bahan Bakar</li>
                            <li>Mobil Susah di Hidupkan</li>
                            <li>Indikator Check Engine Menyala</li>
                            <li>Kehilangan Akselerasi Saat Mengemudi</li>
                        </ol>
                        <div>
                            <p>Ya / Tidak</p>
                            <p>Ya / Tidak</p>
                            <p>Ya / Tidak</p>
                            <p>Ya / Tidak</p>
                        </div>
                    </div> */}

                    <div className={style.button}>
                        <Button variant="danger" href="/HasilDiagnosa" className="mx-3" type="submit">Selesai</Button>
                    </div>

                </Container>

            </Container>
           
            <Footer/>       
        </>
    )
}

export default Diagnosa;