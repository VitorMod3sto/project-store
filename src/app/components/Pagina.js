import apiStore from "@/services/apiStore";
import { useEffect, useState } from "react";
import { Button, Col, Form, Container, Dropdown, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { BiLogoVuejs } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import Footer from "./Footer";

export default function Pagina(props) {
    const [categoria, setCategoria] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggle = () => setShowDropdown(prev => !prev);
    const handleClose = () => setShowDropdown(false);

    const traducoes = {
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "men's clothing": "Roupas Masculinas",
        "women's clothing": "Roupas Femininas"
    };

    useEffect(() => {
        apiStore.get(`/products/categories`).then(resultado => {
            setCategoria(resultado.data);
        });
    }, []);

    return (
        <>
            <Navbar style={{ backgroundColor: '#003366' }} variant="dark">
                <Container>
                    <Navbar.Brand href="/home"> <BiLogoVuejs /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home" style={{ color: '#ffffff' }}>Início</Nav.Link>
                            <Nav.Link href="/produtos" style={{ color: '#ffffff' }}>Produtos</Nav.Link>
                            <NavDropdown title={<span style={{ color: '#ffffff' }}>Categorias</span>} id="basic-nav-dropdown">
                                {categoria.map(categoria => (
                                    <div key={categoria.id}>
                                        <NavDropdown.Item
                                            href={`/categorias/${categoria}`} style={{ color: '#333333' }}>
                                            {traducoes[categoria]}
                                            <Dropdown.Divider />
                                        </NavDropdown.Item>
                                    </div>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            <Dropdown show={showDropdown} onToggle={handleToggle}>
                                <Dropdown.Toggle
                                    as={Nav.Link}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center', // Ensures horizontal centering
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        marginLeft: '10px',
                                        marginTop: '15px',
                                        position: 'relative', // Creates a new stacking context for vertical centering
                                    }}
                                >
                                    {/* Center the icon vertically and horizontally within the button */}
                                    <IoPerson
                                        style={{
                                            color: '#003366',
                                            position: 'absolute', // Place the icon absolutely within the button
                                            top: '50%', // Center vertically
                                            left: '50%', // Center horizontally
                                            transform: 'translate(-50%, -50%)', // Account for icon size (optional)
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item
                                        onClick={handleClose}
                                        href="/clientes/login/form"
                                        style={{ color: '#003366' }} // Cor azul escura
                                    >
                                        <b>Login</b>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={handleClose}
                                        href="/clientes/cadastro/form"
                                        style={{ color: '#003366' }} // Cor azul escura
                                    >
                                        <b>Cadastre-se</b>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container style={{ backgroundColor: '#003366', padding: '10px 0' }} fluid>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} className="d-flex">
                        <Form className="flex-grow-1 d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Procure um produto"
                                className="me-2"
                                style={{ width: '100%' }}
                            />
                            <Button type="submit">Pesquisar</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container className="my-3">
                {props.children}
            </Container>
            <Footer />
        </>
    );
}
