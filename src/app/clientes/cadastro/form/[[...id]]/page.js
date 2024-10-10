'use client';

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();
    const [message, setMessage] = useState('');

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const dados = clientes.find(item => item.id == params.id);
    const cliente = dados || { nome: '', dataNascimento: '', cpf: '', celular: '', email: '', endereco: '' };

    function salvar(dados) {
        if (cliente.id) {
            Object.assign(cliente, dados);
        } else {
            dados.id = v4();
            clientes.push(dados);
        }
        localStorage.setItem('clientes', JSON.stringify(clientes));
        setMessage('Cadastro realizado com sucesso, seja bem-vindo! :)'); // Set the success message
        setTimeout(() => {
            route.push('/home');
        }, 2000); // Redirect after 2 seconds
    }

    return (
        <Pagina titulo="Cadastro de Clientes">
            {message && <Alert variant="success">{message}</Alert>} {/* Show the success message */}
            <Formik
                initialValues={cliente}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataNascimento"
                                value={values.dataNascimento}
                                onChange={handleChange('dataNascimento')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={values.cpf}
                                onChange={handleChange('cpf')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="celular">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="celular"
                                value={values.celular}
                                onChange={handleChange('celular')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange('email')}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="endereco">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                name="endereco"
                                value={values.endereco}
                                onChange={handleChange('endereco')}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                Salvar <FaCheck />
                            </Button>
                            <Link href="/home" className="btn btn-danger ms-3">
                                <IoIosArrowRoundBack /> Início
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
