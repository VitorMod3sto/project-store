'use client'

import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore"; // Certifique-se de que este é o caminho correto para sua API
import Pagina from "@/app/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";
import Link from "next/link";


export default function Page({ params }) {
    const [produtos, setProdutos] = useState([]);

    const traducoes = {
        electronics: "Eletrônicos",
        jewelery: "Joias",
        "men's%20clothing": "Roupas Masculinas",
        "women's%20clothing": "Roupas Femininas"
    };
    const categoriaNome = traducoes[params.categoria] || params.categoria; 

    useEffect(() => {

        apiStore.get(`/products/category/${params.categoria}`).then(resultado => {
            setProdutos(resultado.data)
        })

    }, []);

    return (
        <Pagina>
            <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>{categoriaNome}</h1> 
            <Row>
                {produtos.map(produto => (
                    <Col md={3} key={produto.id} className="my-2">
                        <Card style={{ border: '3px solid #003366', margin: '10px', width: '100%' }}>
                            <Card.Img
                                style={{ margin: '20px auto', width: '90%' }}
                                height="250"
                                variant="top"
                                src={produto.image}
                            />
                            <Card.Body style={{ height: '175px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Card.Title style={{ margin: '0', textAlign: 'center' }}>
                                    {produto.title.split(' ').slice(0, 3).join(' ')}
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
                                                ${((produto.price * 0.8).toFixed(2))}
                                            </div>
                                            <div style={{ color: 'black', textDecoration: 'line-through', marginLeft: '10px' }}>
                                                ${produto.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                                <Link href={`/produtos/${produto.id}`}>
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
