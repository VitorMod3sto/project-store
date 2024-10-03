import { Container, Row, Col } from "react-bootstrap";
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";


export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#003366', color: '#ffffff', padding: '20px 0' }}>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={4} className="text-center text-md-start">
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>Vstore</p>
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>
                        Copyright <FaRegCopyright /> 2024 Vstore. <br/>
                         Todos os direitos reservados.
                        </p>
                    </Col>
                    <Col xs={12} md={4} className="text-center">
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>Categorias</p>
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>Produtos</p>
                    </Col>
                    <Col xs={12} md={4} className="text-center text-md-end">
                        <a href="https://facebook.com" style={{ color: '#ffffff', margin: '0 10px', fontSize: '24px' }}>
                            <CiFacebook />
                        </a>
                        <a href="https://instagram.com" style={{ color: '#ffffff', margin: '0 10px', fontSize: '24px' }}>
                            <IoLogoInstagram />
                        </a>
                        <a href="https://tiktok.com" style={{ color: '#ffffff', margin: '0 10px', fontSize: '24px' }}>
                            <FaTiktok />
                        </a>
                    </Col>

                </Row>
            </Container>
        </footer>
    );
}

