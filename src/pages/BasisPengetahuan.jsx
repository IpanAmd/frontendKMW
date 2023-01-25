import style from "./basisPengetahuan.module.css";
import {Container, Button, Table } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";

function BasisPengetahuan() {
    const [kb, setKb] = useState([]);
    const tampilData = () => {
        axios.get(`http://localhost:8000/api/v1/knowledge-base`)
        .then((response) => {
            setKb(response.data.data)
        }) .catch((error) => {
            console.log(error);
        })
    }

    const hapusData = (e) => {
        const id = e.currentTarget.value;
        swal({
            title: "Perhatian!",
            text: `Apa anda yakin ingin menghapus data basis pengetahuan?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willEnd) => {
            if (willEnd) {
                axios.delete(`http://localhost:8000/api/v1/knowledge-base/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then (() => {
                    window.location.reload()
                });
                swal("Data basis pengetahuan berhasil dihapus", {
                icon: "success",
              });
            } else {
              swal("Ah plinplan lu");
            }
        });
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
                        <h3>BASIS PENGETAHUAN</h3>
                    </section>

                    <div className={style.button}>   
                        <Button variant="warning" href="/TambahBasisPengetahuan" className="mx-3">
                            <FontAwesomeIcon icon={faPlus}/>
                            <span className={style.addItem}>TAMBAH DATA</span>
                        </Button>
                    </div>

                    <Table striped bordered size="md" className={style.main}>
                        <thead className={style.tableHead}>
                            <tr>
                                <td className={style.thSatu}>No</td>
                                <td className={style.thTiga}>Nama Kerusakan</td>
                                <td className={style.thTiga}>Gejala Kerusakan</td>
                                <td className={style.thDua}>Nilai MB</td>
                                <td className={style.thDua}>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {kb.map((data, index) => {
                                return (
                                <tr key={data.id}>
                                    {/* fungsi tanda tanya ? untuk ngebaca jika elemen tersebut bernilai null */}
                                    <td className={style.tdAksi}>{index+1}</td>
                                    <td>{data.Fault?.code} - {data.Fault?.name}</td>
                                    <td>{data.Indication?.code} - {data.Indication?.name}</td>
                                    <td className={style.tdAksi}>{data.mb}</td>
                                    <td className={style.tdAksi}>
                                        <Link to={`/EditBasisPengetahuan/${data.id}`}>
                                            <Button variant="link">
                                                <FontAwesomeIcon icon={faPencil} className={style.icon} title="Edit"/>
                                            </Button>
                                        </Link>
                                        <Button variant="link" value={data.id} onClick={hapusData}>
                                                <FontAwesomeIcon icon={faTrash} className={style.icon} title="Hapus"/>
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

export default BasisPengetahuan;