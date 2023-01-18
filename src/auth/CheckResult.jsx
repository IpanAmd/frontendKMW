import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function CheckResult({ children }) {
  const navigate = useNavigate();

  // function akan berjalan jika sudah mengambil data dari localstorage
  const load = async () => {
    const clientId = await localStorage.getItem("client");
    const consultation = await localStorage.getItem("consultation");
    if (clientId == null) {
      swal({
        title: "Perhatian!",
        text: "Anda belum mengisi form pendaftaran",
        icon: "warning",
        button: "Mengerti",
      });
      navigate("/Pendaftaran");
    }
    if (consultation != null) {
      swal({
        title: "Perhatian!",
        text: "Diagnosa anda belum selesai",
        icon: "warning",
        button: "Mengerti",
      });
      navigate("/Diagnosa");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return children;
}
export default CheckResult;
