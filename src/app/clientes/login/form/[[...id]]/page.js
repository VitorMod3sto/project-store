'use client';

import Pagina from "@/app/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoPerson } from "react-icons/io5";


export default function Page({ params }) {
    const route = useRouter();
    const [message, setMessage] = useState('');

    function handleLogin(values) {
        // Aqui você pode adicionar lógica de validação
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const usuario = clientes.find(cliente => cliente.email === values.email && cliente.cpf === values.cpf);

        if (usuario) {
            setMessage('Login realizado com sucesso! Bem-vindo(a)!');
            setTimeout(() => {
                route.push('/home'); // Redireciona após 2 segundos
            }, 2000);
        } else {
            setMessage('Usuário ou senha inválidos.');
        }
    }

    return (
        <Pagina titulo="Login">
            {message && <Alert variant="success">{message}</Alert>}
            <Formik
                initialValues={{ email: '', cpf: '' }}
                onSubmit={handleLogin}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpf"
                                value={values.cpf}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="primary">
                                Login <FaSignInAlt />
                            </Button>
                            <Link href="/clientes/cadastro/form" className="btn btn-danger ms-3">
                                <IoPerson
                                /> Cadastre-se
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
