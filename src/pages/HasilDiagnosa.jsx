import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./hasilDiagnosa.module.css";
import { Container, Table, Button } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";

function HasilDiagnosa() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [carYear, setCarYear] = useState(0);
  const [numberPlat, setNumberPlat] = useState("");
  const [car, setCar] = useState("");

  const [consultations, setConsultations] = useState([]);
  const [results, setResults] = useState([]);

  const clientId = localStorage.getItem("client");
  const navigate = useNavigate();

  const dataClient = () => {
    axios
      .get(`http://localhost:8000/api/v1/client/${clientId}`)
      .then((response) => {
        setName(response.data.data.name);
        setCategory(response.data.data.category);
        setCar(response.data.data.car);
        setCarYear(response.data.data.car_year);
        setNumberPlat(response.data.data.number_plat);
      });
  };

  const dataGejala = [];
  const dataKonsultasi = () => {
    axios.get(`http://localhost:8000/api/v1/consultation`).then((response) => {
      setConsultations(response.data.data);
    });
  };
  consultations.sort((a, b) => a.id - b.id);
  consultations.map((data) => {
    if (data.Client.id == clientId) {
      dataGejala.push(data.Indication);
    }
  });
  console.log(dataGejala, "gejala");

  const dataHasil = () => {
    axios.get(`http://localhost:8000/api/v1/result`).then((response) => {
      setResults(response.data.data);
    });
  };
  const dataKerusakan = [];
  results.sort((a, b) => a.id - b.id);
  results.map((data) => {
    if (data.Client.id == clientId) {
      dataKerusakan.push(data.Fault);
    }
  });
  console.log(dataKerusakan, "kerusakan");

  const tombolKembali = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("consultation");
    navigate("/");
  };

  useEffect(() => {
    dataClient();
    dataKonsultasi();
    dataHasil();
  }, []);
  return (
    <>
      <Header />

      <Container
        fluid
        className={style.containerFluid}
        style={{ backgroundImage: `url(${background})` }}
      >
        <Container className={style.container}>
          <section className={style.section}>
            <h3>HASIL DIAGNOSA</h3>
          </section>

          <main className={style.main}>
            <div id="biodata">
              <p>Identifikasi User</p>
              <table className="mb-3 ms-3">
                <tr>
                  <td>Nama</td>
                  <td>&nbsp;&nbsp;&nbsp;:&nbsp;</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Kategori</td>
                  <td>&nbsp;&nbsp;&nbsp;:&nbsp;</td>
                  <td>{category}</td>
                </tr>
                <tr>
                  <td>Mobil</td>
                  <td>&nbsp;&nbsp;&nbsp;:&nbsp;</td>
                  <td>{car}</td>
                </tr>
                <tr>
                  <td>Tahun Mobil</td>
                  <td>&nbsp;&nbsp;&nbsp;:&nbsp;</td>
                  <td>{carYear}</td>
                </tr>
                <tr>
                  <td>Plat Nomor</td>
                  <td>&nbsp;&nbsp;&nbsp;:&nbsp;</td>
                  <td>{numberPlat}</td>
                </tr>
              </table>
            </div>
            <div id="Gejala">
              <p>Gejala Kerusakan</p>
              <ol>
                {dataGejala.map((data) => {
                  return <li key={data.id}>&nbsp;{data.name}</li>;
                })}
              </ol>
            </div>
            <div id="kerusakan">
              <div className="d-flex justify-content-between">
                <p>Hasil Diagnosa</p>
                <p>Nilai Kepastian</p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <ol>
                    {dataKerusakan.map((data) => {
                      return <li key={data.id}>&nbsp;{data.name}</li>;
                    })}
                  </ol>
                </div>
                <div>
                  <label>%</label>
                </div>
              </div>
            </div>
            <div id="solusi">
              <p>Solusi</p>
              <ol>
                {dataKerusakan.map((data) => {
                  return <li key={data.id}>&nbsp;{data.solution}</li>;
                })}
              </ol>
            </div>
          </main>
          <div className={style.button}>
            <Button
              variant="danger"
              className="mx-3"
              type="submit"
              onClick={tombolKembali}
            >
              Kembali
            </Button>
          </div>
        </Container>
      </Container>

      <Footer />
    </>
  );
}

export default HasilDiagnosa;
