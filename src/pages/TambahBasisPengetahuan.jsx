import style from "./tambahBasisPengetahuan.module.css";
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import background from "../asset/bg1.png"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


function TambahBasisPengetahuan() {
    //untuk menampung semua data gejala dan kerusakan
    const [indications, setIndications] = useState([]);
    const [faults, setFaults] = useState([]);
    //untuk mengambil data pada tag Select dari react-select
    const [selectedIndication, setSelectedIndication] = useState(null);
    const [selectedFault, setSelectedFault] = useState(null);
    const [mb, setMb] = useState();
    const navigate = useNavigate();

    //mencari semua data gejala
    const getIndications = () => {
        axios.get(`http://localhost:8000/api/v1/indication/`)
        .then((response) => {
            setIndications(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    //mencari semua data kerusakan 
    const getFaults = () => {
        axios.get(`http://localhost:8000/api/v1/fault/`)
        .then((response) => {
            setFaults(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    //memasukan semua data gejala ke variable indications dalam bentuk array object 
    // indications = [
                        // {value: "1", label:"G01 - Gejela 1"}
                        // {value: "2", label:"G02 - Gejela 2"}
                // ]
    const indication = [];
    indications.forEach((data) => {
        let obj = { value: data?.id, label: `${data?.code} - ${data?.name}`};
        indication.push(obj);
    });

    //memasukan semua data kerusakan ke variable fault dalam bentuk array object 
    // fault = [
    //          {value: "1", label: "K01 - Kerusakan 1"}, 
    //          {value: "2", label: "K02 - Kerusakan 2"},
    //         ]
    const fault = [];
    faults.forEach((data) => {
        let obj = {value: data?.id, label: `${data?.code} - ${data?.name}`};
        fault.push(obj);
    });

    //function untuk tambah data
    const tambahData = (e) => {
        e.preventDefault();
        //karena data yang diinput pada backend hanya berupa id maka perlu didefinisikan object berdasarkan value
        let faultData = selectedFault.value;
        let indicationData = selectedIndication.value;
        const data = {
            fault_id: faultData,
            indication_id: indicationData,
            mb: mb,
        };
        axios.post(`http://localhost:8000/api/v1/knowledge-base/create`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setSelectedIndication(response.data.data.indication_id);
            setSelectedFault(response.data.data.fault_id);
            setMb(response.data.data.mb);
            navigate("/basisPengetahuan");
        })
        .catch((error) => {
            console.log(error);
        });
    };
    //load data gejala dan kerusakan
    useEffect(() => {
        getIndications();
        getFaults();
    }, []);

    return(
        <>
            <Header/>
            <Container fluid className={style.containerFluid} style={{backgroundImage:`url(${background})`}}>
                
                <Container className={style.container}>

                    <section className={style.section}>
                        <h3>TAMBAH BASIS PENGETAHUAN</h3>
                    </section>
                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kerusakan</Form.Label>
                            <Select
                                placholder="Pilih Kerusakan"
                                defaultValue={selectedFault}
                                onChange={setSelectedFault}
                                options={fault}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Gejala</Form.Label>
                            <Select
                                placeholder="Pilih Gejala"
                                defaultValue={selectedIndication}
                                //onChange mengambil data berupa object dari variable indication yang bertipe data array object
                                onChange={setSelectedIndication}
                                //option menampilkan semua data yang bertipe array object
                                options={indication}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nilai MB</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Masukan Nilai MB"
                                value={mb}
                                onChange={(e) => setMb(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className={style.button}>
                            <Button variant="warning" href="/BasisPengetahuan" className="mx-3" type="submit">
                                KEMBALI
                            </Button>
                            <Button variant="danger" href="/BasisPengetahuan" className="mx-3" type="submit" onClick={tambahData}>
                                SIMPAN
                            </Button>
                        </div>
                    </Form>


                </Container>

            </Container>

            <Footer/>
        </>

    ) 
}

export default TambahBasisPengetahuan;