'use client'

import Pagina from "@/app/components/Pagina";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaTrashAlt, FaPen, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        setClientes(JSON.parse(localStorage.getItem('clientes')) || []);
    }, []);

    function excluir(id) {
        if (confirm('Deseja realmente excluir?')) {
            const dados = clientes.filter(item => item.id !== id);
            localStorage.setItem('clientes', JSON.stringify(dados));
            setClientes(dados);
        }
    }

    return (
        <Pagina titulo="Clientes">

            <div className="d-flex justify-content-start mb-3">
                <Link href="/clientes/cadastro/form" className="btn btn-dark me-2"><FaPlus /></Link>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Opções</th>
                        <th>Nome</th>
                        <th>Celular</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Link href={`/clientes/cadastro/form/${item.id}`}>
                                    <FaPen 
                                        title='Editar' 
                                        className="ms-2 me-2 text-primary" 
                                    />
                                </Link>
                                <FaTrashAlt
                                    title='Excluir' 
                                    className="text-danger"
                                    onClick={() => excluir(item.id)} 
                                />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.celular}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    );
}
