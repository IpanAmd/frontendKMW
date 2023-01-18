import { useState, useEffect } from "react";
import axios from "axios";
import { Header, Footer } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import style from "./pendaftaran.module.css";
import background from "../asset/bg1.png";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

function InfoAkun() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const dataAdmin = () => {
    axios
      .get(`http://localhost:8000/api/v1/auth/admin`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setName(response.data.data.name);
        setUsername(response.data.data.username);
      });
  };

  const ubahData = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      username: username,
    };
    axios
      .put(`http://localhost:8000/api/v1/auth/admin`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        swal({
          title: "Berhasil!",
          text: "Akun berhasil anda ubah!",
          icon: "success",
          button: "Oke",
        });
      })
      .catch(() => {
        toast("Isi semua kolom dengan benar!", {
          type: "error",
        });
      });
  };

  useEffect(() => {
    dataAdmin();
  }, []);

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
            <h3>INFO DATA ADMIN</h3>
          </section>
          <Form className={style.main}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-around mt-5">
              <Button
                variant="warning"
                className="mx-3"
                onClick={() => navigate(-1)}
              >
                KEMBALI
              </Button>
              <Button
                onClick={ubahData}
                variant="danger"
                className="mx-3"
                type="submit"
              >
                SIMPAN
              </Button>
            </div>
          </Form>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
export default InfoAkun;
