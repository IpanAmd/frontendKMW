import { Navigate } from "react-router-dom";
// navigate - untuk pindah (navigasi) 
import swal from "sweetalert";


function ProtectedToken ({ children }) {
    const token = localStorage.getItem('token');

    if (!token) {
        swal({
            title: "Perhatian!",
            text: "Maaf, Menu ini hanya bisa diakses oleh Admin",
            icon: "warning",
            button: "Mengerti",
          });
          return <Navigate to="/login" />
    } else {
        return children;
    }

    // return children;
}

export default ProtectedToken;