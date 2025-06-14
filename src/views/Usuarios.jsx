// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../components/usuarios/TablaUsuarios';
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario';
import ModalEdicionUsuario from '../components/usuarios/ModalEdicionUsuario';
import ModalEliminacionUsuario from '../components/usuarios/ModalEliminacionUsuario';
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

  const [mostrarModal, setMostrarModal] = useState(false);
   const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '', contraseña: ''
  });

  //Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 3; // Número de elementos por página

  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  
  //Edición
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerUsuarios();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez

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

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaUsuarios.filter(
      (usuario) =>
        usuario.usuario.toLowerCase().includes(texto) ||
        usuario.contraseña.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };

      // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo la inserción de una nueva categoría
  const agregarUsuario = async () => {

    if (!nuevoUsuario.usuario || !nuevoUsuario.contraseña) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarusuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el usuario');
      }

      await obtenerUsuarios(); // Refresca toda la lista desde el servidor
      setNuevoUsuario({ usuario: '', contraseña: ''});
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  // Calcular elementos paginados
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarUsuario = async () => {
    if (!usuarioAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarusuario/${usuarioAEliminar.id_usuario}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      await obtenerUsuarios(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setUsuarioAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (usuari) => {
    setUsuarioAEliminar(usuari);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarUsuario = async () => {
    if (!usuarioEditado?.usuario || !usuarioEditado?.contraseña)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarusuario/${usuarioEditado.id_usuario}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: usuarioEditado.usuario,
          contraseña: usuarioEditado.contraseña,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      await obtenerUsuarios();
      setMostrarModalEdicion(false);
      setUsuarioEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (usuari) => {
    setUsuarioEditado(usuari);
    setMostrarModalEdicion(true);
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Usuarios</h4>
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
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
          usuarios={usuariosPaginados} 
          cargando={cargando} 
          error={errorCarga}
          totalElementos={listaUsuarios.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

        <ModalRegistroUsuario
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoUsuario={nuevoUsuario}
          manejarCambioInput={manejarCambioInput}
          agregarUsuario={agregarUsuario}
          errorCarga={errorCarga}
        />

        <ModalEliminacionUsuario
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarUsuario={eliminarUsuario}
        />

        <ModalEdicionUsuario
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          usuarioEditado={usuarioEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarUsuario={actualizarUsuario}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Usuarios;