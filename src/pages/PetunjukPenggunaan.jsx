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
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</li>
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
                            <li class="list-group-item" bgTransparent>Lorem ipsum dolor, sit amet consectetur adipisicing.</li>
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