'use client'

import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import Pagina from "../components/Pagina";
import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore";


export default function Page() {

    const [produto, setproduto] = useState([])

    useEffect(() => {
        apiStore.get(`/products`).then(resultado => {
            setproduto(resultado.data)
        })

    }, [])
    const produtosCarrousel = produto.filter(produto => [7, 2, 14].includes(produto.id));
    const produtosCard = produto.filter(produto => [4, 6, 17, 13].includes(produto.id));


    return (
        <Pagina>
    <Carousel data-bs-theme="dark" style={{ marginBottom: '10px' }}>
        {produtosCarrousel.map(produto => (
            <Carousel.Item key={produto.id} interval={1000}>
                <div style={{ border: '3px solid #003366', padding: '30px' }}>
                    <img
                        src={produto.image}
                        alt={produto.title}
                        style={{
                            objectFit: 'contain',
                            height: '400px',
                            width: '100%',
                        }}
                    />
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
    {produtosCard.map(produto => (
        <Col key={produto.id} className="my-2">
            <Card style={{ border: '3px solid #003366' }} className="card-custom">
                <Card.Img
                    style={{ margin: '25px auto', width: '90%' }} // Ajuste a largura se necessário
                    height="230"
                    variant="top"
                    src={produto.image}
                />
                <Card.Body style={{ height: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}> {/* Alinhamento para baixo */}
                    <Card.Title style={{ margin: '0', textAlign: 'center' }}>
                        {produto.title.split(' ').slice(0, 3).join(' ')} {/* Limitar a 3 palavras */}
                    </Card.Title>
                    <Button 
                        variant="primary" 
                        style={{ margin: '0 auto', width: '100%' }} // Centraliza o botão
                    >
                        ${produto.price.toFixed(2)} {/* Exibir o preço como texto do botão */}
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>
</Pagina>
    )
}