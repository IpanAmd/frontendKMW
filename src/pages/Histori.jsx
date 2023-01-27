import style from "./histori.module.css";
import { Container, Table } from "react-bootstrap";
import { Footer, Header } from "../components";
import background from "../asset/bg1.png";
import { useState, useEffect } from "react";
import axios from "axios";


function Histori() {

    const [histori, setHistori] = useState([]);
    const tampilData = () => {
        axios.get(`http://localhost:8000/api/v1/client/`)
        .then((response) => {
            setHistori(response.data.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        tampilData();
    }, [])


    return (
        <>
            <Header />
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
                <Container className={style.container}>
                    <section className={style.section}>
                        <h3>HISTORI DIAGNOSA</h3>
                    </section>

                    {/* Content histori */}
                    <Table striped bordered size="md" className={style.main}>
                        <thead className={style.tableHead}>
                            <tr>
                                <td className={style.thSatu}>No</td>
                                <td>Nama User</td>
                                <td className={style.thDua}>Kategori</td>
                                <td className={style.thDua}>Mobil</td>
                                <td className={style.thDua}>Tahun</td>
                                <td className={style.thDua}>Plat Nomor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {histori.map((data,index) => {
                                return (
                                    <tr>
                                        <td className={style.tdAksi}>{index+1}</td>
                                        <td>{data.name}</td>
                                        <td className={style.tdAksi}>
                                            {data.category}
                                        </td>
                                        <td className={style.tdAksi}>
                                            {data.car}
                                        </td>
                                        <td className={style.tdAksi}>
                                            {data.car_year}
                                        </td>
                                        <td className={style.tdAksi}>
                                            {data.number_plat}
                                        </td>
                                    </tr>
                                );
                            })}     
                        </tbody>   
                    </Table>
                </Container>


            </Container>

            <Footer/>
        </>
    )
}

export default Histori;