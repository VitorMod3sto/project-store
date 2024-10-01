'use client'

import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import Pagina from "../components/Pagina";
import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore";
import Link from "next/link";

export default function Page() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const traducoes = {
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "men's clothing": "Roupas Masculinas",
        "women's clothing": "Roupas Femininas"
    };

    useEffect(() => {
        apiStore.get(`/products`).then(resultado => {
            setProdutos(resultado.data);
            const categoriasUnicas = [...new Set(resultado.data.map(produto => produto.category))];
            setCategorias(categoriasUnicas);
        });
    }, []);

    // Obter uma imagem representativa para cada categoria
    const imagensCategorias = categorias.map(categoria => {
        const produto = produtos.find(prod => prod.category === categoria);
        return { categoria, imagem: produto ? produto.image : '' };
    });

    return (
        <Pagina>
            <Carousel data-bs-theme="dark" style={{ marginBottom: '10px' }}>
                {produtos.filter(produto => [7, 2, 14].includes(produto.id)).map(produto => (
                    <Carousel.Item key={produto.id} interval={1000}>
                        <div style={{ border: '3px solid #003366', padding: '30px' }}>
                            <Link href={`/produtos/${produto.id}`}>
                                <img
                                    src={produto.image}
                                    alt={produto.title}
                                    style={{
                                        objectFit: 'contain',
                                        height: '400px',
                                        width: '100%',
                                    }}
                                />
                            </Link>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <hr style={{ border: '1px solid #003366', margin: '0' }} />
                <h2 style={{ margin: '10px 0' }}>Mais produtos</h2>
                <hr style={{ border: '1px solid #003366', margin: '0' }} />
            </div>

            <Row md={4}>
                {produtos.filter(produto => [4, 6, 17, 13].includes(produto.id)).map(produto => (
                    <Col key={produto.id} className="my-2">
                        <Card style={{ border: '3px solid #003366' }} className="card-custom">
                            <Card.Img
                                style={{ margin: '25px auto', width: '90%' }}
                                height="230"
                                variant="top"
                                src={produto.image}
                            />
                            <Card.Body style={{ height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Card.Title style={{ margin: '0', textAlign: 'center' }}>
                                    {produto.title.split(' ').slice(0, 3).join(' ')}
                                </Card.Title>
                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ color: '#FFD700' }}>★★★★★</span>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ marginBottom: '5px', color: '#28a745' }}>
                                        20% OFF
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                                        <div style={{ fontWeight: 'bold', color: 'green' }}>
                                            ${((produto.price * 0.8).toFixed(2))}
                                        </div>
                                        <div style={{ color: '#A9A9A9', textDecoration: 'line-through', marginLeft: '10px' }}>
                                            ${produto.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <Link href={`/produtos/${produto.id}`}>
                                    <Button variant="primary" style={{ margin: '0 auto', width: '100%' }}>
                                        Comprar
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Nova seção para categorias */}
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <hr style={{ border: '1px solid #003366', margin: '0' }} />
                <h2 style={{ margin: '10px 0' }}>Categorias</h2>
                <hr style={{ border: '1px solid #003366', margin: '0' }} />
            </div>

            <Row md={4}>
                {imagensCategorias.map(({ categoria, imagem }, index) => (
                    <Col key={index} className="my-2">
                        <Card style={{ border: '3px solid #003366', height: '100%' }} className="card-custom">
                            <Card.Img
                                style={{ margin: '25px auto', width: '90%' }}
                                height="230"
                                variant="top"
                                src={imagem} // Use a imagem da categoria aqui
                            />
                            <Card.Body style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Card.Title>{traducoes[categoria] || categoria}</Card.Title> {/* Exibe o nome da categoria traduzido */}
                                <Link href={`/categorias/${categoria}`}>
                                    <Button variant="primary" style={{ margin: '0 auto', width: '100%', marginTop: '10px' }}>
                                        Ver produtos
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
