import style from "./kerusakan.module.css";
import {Container, Button, Table } from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Kerusakan() {
    return (
        <>
            <Header/>

            {/* Container start */}
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                
                <Container className={style.container}>
                    
                    <section className={style.section}>
                        <i class="fa-solid fa-plus"></i>
                        <h3>KERUSAKAN</h3>
                    </section>
        
                    <div className={style.button}>   
                        <Button variant="warning" href="/TambahDataKerusakan" className="mx-3">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span className={style.addItem}>TAMBAH DATA</span>
                        </Button>
                    </div>

                    <Table striped bordered size="md" className={style.main}>
                        <thead className={style.tableHead}>
                            <tr>
                                <td className={style.thSatu}>No</td>
                                <td className={style.thDua}>Kode Kerusakan</td>
                                <td className={style.thTiga}>Nama Kerusakan</td>
                                <td className={style.thTiga}>Solusi</td>
                                <td className={style.thDua}>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.tdAksi}>1</td>
                                <td className={style.tdAksi}>G001</td>
                                <td>Kerusakan 1</td>
                                <td>Solusi</td>
                                <td className={style.tdAksi}>
                                    <Button variant="link" href="/GejalaEdit">
                                        <FontAwesomeIcon icon={faPencil} className={style.icon}/>
                                    </Button>
                                    <Button variant="link">
                                        <FontAwesomeIcon icon={faTrash} className={style.icon}/>
                                    </Button>                                    
                                </td>
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