import style from "./editBasisPengetahuan.module.css";
import { Footer, Header } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import background from "../asset/bg1.png";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBasisPengetahuan() {
    // indications menyimpan lebih dari 1 data, 
    const [indications, setIndications] = useState([]);
    const [faults, setFaults] = useState([]);
    const [selectedIndication, setSelectedIndication] = useState({});
    const [selectedFault, setSelectedFault] = useState ({});
    const [mb, setMb] = useState ();
    const navigate = useNavigate();
    const {id} = useParams();

    const getKb = async () => {
        // Mengambil data dari indication dan fault
        const res = await axios.get(`http://localhost:8000/api/v1/knowledge-base/${id}`);
        selectedIndication["value"] = res.data.data.Indication.id;
        selectedIndication[
            "label"
        ] = `${res.data.data.Indication.code} - ${res.data.data.Indication.name}`;
        selectedFault["value"] = res.data.data.Fault.id;
        selectedFault[
            "label"
        ] = `${res.data.data.Fault.code} - ${res.data.data.Fault.name}`;
        setMb(res.data.data.mb);
    };

    const getIndications = () => {
        axios.get(`http://localhost:8000/api/v1/indication/`)
        .then((response) => {
            setIndications(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const getFaults = () => {
        axios.get(`http://localhost:8000/api/v1/fault/`)
        .then((response) => {
            setFaults(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const indication = [];
    indications.forEach((data) => {
        let obj = { value: data?.id, label:`${data?.code} - ${data?.name}`};
        indication.push(obj);
    });
    
    const fault = [];
    faults.forEach((data) => {
        let obj = { value: data?.id, label:`${data?.code} - ${data?.name}`};
        fault.push(obj);
    });
    
    const tambahData = (e) => {
        e.preventDefault();
        let faultData = selectedFault.value;
        let indicationData = selectedIndication.value;
        const data = {
            fault_id: faultData,
            indication_id: indicationData,
            mb: mb,
        };
        axios.put(`http://localhost:8000/api/v1/knowledge-base/${id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then((response) => {
            setSelectedIndication(response.data.data?.indication_id);
            setSelectedFault(response.data.data?.fault_id);
            setMb(response.data.data?.mb);
            navigate("/basisPengetahuan");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getIndications();
        getFaults();
        getKb();
    }, []);


    return (
        <>
            <Header/>
            <Container fluid className={style.containerFluid} style={{backgroundImage:`url(${background})`}}>
                
                <Container className={style.container}>

                    <section className={style.section}>
                        <h3>EDIT DATA BASIS PENGETAHUAN</h3>
                    </section>
                    <Form className={style.main}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kerusakan</Form.Label>
                            <Select
                                defaultValue={selectedFault}
                                onChange={setSelectedFault}
                                options={fault}
                                value={selectedFault}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Gejala</Form.Label>
                            <Select
                                defaultValue={selectedIndication}
                                onChange={setSelectedIndication}
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
                            <Button variant="danger" className="mx-3" type="submit" onClick={tambahData}>
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

export default EditBasisPengetahuan;