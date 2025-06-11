// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaEmpleados from '../components/empleados/TablaEmpleados.jsx'; // Ajustado para empleados
import ModalRegistroEmpleado from '../components/empleados/ModalRegistroEmpleado.jsx'; // Ajustado para empleados
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas.jsx';
import ModalEliminacionEmpleado from '../components/empleados/ModalEliminacionEmpleado.jsx';
import ModalEdicionEmpleado from '../components/empleados/ModalEdicionEmpleado.jsx';
import { Container, Button, Row, Col } from "react-bootstrap";

// Declaración del componente Empleados
const Empleados = () => {
  // Estados para manejar los datos, carga y errores
  const [listaEmpleados, setListaEmpleados] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);          // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);      // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    cargo: '',
    fecha_contratacion: new Date()
  });
  
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página

  //Eliminación
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [empleadoAEliminar, setEmpleadoAEliminar] = useState(null);
  
  //Edición
  const [empleadoEditado, setEmpleadoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  
  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerempleados'); // Ajusta la ruta API
      if (!respuesta.ok) {
        throw new Error('Error al cargar los empleados');
      }
      const datos = await respuesta.json();
      setListaEmpleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  }; 

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerEmpleados();
  }, []); 

  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };                          

  // Manejo la inserción de un nuevo empleado
  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_apellido || !nuevoEmpleado.segundo_nombre || !nuevoEmpleado.segundo_apellido || !nuevoEmpleado.celular || !nuevoEmpleado.cargo || !nuevoEmpleado.fecha_contratacion) {
      setErrorCarga("Por favor, completa los campos obligatorios (primer nombre, primer apellido, celular, cargo y fecha).");
      return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarempleado', { // Ajusta la ruta API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEmpleado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el empleado');
      }

      await obtenerEmpleados(); // Refresca la lista desde el servidor
      setNuevoEmpleado({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        cargo: '',
        fecha_contratacion: new Date()
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    establecerPaginaActual(1);
    
    const filtrados = listaEmpleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        (empleado.segundo_nombre && empleado.segundo_nombre.toLowerCase().includes(texto)) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        (empleado.segundo_apellido && empleado.segundo_apellido.toLowerCase().includes(texto)) ||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto)
    );
    setEmpleadosFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const empleadosPaginados = empleadosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarEmpleado = async () => {
    if (!empleadoAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarempleado/${empleadoAEliminar.id_empleado}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el empleado');
      }

      await obtenerEmpleados(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setEmpleadoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (empleado) => {
    setEmpleadoAEliminar(empleado);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setEmpleadoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarEmpleado = async () => {
    if (!empleadoEditado?.primer_nombre || !empleadoEditado?.segundo_nombre ||
        !empleadoEditado?.primer_apellido || !empleadoEditado?.segundo_apellido ||
        !empleadoEditado?.celular ||
        !empleadoEditado?.cargo || !empleadoEditado?.fecha_contratacion)
        {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
        
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarempleado/${empleadoEditado.id_empleado}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primer_nombre: empleadoEditado.primer_nombre,
          segundo_nombre: empleadoEditado.segundo_nombre,
          primer_apellido: empleadoEditado.primer_apellido,
          segundo_apellido: empleadoEditado.segundo_apellido,
          celular: empleadoEditado.celular,
          cargo: empleadoEditado.cargo,
          fecha_contratacion: empleadoEditado.fecha_contratacion,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el empleado');
      }

      await obtenerEmpleados();
      setMostrarModalEdicion(false);
      setEmpleadoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditado(empleado);
    setMostrarModalEdicion(true);
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Empleados</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button 
              variant="primary"
              onClick={() => setMostrarModal(true)}
              style={{width: "100%"}}
            >
              Nuevo Empleado
            </Button>
          </Col>
          
          <Col lg={6} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row> 

        <br/>

        <TablaEmpleados 
          empleados={empleadosPaginados} 
          cargando={cargando} 
          error={errorCarga}   
          totalElementos={listaEmpleados.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

        <ModalRegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
          errorCarga={errorCarga}
        />

        <ModalEliminacionEmpleado
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarEmpleado={eliminarEmpleado}
        />

        <ModalEdicionEmpleado
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          empleadoEditado={empleadoEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarEmpleado={actualizarEmpleado}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Empleados;