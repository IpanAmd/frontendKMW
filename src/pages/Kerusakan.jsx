import style from "./kerusakan.module.css";
import {Container, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Kerusakan() {
    
    const [fault, setFault] = useState([]);
    const tampilData = () => {
        axios.get(`http://localhost:8000/api/v1/fault/`)
        .then((response) => {
            setFault(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const hapusData = (e) => {
        const id = e.currentTarget.value;
        axios.delete(`http://localhost:8000/api/v1/fault/${id}`, {
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
                            {fault.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <td className={style.tdAksi}>{index+1}</td>

                                        <td className={style.tdAksi}>{data.code}</td>

                                        <td>{data.name}</td>

                                        <td>{data.solution}</td>
                                        <td className={style.tdAksi}>
                                            <Link to={`/EditKerusakan/${data.id}`}>
                                                <Button variant="link" href="/EditKerusakan">
                                                    <FontAwesomeIcon icon={faPencil} className={style.icon}/>
                                                </Button>
                                            </Link>
                                            <Button variant="link" value={data.id} onClick={hapusData}>
                                                <FontAwesomeIcon icon={faTrash} className={style.icon}/>
                                            </Button>                                    
                                        </td>
                                    </tr>
                                )
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

export default Kerusakan;