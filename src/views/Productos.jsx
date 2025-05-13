import React, { useState, useEffect } from 'react';
import TablaProductos from '../components/productos/TablaProductos'; // Asumiendo que tienes este componente
import ModalRegistroProducto from '../components/productos/ModalRegistroProducto'; // Asumiendo que tienes este componente
import ModalEliminacionProducto from '../components/productos/ModalEliminacionProducto';
import ModalEdicionProducto from '../components/productos/ModalEdicionProducto';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import { Container, Button, Row, Col } from "react-bootstrap";

const Productos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: '',
    descripcion_producto: '',
    id_categoria: '',
    precio_unitario: '',
    stock: '',
    imagen: ''
  });

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4; // Número de elementos por página

  const [productoEditado, setProductoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);


  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/obtenerproductos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Obtener categorías para el dropdown
  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerProductos();
    obtenerCategorias();
  }, []);

  useEffect(() => {
    const filtrados = listaProductos.filter((producto) =>
      producto.nombre_producto.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  }, [textoBusqueda, listaProductos]);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto || !nuevoProducto.id_categoria || 
        !nuevoProducto.precio_unitario || !nuevoProducto.stock) {
      setErrorCarga("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      await obtenerProductos();
      setNuevoProducto({
        nombre_producto: '',
        descripcion_producto: '',
        id_categoria: '',
        precio_unitario: '',
        stock: '',
        imagen: ''
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
    
  const filtrados = listaProductos.filter(
    (producto) =>
      producto.nombre_producto.toLowerCase().includes(texto) ||
      producto.descripcion_producto.toLowerCase().includes(texto) ||
      producto.id_categoria.toLowerCase().includes(texto)
  );
  setProductosFiltrados(filtrados);
  };

  // Calcular elementos paginados
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/eliminarproducto/${productoAEliminar.id_producto}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await obtenerProductos(); // Refresca la lista
      setMostrarModalEliminacion(false);
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarProducto = async () => {
    if (!productoEditado?.nombre_producto || !productoEditado?.descripcion_producto ||
      !productoEditado?.id_categoria || !productoEditado?.precio_unitario ||
      !productoEditado?.stock || !productoEditado?.imagen
    ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://127.0.0.1:3000/api/actualizarproducto/${productoEditado.id_producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_producto: productoEditado.nombre_producto,
          descripcion_producto: productoEditado.descripcion_producto,
          id_categoria: productoEditado.id_categoria,
          precio_unitario: productoEditado.precio_unitario,
          stock: productoEditado.stock,
          imagen: productoEditado.imagen,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar producto');
      }

      await obtenerProductos();
      setMostrarModalEdicion(false);
      setProductoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };



  return (
    <Container className="mt-5">
      <br />
      <h4>Productos</h4>

      <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nueva Categoría
            </Button>
          </Col>

          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
      <br/><br/>

      <TablaProductos 
        productos={productosPaginados} 
        cargando={cargando} 
        error={errorCarga}
        totalElementos={listaProductos.length} // Total de elementos
        elementosPorPagina={elementosPorPagina} // Elementos por página
        paginaActual={paginaActual} // Página actual
        establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
        abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
        abrirModalEdicion={abrirModalEdicion}
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />

      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
      />

      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditado={productoEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarProducto={actualizarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />
      
    </Container>
  );
};

export default Productos;