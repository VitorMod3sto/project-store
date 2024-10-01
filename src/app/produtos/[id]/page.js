'use client'

import { Button, Card, Carousel, Col, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import apiStore from "@/services/apiStore";
import Link from "next/link";
import Pagina from "@/app/components/Pagina";


export default function Page({params}) {

    const [produto, setproduto] = useState({})

    useEffect(() => {
        apiStore.get(`/products/${params.id}`).then(resultado => {
            setproduto(resultado.data)
        })

    }, [])
 


    return (
        <Pagina>
            
        </Pagina>
    )
}