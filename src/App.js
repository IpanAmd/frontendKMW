import "./App.css";
import "../src/components/fontAwesome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Gejala,
  Kerusakan,
  BasisPengetahuan,
  PetunjukPenggunaan,
  Pendaftaran,
  Diagnosa,
  HasilDiagnosa,
  TambahDataGejala,
  TambahDataKerusakan,
  TambahBasisPengetahuan,
  EditGejala,
  EditKerusakan,
  EditBasisPengetahuan,
} from "./pages";
import ProtectedToken from "./auth/ProtectedToken";
import CheckClient from "./auth/CheckClient";
import CheckConsultation from "./auth/CheckConsultation";
import CheckResult from "./auth/CheckResult";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="gejala"
            element={
              <ProtectedToken>
                <Gejala />
              </ProtectedToken>
            }
          />
          <Route
            path="kerusakan"
            element={
              <ProtectedToken>
                <Kerusakan />
              </ProtectedToken>
            }
          />
          <Route
            path="basisPengetahuan"
            element={
              <ProtectedToken>
                <BasisPengetahuan />
              </ProtectedToken>
            }
          />
          <Route path="petunjukPenggunaan" element={<PetunjukPenggunaan />} />
          <Route
            path="Pendaftaran"
            element={
              <CheckClient>
                <Pendaftaran />
              </CheckClient>
            }
          />
          <Route
            path="Diagnosa"
            element={
              <CheckConsultation>
                <Diagnosa />
              </CheckConsultation>
            }
          />
          <Route
            path="HasilDiagnosa"
            element={
              <CheckResult>
                <HasilDiagnosa />
              </CheckResult>
            }
          />
          <Route path="TambahDataGejala" element={<TambahDataGejala />} />
          <Route path="TambahDataKerusakan" element={<TambahDataKerusakan />} />
          <Route
            path="TambahBasisPengetahuan"
            element={<TambahBasisPengetahuan />}
          />
          <Route path="EditGejala/:id" element={<EditGejala />} />
          <Route path="EditKerusakan/:id" element={<EditKerusakan />} />
          <Route
            path="EditBasisPengetahuan/:id"
            element={<EditBasisPengetahuan />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
