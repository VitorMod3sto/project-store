'use client';

import { Button, Card, Col, Row, Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore";
import Pagina from "@/app/components/Pagina";
import Link from "next/link";

export default function Page() {
    const [produtosPorCategoria, setProdutosPorCategoria] = useState({});
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 8; // Defina quantos produtos exibir por página

    const traducoes = {
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "men's clothing": "Roupas Masculinas",
        "women's clothing": "Roupas Femininas"
    };

    useEffect(() => {
        apiStore.get('/products').then(resultado => {
            const produtos = resultado.data;
            const categorias = produtos.reduce((acc, produto) => {
                const categoria = produto.category;
                if (!acc[categoria]) {
                    acc[categoria] = [];
                }
                acc[categoria].push(produto);
                return acc;
            }, {});
            setProdutosPorCategoria(categorias);
        });
    }, []);

    const categorias = Object.keys(produtosPorCategoria);
    const produtosFiltrados = categoriaSelecionada ? produtosPorCategoria[categoriaSelecionada] : Object.values(produtosPorCategoria).flat();

    const totalProdutos = produtosFiltrados.length;
    const totalPaginas = Math.ceil(totalProdutos / produtosPorPagina);

    // Calcule os produtos a serem exibidos com base na página atual
    const produtosParaExibir = produtosFiltrados.slice((paginaAtual - 1) * produtosPorPagina, paginaAtual * produtosPorPagina);

    return (
        <Pagina>
            <Navbar
                style={{
                    backgroundColor: '#003366',
                    borderRadius: '10px',
                    padding: '0'
                }}
                variant="dark"
            >
                <Nav className="me-auto">
                    {categorias.map(categoria => (
                        <Nav.Link
                            key={categoria}
                            onClick={() => {
                                setCategoriaSelecionada(categoria);
                                setPaginaAtual(1); // Resetar a página para 1 ao mudar a categoria
                            }}
                            style={{
                                color: categoriaSelecionada === categoria ? '#003366' : 'white',
                                backgroundColor: categoriaSelecionada === categoria ? 'white' : 'transparent',
                                cursor: 'pointer',
                                padding: '10px 15px',
                                borderRadius: '5px',
                                margin: '0.5rem 5px 0 5px',
                                lineHeight: '1.5',
                                border: categoriaSelecionada === categoria ? 'none' : '1px solid transparent',
                            }}
                        >
                            {traducoes[categoria]}
                        </Nav.Link>
                    ))}
                    <Nav.Link
                        onClick={() => {
                            setCategoriaSelecionada(null);
                            setPaginaAtual(1); // Resetar a página para 1 ao selecionar "Todos"
                        }}
                        style={{
                            color: categoriaSelecionada === null ? '#003366' : 'white',
                            backgroundColor: categoriaSelecionada === null ? 'white' : 'transparent',
                            cursor: 'pointer',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            margin: '0.5rem 5px 0 5px',
                            lineHeight: '1.5',
                            border: categoriaSelecionada === null ? 'none' : '1px solid transparent',
                        }}
                    >
                        Todos
                    </Nav.Link>
                </Nav>
            </Navbar>

            <Row>
                {produtosParaExibir.map(produto => (
                    <Col md={3} key={produto.id} className="my-2">
                        <Card style={{ border: '3px solid #003366' }} className="card-custom">
                            <Card.Img
                                style={{ margin: '25px auto', width: '90%' }}
                                height="230"
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

            {categoriaSelecionada === null && totalPaginas > 1 && (
                <div className="text-center my-3">
                    <div>
                        {Array.from({ length: totalPaginas }, (_, index) => (
                            <Button
                                key={index}
                                onClick={() => setPaginaAtual(index + 1)}
                                style={{
                                    margin: '0 5px',
                                    backgroundColor: paginaAtual === index + 1 ? 'white' : '#003366',
                                    color: paginaAtual === index + 1 ? '#003366' : 'white',
                                    border: `2px solid ${paginaAtual === index + 1 ? '#003366' : 'transparent'}`
                                }}
                            >
                                Página {index + 1}
                            </Button>
                        ))}
                    </div>
                    <div className="my-2">
                        <Button
                            onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
                            disabled={paginaAtual === 1}
                            style={{ backgroundColor: '#003366', color: 'white', border: 'none', margin: '0 5px' }}
                        >
                            Voltar
                        </Button>
                        <Button
                            onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
                            disabled={paginaAtual === totalPaginas}
                            style={{ backgroundColor: '#003366', color: 'white', border: 'none', margin: '0 5px' }}
                        >
                            Próximo
                        </Button>
                    </div>
                </div>
            )}
        </Pagina>
    );
}
