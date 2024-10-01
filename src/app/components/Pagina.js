import apiStore from "@/services/apiStore";
import { useEffect, useState } from "react";
import { Button, Col, Form, Container, Dropdown, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { BiLogoVuejs } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";



export default function Pagina(props) {
    const [categoria, setCategoria] = useState([])

    const traducoes = {
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "men's clothing": "Roupas Masculinas",
        "women's clothing": "Roupas Femininas"
    };

    useEffect(() => {
        apiStore.get(`/products/categories`).then(resultado => {
            setCategoria(resultado.data)
        })


    }, [])
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
                                            href="/products/categories" style={{ color: '#333333' }}> {traducoes[categoria]}
                                            <Dropdown.Divider />
                                        </NavDropdown.Item>
                                    </div>
                                ))}
                            </NavDropdown>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link href="/produtos" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'white', marginLeft: '10px', marginTop: '15px' }}>
                                <IoPerson style={{ color: '#003366' }} />
                            </Nav.Link>
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
        </>
    )
}