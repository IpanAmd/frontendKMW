import style from "./kerusakan.module.css";
import {Container, Button, Table } from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function Kerusakan() {
    return (
        <>
            <Header />

            {/* Container start */}
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                
                <Container className={style.container}>
                    
                <section className={style.section}>
                    <i class="fa-solid fa-plus"></i>
                    <h3>KERUSAKAN</h3>
                </section>

                <div className={style.button}>
                    <Button variant="warning" href="/" className="mx-3">TAMBAH DATA</Button>

                </div>

                <Table striped bordered size="md" className={style.main}>
                    <thead className={style.tableHead}>
                        <tr>
                            <td>No</td>
                            <td className="mb-2">Kode Kerusakan</td>
                            <td className="mb-3">Nama Kerusakan</td>
                            <td>Solusi</td>
                            <td>Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>K001</td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptatem?</td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi corporis ad fuga dolore suscipit? Enim placeat laborum rem voluptates!</td>
                            <td>Hapus dan Edit</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>K002</td>
                            <td>Kerusakan 2</td>
                            <td>Solusi 2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>K003</td>
                            <td>Kerusakan 3</td>
                            <td>Solusi 3</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>K004</td>
                            <td>Kerusakan 4</td>
                            <td>Solusi 4</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>K005</td>
                            <td>Kerusakan 5</td>
                            <td>Solusi 5</td>
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

export default Kerusakan;