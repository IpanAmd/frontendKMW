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
  const [kb, setKb] = useState([]);

  const clientId = localStorage.getItem("client");
  const navigate = useNavigate();
  // mendapatkan data client berdasarkan id
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

  // mendapatkan semua data konsultasi
  const dataKonsultasi = () => {
    axios.get(`http://localhost:8000/api/v1/consultation`).then((response) => {
      setConsultations(response.data.data);
    });
  };

  // mendapatkan semua data hasil kerusakan
  const dataHasil = () => {
    axios.get(`http://localhost:8000/api/v1/result`).then((response) => {
      setResults(response.data.data);
    });
  };

  // mendapatkan semua data basis pengetahuan
  const dataBasisPengetahuan = () => {
    axios
      .get(`http://localhost:8000/api/v1/knowledge-base`)
      .then((response) => {
        setKb(response.data.data);
      });
  };

  // menampung data gejala dari konsultasi berdasarkan client id
  const dataGejala = [];
  // menampung data eviden berdasarkan gejala yg dipilih
  const dataEvidence = [];

  consultations.sort((a, b) => a.id - b.id);
  consultations.map((data) => {
    if (data.Client.id == clientId) {
      let obj = {
        cf_user: data.cf_user,
        indication: data.Indication.name,
      };
      dataGejala.push(obj);
      results.map((result) => {
        if (data.Client.id == clientId) {
          if (result.Client.id == clientId) {
            let obj = {
              evidence: data.cf_user,
              indication: data.Indication.name,
              fault: result.Fault.name,
            };
            dataEvidence.push(obj);
          }
        }
      });
    }
  });

  // mencari data kerusakan berdarkan hasil konsultasi
  const dataKerusakan = [];
  results.sort((a, b) => a.id - b.id);
  results.map((data) => {
    if (data.Client.id == clientId) {
      dataKerusakan.push(data.Fault);
    }
  });
  console.log(dataGejala, "gejala");

  // mencari data hipotesis berdasarkan basis pengetahuan
  const dataHipotesis = [];
  kb.sort((a, b) => a.id - b.id);
  kb.map((data) => {
    dataKerusakan.map((fault) => {
      dataGejala.map((indication) => {
        if (
          data.Fault.name == fault.name &&
          data.Indication.name == indication.indication
        ) {
          let obj = {
            hipotesis: data.mb,
            indication: data.Indication.name,
            fault: data.Fault.name,
          };
          dataHipotesis.push(obj);
        }
      });
    });
  });
  console.log(dataHipotesis, "H");
  console.log(dataEvidence, "E");

  // mencari nilai setiap cf tunggal
  const cfTunggal = [];
  dataHipotesis.map((h) => {
    dataEvidence.map((e) => {
      if (h.fault == e.fault && h.indication == e.indication) {
        let obj = {};
        let value = Math.round(h.hipotesis * e.evidence * 100) / 100;
        obj["cf"] = value;
        obj["fault"] = h.fault;
        cfTunggal.push(obj);
      }
    });
  });
  console.log(cfTunggal, "cf");

  // mendapatkan nilai cf kombinasi
  const hasilAkhir = [];
  let result = 0;
  dataKerusakan.map((fault) => {
    let obj = {};
    let value = 0;
    cfTunggal.map((data) => {
      if (data.fault == fault.name) {
        value = result + data.cf * (1 - result);
        result = value;
      }
    });
    obj["cf"] = (Math.round(result * 100) / 100);
    obj["fault"] = fault.name;
    obj["solution"] = fault.solution;
    hasilAkhir.push(obj);
    result = 0;
  });
  console.log(hasilAkhir, "cekNilai");

  // aksi untuk tombol selesai
  const tombolSelesai = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("consultation");
    navigate("/");
  };

  useEffect(() => {
    dataClient();
    dataKonsultasi();
    dataHasil();
    dataBasisPengetahuan();
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
              <div className="d-flex justify-content-between">
                <p>Gejala Kerusakan</p>
                <p>Tingkat Kepercayaan</p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <ol>
                    {
                      (dataGejala.sort((a, b) => b.evidence - a.evidence),
                      dataGejala.map((data, index) => {
                        return <li key={index}>{data.indication}</li>;
                      }))
                    }
                  </ol>
                </div>
                <div className={style.sizeDiv}>
                  {
                    (dataGejala.sort((a, b) => b.evidence - a.evidence),
                    dataGejala.map((data, index) => {
                      let value = "";
                      if (data.cf_user == 0) {
                        value = "Tidak Yakin";
                      } else if (data.cf_user == 0.2) {
                        value = "Sedikit Yakin";
                      } else if (data.cf_user == 0.4) {
                        value = "Cukup Yakin";
                      } else if (data.cf_user == 0.6) {
                        value = "Yakin";
                      } else {
                        value = "Sangat Yakin";
                      }
                      return (
                        <label className="m-0" key={index}>
                          {value}
                        </label>
                      );
                    }))
                  }
                </div>
              </div>
            </div>
            <div id="kerusakan">
              <div className="d-flex justify-content-between">
                <p>Hasil Diagnosa</p>
                <p className="me-4">Nilai Kepastian</p>
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <ol>
                    {
                      (hasilAkhir.sort((a, b) => b.cf - a.cf),
                      hasilAkhir.map((data, index) => {
                        return <li key={index}>{data.fault}</li>;
                      }))
                    }
                  </ol>
                </div>
                <div className={style.sizeDiv}>
                  {
                    (hasilAkhir.sort((a, b) => b.cf - a.cf),
                    hasilAkhir.map((data, index) => {
                      return (
                        <label className={style.listNone} key={index}>
                          &nbsp;{data.cf}
                        </label>
                      );
                    }))
                  }
                </div>
              </div>
            </div>
            <div id="solusi">
              <p>Solusi</p>
              <ol>
                {
                  (hasilAkhir.sort((a, b) => b.cf - a.cf),
                  hasilAkhir.map((data, index) => {
                    return <li key={index}>{data.solution}</li>;
                  }))
                }
              </ol>
            </div>
            <div id="Catatan">
              <p className={style.catatan}>CATATAN</p>
              <ul>
                <li>Nilai kepastian dari certainty factor bernilai antara -1 sampai 1, jika hasil akhir bernial -1 maka "tidak yakin" jika bernilai 1 maka "sangat yakin"</li>
                <li>Untuk pengguna awam silahkan konsultasikan dengan montir kepercayaan anda untuk hasil yang lebih akurat</li>
              </ul>
            </div>
          </main>
          <div className={style.button}>
            <Button
              variant="danger"
              className="mx-3"
              type="submit"
              onClick={tombolSelesai}
            >
              Selesai
            </Button>
          </div>
        </Container>
      </Container>

      <Footer />
    </>
  );
}

export default HasilDiagnosa;
