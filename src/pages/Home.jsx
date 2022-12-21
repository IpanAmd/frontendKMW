import style from "./home.module.css";
import {Container, Button} from "react-bootstrap";
import {Header, Footer} from "../components";
import background from "../asset/bg1.png";

function Home() {
    return (
        <>
            {/* Start Header */}
            <Header/>
            {/* End Header */}

            {/* Start container */}
            <Container fluid className={style.containerFluid} style={{backgroundImage: `url(${background})`}}>
            
                <Container className={style.container}>
                    <section className={style.section}>
                        <h1>KMW AUTOWORKS</h1>
                        <p>Jl H Domang No.12, Kebon Jeruk, Jakarta Barat</p>  
                    </section>

                    <div className={style.line}></div>
                    
                    <article className={style.article}>
                        <p>Bengkel KMW Autoworks adalah bengkel mobil yang berada di daerah Kebon Jeruk, Jakarta Barat. Bengkel KMW Autoworks bisa memperbaiki berbagai kerusakan pada semua jenis mobil baik mobil pabrikan Jepang maupun Eropa.</p>
                        <p>Sistem ini dibuat untuk mempermudah dalam proses diagnosa kerusakan pada mobil jenis Toyota Innova, baik digunakan oleh montir atau bisa juga digunakan untuk pemilik mobil yang awam mengenai masalah kerusakan mesin mobil terutama pada sistem Electronic Fuel Injection (EFI), dengan melakukan penalaran kerusakan sesuai prosedur yang dilakukan oleh montir-montir profesional serta telah diuji fungsi langsung oleh kepala montir yang ada di Bengkel KMW Autoworks.</p>
                        <p>
                        Sistem Electronic Fuel Injection (EFI) adalah suatu sistem pambagian dan pengaturan tekanan bahan bakar pada kendaraan dengan menggunakan sistem elektronik sehingga konsumsi bahan bakar lebih optimal dan dapat mengefisienkan emisi gas buang. 
                        </p>
                    </article>

                    <div className={style.button}>
                        <Button variant="warning" href="/PetunjukPenggunaan" className="mx-3">PETUNJUK PENGGUNAAN</Button>
                        <Button variant="danger" href="/Pendaftaran" className="mx-3">MULAI DIAGNOSA</Button>
                    </div>
                </Container>
                
            </Container>

            {/* End container */}

            {/* Start Footer */}
            <Footer />
            {/* End Footer */}
        </>
    )
}

export default Home;