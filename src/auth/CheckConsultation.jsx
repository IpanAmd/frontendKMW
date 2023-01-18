import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import axios from "axios";

function CheckConsultation({ children }) {
  const [results, setResults] = useState([]);
  const clientId = localStorage.getItem("client");
  const navigate = useNavigate();

  // membuat function load untuk mendapatkan data hasil kerusakan
  const load = () => {
    axios.get(`http://localhost:8000/api/v1/result`).then((response) => {
      setResults(response.data.data);
    });
  };

  useEffect(() => {
    load();
  }, []);

  // menampung data hasil berdasarkan clientId
  const faultData = [];
  results.map((data) => {
    if (data.Client.id == clientId) {
      faultData.push(data);
    }
  });
  // set conditions
  if (clientId != null) {
    if (faultData.length != 0) {
      swal({
        title: "Perhatian!",
        text: "Diagnosa anda telah selesai, silahkan cek hasilnya",
        icon: "success",
        button: "Mengerti",
      });
      navigate("/HasilDiagnosa");
    }
  } else {
    swal({
      title: "Perhatian!",
      text: "Anda belum mengisi form pendaftaran",
      icon: "warning",
      button: "Mengerti",
    });
    navigate("/Pendaftaran");
  }

  return children;
}
export default CheckConsultation;
