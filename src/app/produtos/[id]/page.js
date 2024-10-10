'use client'

import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore";
import Pagina from "@/app/components/Pagina";
import { Row, Col, Button, Card } from "react-bootstrap";
import Link from "next/link";

export default function Page({ params }) {
    const [produto, setProduto] = useState({});
    const [produtosRelacionados, setProdutosRelacionados] = useState([]);

    const traducoes = {
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "men's clothing": "Roupas Masculinas",
        "women's clothing": "Roupas Femininas"
    };

    useEffect(() => {
        apiStore.get(`/products/${params.id}`).then(resultado => {
            setProduto(resultado.data);
            // Buscando produtos da mesma categoria
            return apiStore.get(`/products/category/${resultado.data.category}`);
        }).then(resultado => {
            setProdutosRelacionados(resultado.data);
        });
    }, [params.id]);

    return (
        <Pagina>
            <Row>
                <Col md={4}>
                    <img
                        src={produto.image}
                        alt={produto.title}
                        style={{ width: '90%', height: '400px' }}
                    />
                </Col>
                <Col md={8}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {produto.title ? produto.title.split(' ').slice(0, 3).join(' ') : 'Produto Indisponível'}
                    </h1>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {traducoes[produto.category] || produto.category}
                    </h2>
                    <p style={{ fontSize: '1.25rem', margin: '10px 0' }}>
                        {produto.description}
                    </p>

                    <div style={{ fontSize: '1.5rem', margin: '10px 0' }}>
                        <span style={{ color: 'black' }}><b>Avaliação: </b></span>
                        <span style={{ color: '#FFD700' }}>★★★★★</span>
                    </div>
                    <div style={{ fontSize: '1.5rem' }}>
                        <div>
                            <span style={{ color: 'black' }}><b>Preço: </b></span>
                            <span style={{ color: 'green' }}> R$ {((produto.price * 0.8).toFixed(2))}</span>
                        </div>
                        <div style={{ color: 'black', textDecoration: 'line-through' }}>
                            {produto.price !== undefined ? `R$ ${produto.price.toFixed(2)}` : 'Preço original não disponível'}
                        </div>
                        <button
                            style={{
                                marginTop: '20px',
                                padding: '10px 15px',
                                fontSize: '1rem',
                                backgroundColor: '#003366',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                alert('Produto adicionado ao carrinho!');
                            }}
                        >
                            Comprar
                        </button>
                    </div>
                </Col>
            </Row>

            <div style={{ width: '100%', textAlign: 'center' }}>
                <hr style={{ border: '1px solid #003366', margin: '20px' }} />
                <h2 style={{ margin: '10px 0' }}>Produtos Relacionados</h2>
                <hr style={{ border: '1px solid #003366', margin: '0' }} />
            </div>
            <Row style={{ marginTop: '20px' }}> {/* Adicionando margem superior aqui */}
                {produtosRelacionados.map(relacionado => (
                    <Col md={3} key={relacionado.id}>
                        <Card style={{ border: '3px solid #003366' }} className="card-custom">
                            <Card.Img
                                style={{ margin: '25px auto', width: '90%' }}
                                height="230"
                                variant="top"
                                src={relacionado.image}
                            />
                            <Card.Body style={{ height: '175px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Card.Title style={{ margin: '0', textAlign: 'center' }}>
                                    {relacionado.title.split(' ').slice(0, 3).join(' ')}
                                </Card.Title>
                                <Card.Text>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ color: '#FFD700' }}>★★★★★</span>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ marginBottom: '5px', color: '#28a745' }}>
                                            20% OFF
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                                            <div style={{ fontWeight: 'bold', color: 'green' }}>
                                                ${((relacionado.price * 0.8).toFixed(2))}
                                            </div>
                                            <div style={{ color: 'black', textDecoration: 'line-through', marginLeft: '10px' }}>
                                                ${relacionado.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                                <Link href={`/produtos/${relacionado.id}`}>
                                    <Button variant="primary" style={{ margin: '0 auto', width: '100%' }}>
                                        Ver detalhes
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
