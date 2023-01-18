import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./diagnosa.module.css";
import { Container, Form, Button, Col, Row, Stack } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import swal from "sweetalert";

function Diagnosa() {
  // menampung data array
  const [indications, setIndications] = useState([]);
  const [consultations, setConsultations] = useState([]);

  // menampung input data dari frontend
  const [selectedIndication, setSelectedIndication] = useState();
  const [cfUser, setCfUser] = useState(0);
  const [fault, setFault] = useState();

  // menampung data kondisi
  const [status, setStatus] = useState("process");
  const [check, setCheck] = useState();

  // mendapatkan client id dari localstorage
  const clientId = localStorage.getItem("client");

  // menampung data kerusakan jika diagnosa tidak sampai akhir
  const faultId = [];

  const navigate = useNavigate();

  // data tingkat kepastian
  const options = [
    {
      value: 0,
      label: "Tidak Yakin",
    },
    {
      value: 0.2,
      label: "Sedikit Yakin",
    },
    {
      value: 0.4,
      label: "Cukup Yakin",
    },
    {
      value: 0.6,
      label: "Yakin",
    },
    {
      value: 0.8,
      label: "Sangat Yakin",
    },
  ];

  // mendapatkan semua data gejala
  const dataGejala = () => {
    axios.get(`http://localhost:8000/api/v1/indication/`).then((response) => {
      setIndications(response.data.data);
    });
  };

  // mendapatkan data konsultasi
  const dataKonsultasi = () => {
    axios.get(`http://localhost:8000/api/v1/consultation/`).then((response) => {
      setConsultations(response.data.data);
    });
  };

  // menampung kode gejala yang sudah dipilih dari data konsultasi berdasarkan client id
  const codeArray = [];
  consultations.sort((a, b) => a.id - b.id);
  consultations.map((data) => {
    if (data.Client.id == clientId) {
      codeArray.push(data.Indication.code);
    }
  });

  // mengukur array kode
  const arrayLength = codeArray.length;

  // mencari kode urutan terakhir dari codeArray
  const lastCode = codeArray.slice(-1);

  console.log(codeArray);
  // aksi tombol lanjut
  const tambahData = (e) => {
    e.preventDefault();
    const data = {
      client_id: clientId,
      indication_id: selectedIndication,
      cf_user: cfUser,
    };
    // jika proses diagnosa belum selesai
    if (status == "process") {
      axios
        .post(`http://localhost:8000/api/v1/consultation/create`, data)
        .then((response) => {
          setSelectedIndication(response.data.data.indication_id);
          window.location.reload();
        })
        .catch(() => {
          // jika belum memilih gejala awal
          if (faultId.length == 0) {
            swal("Pilih gejala awal untuk melajutkan diagnosa");
          }
          // jika sudah memilih gejala awal
          else {
            swal({
              title: "Perhatian!",
              text: `Anda tidak memilih salah satu gejala, apakah anda ingin menyelesaikan Diagnosa?`,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willEnd) => {
              if (willEnd) {
                // melakukan looping data kerusakan dari faultId
                faultId.map((id) => {
                  const result = {
                    client_id: clientId,
                    fault_id: id,
                  };
                  axios.post(
                    `http://localhost:8000/api/v1/result/create`,
                    result
                  );
                });
                swal("Diagnosa anda telah selesai, silahkan cek hasilnya", {
                  icon: "success",
                });
                localStorage.removeItem("consultation");
                navigate("/HasilDiagnosa");
              } else {
                swal("Silahkan pilih gejala untuk melajutkan diagnosa");
              }
            });
          }
        });
    }
    // jika proses diagnosa telah selesai
    else {
      // membuat data konsultasi teakhir
      axios
        .post(`http://localhost:8000/api/v1/consultation/create`, data)
        .then((response) => {
          setSelectedIndication(response.data.data.indication_id);
          const result = {
            client_id: clientId,
            fault_id: fault,
          };
          // membuat data hasil kerusakan
          axios
            .post(`http://localhost:8000/api/v1/result/create`, result)
            .then(() => {
              localStorage.removeItem("consultation");
              swal({
                title: "Success!",
                text: "Diagnosa anda telah selesai",
                icon: "success",
                button: "Oke",
              });
              navigate("/HasilDiagnosa");
            });
        });
    }
  };

  // aksi untuk tombol batal
  const tombolBatal = (e) => {
    e.preventDefault();
    swal({
      title: "Perhatian!",
      text: `Apakah anda ingin membatalkan diagnosa?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEnd) => {
      if (willEnd) {
        // menghapus data client berdasarkan id
        axios
          .delete(`http://localhost:8000/api/v1/client/${clientId}`)
          .then(() => {
            localStorage.removeItem("client");
            localStorage.removeItem("consultation");
            navigate("/Pendaftaran");
          });
        swal(
          "Diagnosa anda telah dibatalkan, silahkan isi ulang form pendaftaran",
          { icon: "success" }
        );
      } else {
        swal("Silahkan pilih gejala untuk melajutkan diagnosa");
      }
    });
  };

  // aksi untuk tombol kembali
  const tombolKembali = () => {
    let consulId = 0;
    consultations.map((data) => {
      if (data.Client.id == clientId && data.Indication.code == lastCode) {
        consulId = data.id;
      }
    });
    // menghapus data konsultasi berdasarkan codeArray urutan terakhir
    axios.delete(`http://localhost:8000/api/v1/consultation/${consulId}`);
    // menghapus data codeArray paling belakang
    codeArray.pop();
    window.location.reload();
  };

  // tampilan untuk daftar pilihan gejala
  const daftarPilihan = (data, fault, status) => {
    let list;
    if (fault == null && status == null) {
      // jika status masih process
      list = (
        <div>
          <Col
            key={data.id}
            className="d-flex flex-row justify-content-between mb-2"
          >
            <p>{data.name}</p>
            <div className="d-flex flex-row">
              {check == data.id ? (
                <Form.Select
                  style={{ width: "140px" }}
                  className="mx-4"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setCfUser(selected);
                  }}
                  value={cfUser}
                >
                  {options.map((data) => {
                    return <option value={data.value}>{data.label}</option>;
                  })}
                </Form.Select>
              ) : (
                <Form.Select
                  style={{ width: "140px" }}
                  className="mx-4"
                  disabled
                >
                  <option>Tidak Yakin</option>
                </Form.Select>
              )}
              <input
                className="me-3"
                type="checkbox"
                value={data.id}
                checked={check == data.id}
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedIndication(selected);
                  setCheck(selected);
                }}
              />
            </div>
          </Col>
        </div>
      );
    } else {
      // jika status sudah end
      list = (
        <div>
          <Col
            key={data.id}
            className="d-flex flex-row justify-content-between mb-2"
          >
            <p>{data.name}</p>
            <div className="d-flex flex-row">
              {check == data.id ? (
                <Form.Select
                  style={{ width: "140px" }}
                  className="mx-4"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setCfUser(selected);
                  }}
                  value={cfUser}
                >
                  {options.map((data) => {
                    return <option value={data.value}>{data.label}</option>;
                  })}
                </Form.Select>
              ) : (
                <Form.Select
                  style={{ width: "140px" }}
                  className="mx-4"
                  disabled
                >
                  <option>Tidak Yakin</option>
                </Form.Select>
              )}
              <input
                className="me-3"
                type="checkbox"
                value={data.id}
                checked={check == data.id}
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedIndication(selected);
                  setCheck(selected);
                  setFault(fault);
                  setStatus(status);
                }}
              />
            </div>
          </Col>
        </div>
      );
    }
    return list;
  };

  useEffect(() => {
    dataGejala();
    dataKonsultasi();
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
            <h3>FORM DIAGNOSA</h3>
          </section>

          <Form className={style.main}>
            <Row>
              <Col className="d-flex flex-row justify-content-between mb-2">
                <h6>Nama Gejala</h6>
                <div className="d-flex flex-row">
                  <h6 className="mx-2">Tingkat Kepercayan</h6>
                  <h6 className="mx-2">Pilih</h6>
                </div>
              </Col>
            </Row>
            <Row>
              {arrayLength == 0 ? (
                <>
                  {indications.map((data) => {
                    if (
                      data.code == "G01" ||
                      data.code == "G03" ||
                      data.code == "G08" ||
                      data.code == "G010" ||
                      data.code == "G038"
                    ) {
                      return <>{daftarPilihan(data)}</>;
                    }
                  })}
                </>
              ) : (
                <>
                  {codeArray.map((code) => {
                    // mencari index code
                    const firstIndex = code;
                    const secondIndex = codeArray[1];
                    const thirdIndex = codeArray[2];
                    const fourthIndex = codeArray[3];
                    const fifthIndex = codeArray[4];
                    const sixthIndex = codeArray[5];

                    if (arrayLength == 1) {
                      if (firstIndex == "G01") {
                        faultId.push(1);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G03") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G03") {
                        faultId.push(8);
                        faultId.push(14);
                        faultId.push(16);
                        faultId.push(17);
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G08" ||
                                data.code == "G012" ||
                                data.code == "G037"
                              ) {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G08") {
                        faultId.push(6);
                        faultId.push(7);
                        faultId.push(20);
                        faultId.push(9);
                        faultId.push(12);
                        faultId.push(13);
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G019" ||
                                data.code == "G040" ||
                                data.code == "G022" ||
                                data.code == "G028"
                              ) {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G010") {
                        faultId.push(15);
                        faultId.push(4);
                        faultId.push(11);
                        faultId.push(10);
                        faultId.push(21);
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G012" ||
                                data.code == "G07" ||
                                data.code == "G08" ||
                                data.code == "G06"
                              ) {
                                if (data.code == "G08") {
                                  const fault = 10;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else {
                                  return <>{daftarPilihan(data)}</>;
                                }
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G038") {
                        faultId.push(18);
                        faultId.push(22);
                        faultId.push(19);
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G039" ||
                                data.code == "G041" ||
                                data.code == "G013"
                              ) {
                                if (data.code == "G039") {
                                  const fault = 18;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else if (data.code == "G041") {
                                  const fault = 22;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else if (data.code == "G013") {
                                  const fault = 19;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                }
                              }
                            })}
                          </>
                        );
                      }
                    } else if (arrayLength == 2) {
                      if (firstIndex == "G01" && secondIndex == "G03") {
                        faultId.push(5);
                        faultId.push(2);
                        faultId.push(3);
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G012" ||
                                data.code == "G02" ||
                                data.code == "G06"
                              ) {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G03" && secondIndex == "G08") {
                        faultId.push(8);
                        faultId.push(14);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G07") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G03" && secondIndex == "G012") {
                        faultId.push(16);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G06") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G03" && secondIndex == "G037") {
                        faultId.push(17);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G041") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G08" && secondIndex == "G019") {
                        faultId.push(6);
                        faultId.push(7);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G014" || data.code == "G018") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G08" && secondIndex == "G040") {
                        faultId.push(20);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G07") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G08" && secondIndex == "G022") {
                        faultId.push(9);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G023") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G08" && secondIndex == "G028") {
                        faultId.push(12);
                        faultId.push(13);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010" || data.code == "G029") {
                                if (data.code == "G010") {
                                  const fault = 12;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else {
                                  return <>{daftarPilihan(data)}</>;
                                }
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G010" &&
                        secondIndex == "G012"
                      ) {
                        faultId.push(15);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G036") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G010" && secondIndex == "G07") {
                        faultId.push(4);
                        faultId.push(11);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G011" || data.code == "G08") {
                                if (data.code == "G011") {
                                  const fault = 4;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else {
                                  return <>{daftarPilihan(data)}</>;
                                }
                              }
                            })}
                          </>
                        );
                      } else if (firstIndex == "G010" && secondIndex == "G06") {
                        faultId.push(21);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G018") {
                                const fault = 21;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      }
                    } else if (arrayLength == 3) {
                      if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G012"
                      ) {
                        faultId.push(5);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G013") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G02"
                      ) {
                        faultId.push(2);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G05") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G06"
                      ) {
                        faultId.push(3);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G09") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G03" &&
                        secondIndex == "G08" &&
                        thirdIndex == "G07"
                      ) {
                        faultId.push(8);
                        faultId.push(14);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G03" &&
                        secondIndex == "G012" &&
                        thirdIndex == "G06"
                      ) {
                        faultId.push(16);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G04") {
                                const fault = 16;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G03" &&
                        secondIndex == "G037" &&
                        thirdIndex == "G041"
                      ) {
                        faultId.push(17);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G038") {
                                const fault = 17;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G019" &&
                        thirdIndex == "G014"
                      ) {
                        faultId.push(6);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G016") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G019" &&
                        thirdIndex == "G018"
                      ) {
                        faultId.push(7);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G020") {
                                const fault = 7;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G040" &&
                        thirdIndex == "G07"
                      ) {
                        faultId.push(20);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G022" &&
                        thirdIndex == "G023"
                      ) {
                        faultId.push(9);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G024") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G028" &&
                        thirdIndex == "G029"
                      ) {
                        faultId.push(13);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G030") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G010" &&
                        secondIndex == "G012" &&
                        thirdIndex == "G036"
                      ) {
                        faultId.push(15);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G033") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G010" &&
                        secondIndex == "G07" &&
                        thirdIndex == "G08"
                      ) {
                        faultId.push(11);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G027") {
                                const fault = 11;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      }
                    } else if (arrayLength == 4) {
                      if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G012" &&
                        fourthIndex == "G013"
                      ) {
                        faultId.push(5);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010") {
                                const fault = 5;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G02" &&
                        fourthIndex == "G05"
                      ) {
                        faultId.push(2);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G04") {
                                const fault = 2;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G01" &&
                        secondIndex == "G03" &&
                        thirdIndex == "G06" &&
                        fourthIndex == "G09"
                      ) {
                        faultId.push(3);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G07") {
                                const fault = 3;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G03" &&
                        secondIndex == "G08" &&
                        thirdIndex == "G07" &&
                        fourthIndex == "G010"
                      ) {
                        faultId.push(8);
                        faultId.push(14);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G021" || data.code == "G032") {
                                if (data.code == "G032") {
                                  const fault = 14;
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else {
                                  return <>{daftarPilihan(data)}</>;
                                }
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G019" &&
                        thirdIndex == "G014" &&
                        fourthIndex == "G016"
                      ) {
                        faultId.push(6);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G07") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G040" &&
                        thirdIndex == "G07" &&
                        fourthIndex == "G010"
                      ) {
                        faultId.push(20);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G038") {
                                const fault = 20;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G022" &&
                        thirdIndex == "G023" &&
                        fourthIndex == "G024"
                      ) {
                        faultId.push(9);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G026") {
                                const fault = 9;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G028" &&
                        thirdIndex == "G029" &&
                        fourthIndex == "G030"
                      ) {
                        faultId.push(13);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G031") {
                                const fault = 13;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G010" &&
                        secondIndex == "G012" &&
                        thirdIndex == "G036" &&
                        fourthIndex == "G033"
                      ) {
                        faultId.push(15);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G034") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      }
                    } else if (arrayLength == 5) {
                      if (
                        firstIndex == "G03" &&
                        secondIndex == "G08" &&
                        thirdIndex == "G07" &&
                        fourthIndex == "G010" &&
                        fifthIndex == "G021"
                      ) {
                        faultId.push(8);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G025") {
                                const fault = 8;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G08" &&
                        secondIndex == "G019" &&
                        thirdIndex == "G014" &&
                        fourthIndex == "G016" &&
                        fifthIndex == "G07"
                      ) {
                        faultId.push(6);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G015") {
                                return <>{daftarPilihan(data)}</>;
                              }
                            })}
                          </>
                        );
                      } else if (
                        firstIndex == "G010" &&
                        secondIndex == "G012" &&
                        thirdIndex == "G036" &&
                        fourthIndex == "G033" &&
                        fifthIndex == "G034"
                      ) {
                        faultId.push(15);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G035") {
                                const fault = 15;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      }
                    } else if (arrayLength == 6) {
                      if (
                        firstIndex == "G08" &&
                        secondIndex == "G019" &&
                        thirdIndex == "G014" &&
                        fourthIndex == "G016" &&
                        fifthIndex == "G07" &&
                        sixthIndex == "G015"
                      ) {
                        faultId.push(6);
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G017") {
                                const fault = 6;
                                const status = "end";
                                return (
                                  <>{daftarPilihan(data, fault, status)}</>
                                );
                              }
                            })}
                          </>
                        );
                      }
                    }
                  })}
                </>
              )}
            </Row>
            <Row className="mt-4">
              <div className={style.button}>
                {arrayLength == 0 ? (
                  <Button
                    variant="danger"
                    onClick={tombolBatal}
                    className="mx-3"
                    type="submit"
                  >
                    Batal
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={tombolKembali}
                    className="mx-3"
                    type="submit"
                  >
                    Kembali
                  </Button>
                )}
                <Button
                  variant="warning"
                  onClick={tambahData}
                  className="mx-3"
                  type="submit"
                >
                  Lanjut
                </Button>
              </div>
            </Row>
          </Form>
        </Container>
      </Container>

      <Footer />
    </>
  );
}

export default Diagnosa;
