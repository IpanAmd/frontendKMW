import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function CheckClient({ children }) {
  // mengambil data client id dari localStorage
  const client = localStorage.getItem("client");
  const navigate = useNavigate();

  // membuat function load untuk mengecek client id
  const load = () => {
    if (client != null) {
      swal({
        title: "Perhatian!",
        text: "Anda telah mengisi form pendaftaran",
        icon: "success",
        button: "Mengerti",
      });
      return navigate("/Diagnosa");
    }
    return children;
  };
  // function load didalam useEffect agar berjalan saat halaman Pendaftaran diakses
  useEffect(() => {
    load();
  }, []);
  return children;
}
export default CheckClient;
