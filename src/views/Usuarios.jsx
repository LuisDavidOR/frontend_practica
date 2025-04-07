// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuarios/TablaUsuarios';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Row, Col, Button } from "react-bootstrap";

// Declaración del componente Usuarios
const Usuarios = () => {
  // Estados para manejar los datos, carga y errores
  const [listaUsuarios, setListaUsuarios] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    const obtenerUsuarios = async () => { // Método renombrado a español
      try {
        const respuesta = await fetch('http://127.0.0.1:3000/api/usuarios');
        if (!respuesta.ok) {
          throw new Error('Error al cargar los usuarios');
        }
        const datos = await respuesta.json();
        setListaUsuarios(datos);    // Actualiza el estado con los datos
        setUsuariosFiltrados(datos);
        setCargando(false);           // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);           // Termina la carga aunque haya error
      }
    };
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtrados = listaUsuarios.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contraseña.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Usuarios</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" style={{ width: "100%" }}>
              Nuevo Usuario
            </Button>
          </Col>

          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        {/* Pasa los estados como props al componente TablaClientess */}
        <TablaUsuarios 
          usuarios={usuariosFiltrados} 
          cargando={cargando} 
          error={errorCarga} 
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Usuarios;