import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home, Login, Gejala, Kerusakan, BasisPengetahuan, PetunjukPenggunaan, Pendaftaran, Diagnosa, HasilDiagnosa, } from './pages';
import ProtectedToken from './auth/ProtectedToken';

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="login" element={<Login/>} />
              <Route path="gejala" element={
                  <ProtectedToken>
                      <Gejala/>
                  </ProtectedToken>
              } />
              <Route path="kerusakan" element={
                  <ProtectedToken>
                      <Kerusakan/>
                  </ProtectedToken>
              }/>
              <Route path="basisPengetahuan" element={
                    <ProtectedToken>
                      <BasisPengetahuan/>
                    </ProtectedToken>
              } />
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