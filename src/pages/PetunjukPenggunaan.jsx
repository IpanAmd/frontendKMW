import style from "./petunjukpenggunaan.module.css"
import {Container, Button} from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function PetunjukPenggunaan () {
    return (
        <>
            <Header />

            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>

                <Container className={style.container}>

                    <section className={style.section}>
                        <h3>PETUNJUK PENGGUNAAN</h3>
                    </section>

                    <main className={style.list}>
                        <ol class="list-group-numbered">
                            <li class="list-group-item" bgTransparent>Masuk Halaman Utama</li>
                            <li class="list-group-item" bgTransparent>Baca petunjuk penggunaan dengan meng-klik tombol "petunjuk penggunaan"</li>
                            <li class="list-group-item" bgTransparent>Lakukan diagnosa dengan meng-klik tombol "mulai diagnosa"</li>
                            <li class="list-group-item" bgTransparent>Isi form registrasi user sebelum melanjutkan ke halaman diagnosa</li>
                            <li class="list-group-item" bgTransparent>Klik tombol "simpan dan mulai" untuk menyimpan data registrasi dan melakukan proses diagnosa</li>
                            <li class="list-group-item" bgTransparent>Pilih gejala kerusakan yang sesuai dan pilih tingkat keyakinan terhadap gejala kerusakan yang dialami</li>
                            <li class="list-group-item" bgTransparent>Klik tombol lanjut untuk terus melakukan diagnosa dan melihat hasil diagnosa</li>
                            <li class="list-group-item" bgTransparent>Hasil diagnosa akan muncul setelah anda menyelesaikan proses diagnosa</li>
                            <li class="list-group-item" bgTransparent>Klik tombol "selesai"</li>
                        </ol>
                    </main>

                    <div className={style.button}>
                        <Button variant="warning" href="/" className="mx-3">KEMBALI</Button>
                        <Button variant="danger" href="/Pendaftaran" className="mx-3">MULAI DIAGNOSA</Button>
                    </div>
                    
                </Container>

            </Container>


            <Footer />
        </>
    )
}

export default PetunjukPenggunaan;