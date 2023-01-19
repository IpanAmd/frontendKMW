import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./diagnosa.module.css";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { Header, Footer } from "../components";
import background from "../asset/bg1.png";
import swal from "sweetalert";

function Diagnosa() {
  // menampung data array
  const [indications, setIndications] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [faults, setFaults] = useState([]);

  // menampung input data dari frontend
  const [selectedIndication, setSelectedIndication] = useState();
  const [selectedFault, setSelectedFault] = useState("");
  const [cfUser, setCfUser] = useState(0);

  // menampung data kondisi
  const [status, setStatus] = useState("process");
  const [check, setCheck] = useState();

  // mendapatkan client id dari localstorage
  const clientId = localStorage.getItem("client");

  // menampung data kerusakan jika diagnosa tidak sampai akhir
  const collectFault = [];

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
  // mendapatkan data kerusakan
  const dataKerusakan = () => {
    axios.get(`http://localhost:8000/api/v1/fault/`).then((response) => {
      setFaults(response.data.data);
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
          if (collectFault.length == 0) {
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
                const faultId = [];
                faults.map((data) => {
                  collectFault.map((kode) => {
                    if (data.code == kode) {
                      faultId.push(data.id);
                    }
                  });
                });
                // melakukan looping data kerusakan dari collectFault
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
          let faultId = 0;
          faults.map((data) => {
            if (data.code == selectedFault) {
              faultId = data.id;
            }
          });
          const result = {
            client_id: clientId,
            fault_id: faultId,
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
                  setStatus(status);
                  setSelectedFault(fault);
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
    dataKerusakan();
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
                        collectFault.push("K01");
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
                        collectFault.push("K08");
                        collectFault.push("K014");
                        collectFault.push("K016");
                        collectFault.push("K017");
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
                        collectFault.push("K06");
                        collectFault.push("K07");
                        collectFault.push("K020");
                        collectFault.push("K09");
                        collectFault.push("K012");
                        collectFault.push("K013");
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
                        collectFault.push("K015");
                        collectFault.push("K04");
                        collectFault.push("K011");
                        collectFault.push("K010");
                        collectFault.push("K021");
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
                                  const fault = "K010";
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
                        collectFault.push("K018");
                        collectFault.push("K022");
                        collectFault.push("K019");
                        return (
                          <>
                            {indications.map((data) => {
                              if (
                                data.code == "G039" ||
                                data.code == "G041" ||
                                data.code == "G013"
                              ) {
                                if (data.code == "G039") {
                                  const fault = "K018";
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else if (data.code == "G041") {
                                  const fault = "K022";
                                  const status = "end";
                                  return (
                                    <>{daftarPilihan(data, fault, status)}</>
                                  );
                                } else if (data.code == "G013") {
                                  const fault = "K019";
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
                        collectFault.push("K05");
                        collectFault.push("K02");
                        collectFault.push("K03");
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
                        collectFault.push("K08");
                        collectFault.push("K014");
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
                        collectFault.push("K016");
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
                        collectFault.push("K017");
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
                        collectFault.push("K06");
                        collectFault.push("K07");
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
                        collectFault.push("K020");
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
                        collectFault.push("K09");
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
                        collectFault.push("K012");
                        collectFault.push("K013");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010" || data.code == "G029") {
                                if (data.code == "G010") {
                                  const fault = "K012";
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
                        collectFault.push("K015");
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
                        collectFault.push("K04");
                        collectFault.push("K011");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G011" || data.code == "G08") {
                                if (data.code == "G011") {
                                  const fault = "K04";
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
                        collectFault.push("K021");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G018") {
                                const fault = "K021";
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
                        collectFault.push("K05");
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
                        collectFault.push("K02");
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
                        collectFault.push("K03");
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
                        collectFault.push("K08");
                        collectFault.push("K014");
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
                        collectFault.push("K016");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G04") {
                                const fault = "K016";
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
                        collectFault.push("K017");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G038") {
                                const fault = "K017";
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
                        collectFault.push("K06");
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
                        collectFault.push("K07");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G020") {
                                const fault = "K07";
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
                        collectFault.push("K020");
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
                        collectFault.push("K09");
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
                        collectFault.push("K013");
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
                        collectFault.push("K015");
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
                        collectFault.push("K011");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G027") {
                                const fault = "K011";
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
                        collectFault.push("K05");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G010") {
                                const fault = "K05";
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
                        collectFault.push("K02");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G04") {
                                const fault = "K02";
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
                        collectFault.push("K03");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G07") {
                                const fault = "K03";
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
                        collectFault.push("K08");
                        collectFault.push("K014");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G021" || data.code == "G032") {
                                if (data.code == "G032") {
                                  const fault = "K014";
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
                        collectFault.push("K06");
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
                        collectFault.push("K020");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G038") {
                                const fault = "K020";
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
                        collectFault.push("K09");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G026") {
                                const fault = "K09";
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
                        collectFault.push("K013");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G031") {
                                const fault = "K013";
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
                        collectFault.push("K015");
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
                        collectFault.push("K08");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G025") {
                                const fault = "K08";
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
                        collectFault.push("K06");
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
                        collectFault.push("K015");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G035") {
                                const fault = "K015";
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
                        collectFault.push("K06");
                        return (
                          <>
                            {indications.map((data) => {
                              if (data.code == "G017") {
                                const fault = "K06";
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
