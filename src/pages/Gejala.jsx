import style from "./gejala.module.css";
import {Container, Button, Table} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Gejala() {

    const [indication, setIndication] = useState([]);
    // syntax untuk mengambil data dari page tambah data gejala yang telah di input sebelumnya 
    const tampilData = () => {
        axios.get(`http://localhost:8000/api/v1/indication/`)
        .then((response) => {
            setIndication(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const hapusData = (e) => {
        const id = e.currentTarget.value;
        axios.delete(`http://localhost:8000/api/v1/indication/${id}`,
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then (() => {
            window.location.reload()
        })
    }

    useEffect(() => {
        tampilData();
    }, [])

    return (
        <>
            <Header />
            {/* Container start */}
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                <Container className={style.container}>
                    <section className={style.section}>
                        <h3>GEJALA KERUSAKAN</h3>
                    </section>

                    <div className={style.button}>   
                        <Button variant="warning" href="/TambahDataGejala" className="mx-3">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span className={style.addItem}>TAMBAH DATA</span>
                        </Button>
                    </div>

                    <Table striped bordered size="md" className={style.main}>
                        <thead className={style.tableHead}>
                            <tr>
                                <td className={style.thSatu}>No</td>
                                <td className={style.thDua}>Kode Gejala</td>
                                <td>Nama Gejala Kerusakan</td>
                                <td className={style.thDua}>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* .map sama seperti for dalam perulangan javascript, .map lebih simple karena tidak harus deklarasikan ulang dan lebih praktis dari pada for  */}
                            {indication.map((data,index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className={style.tdAksi}>{index+1}</td>
                                        
                                        <td className={style.tdAksi}>{data.code}</td>
                                        <td>{data.name}</td>
                                        <td className={style.tdAksi}>
                                            <Button variant="link" href="/GejalaEdit">
                                                <FontAwesomeIcon icon={faPencil} className={style.icon}/>
                                            </Button>
                                            <Button variant="link" value={data.id} onClick={hapusData}>
                                                <FontAwesomeIcon icon={faTrash} className={style.icon}/>
                                            </Button>   
                                        </td>
                                    </tr>     
                                );
                            })}
                        </tbody>   
                    </Table>
                </Container>
            </Container>
            {/* Container end */}
            <Footer />
        </>
    )
}

export default Gejala;