import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./pendaftaran.module.css";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import { ToastContainer, toast } from "react-toastify";

function Pendaftaran() {
  // variabel untuk menampung input data
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Montir");
  const [carYear, setCarYear] = useState(2021);
  const [numberPlat, setNumberPlat] = useState("");
  const [car, setCar] = useState("Toyota Innova");
  // data tahun mobil
  const years = [
    2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021,
  ];

  const navigate = useNavigate();
  // function untuk tombol simpan & mulai
  const tambahData = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      category: category,
      car: car,
      car_year: carYear,
      number_plat: numberPlat,
    };
    axios
      .post(`http://localhost:8000/api/v1/client/create`, data)
      .then((response) => {
        // mengambil data dari response backend
        setName(response.data.data.name);
        setCategory(response.data.data.category);
        setCarYear(response.data.data.car_year);
        setNumberPlat(response.data.data.number_plat);

        // menyimpan data client id di localstorage
        localStorage.setItem("client", response.data.data.id);
        localStorage.setItem("consultation", true);

        // pindah halaman
        navigate("/Diagnosa");
      })
      .catch((error) => {
        // menampilkan error
        toast("Isi semua kolom dengan benar!", {
          type: "error",
        });
      });
  };
  return (
    <>
      <Header />
      <ToastContainer position="top-center" />
      <Container
        fluid
        className={style.containerFluid}
        style={{ backgroundImage: `url(${background})` }}
      >
        <Container className={style.container}>
          <section className={style.section}>
            <h3>FORM PENDAFTARAN USER</h3>
          </section>

          <Form className={style.main}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Kategori</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    const selected = e.target.value;
                    setCategory(selected);
                  }}
                >
                  <option value={"Montir"}>Montir</option>
                  <option value={"Pengguna awam"}>Pengguna awam</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Mobil</Form.Label>
                <Form.Control placeholder="Toyota Innova" disabled />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Tahun</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    const selectedYear = e.target.value;
                    setCarYear(selectedYear);
                  }}
                >
                  {
                    (years.sort((a, b) => b - a),
                    years.map((year) => {
                      return <option value={year}>{year}</option>;
                    }))
                  }
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Plat Nomor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Plat Nomor"
                  value={numberPlat}
                  onChange={(e) => setNumberPlat(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
          </Form>

          <div className={style.button}>
            <Button variant="warning" href="/" className="mx-3">
              KEMBALI
            </Button>
            <Button
              variant="danger"
              onClick={tambahData}
              className="mx-3"
              type="submit"
            >
              SIMPAN &amp; MULAI
            </Button>
          </div>
        </Container>
      </Container>

      <Footer />
    </>
  );
}

export default Pendaftaran;
