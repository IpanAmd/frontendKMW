import { useState, useEffect } from "react";
import axios from "axios";
import { Header, Footer } from "../components";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import style from "./pendaftaran.module.css";
import background from "../asset/bg1.png";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

function UbahKataSandi() {
  const [olds, setOlds] = useState("");
  const [news, setNews] = useState("");
  const [confirms, setConfirms] = useState("");

  const navigate = useNavigate();

  const ubahData = (e) => {
    e.preventDefault();
    const data = {
      old_password: olds,
      new_password: news,
      confirm_password: confirms,
    };
    axios
      .put(`http://localhost:8000/api/v1/auth/admin/password`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        swal({
          title: "Berhasil!",
          text: "Kata Sandi berhasil diubah!",
          icon: "success",
          button: "Oke",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach((err) => {
            toast(err, {
              type: "error",
            });
          });
        } else {
          toast(error.response.data.message, {
            type: "error",
          });
        }
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
            <h3>UBAH KATA SANDI</h3>
          </section>
          <Form className={style.main}>
            <Form.Group className="mb-3">
              <Form.Label>Kata Sandi Lama</Form.Label>
              <Form.Control
                type="password"
                placeholder="masukkan kata sandi lama"
                value={olds}
                onChange={(e) => setOlds(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kata Sandi Baru</Form.Label>
              <Form.Control
                type="password"
                placeholder="masukkan kata sandi baru"
                value={news}
                onChange={(e) => setNews(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Konfirmasi Kata Sandi</Form.Label>
              <Form.Control
                type="password"
                placeholder="konfirmasi kata sandi baru"
                value={confirms}
                onChange={(e) => setConfirms(e.target.value)}
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
export default UbahKataSandi;
