import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home, Login, Gejala, Kerusakan, BasisPengetahuan, PetunjukPenggunaan, Pendaftaran, Diagnosa, HasilDiagnosa } from './pages';

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="login" element={<Login/>} />
              <Route path="gejala" element={<Gejala/>} />
              <Route path="kerusakan" element={<Kerusakan/>} />
              <Route path="basisPengetahuan" element={<BasisPengetahuan/>} />
              <Route path="petunjukPenggunaan" element={<PetunjukPenggunaan/>} />
              <Route path="Pendaftaran" element={<Pendaftaran/>} />
              <Route path='Diagnosa' element={<Diagnosa/>} />
              <Route path='HasilDiagnosa' element={<HasilDiagnosa/>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;