import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Portada from "../assets/portada.jpg"
import Proposito from "../components/inicio/Proposito";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  const servicios = () => {
    navegar("/servicios");
  };

  return (
    <Container>
      <h1>¡Bienvenido, {nombreUsuario}!</h1>
      <Image src={Portada} fluid rounded />
      <Proposito />
    </Container>
  );
};

export default Inicio;