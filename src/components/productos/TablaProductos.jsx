// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaProductos = ({
  productos,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion,
  generarPDFDetalleProducto
}) => {

  if (cargando) {
    return <div>Cargando productos...</div>; // Muestra mensaje mientras carga
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <div
    className="d-flex flex-column justify-content-between"
    style={{ minHeight: "60vh" }} // ajusta el valor si querés más o menos altura mínima
    >
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>ID Categoría</th>
          <th>Precio Unitario</th>
          <th>Stock</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id_producto}>
            <td>{producto.id_producto}</td>
            <td>{producto.nombre_producto}</td>
            <td>{producto.descripcion_producto || 'Sin descripción'}</td>
            <td>{producto.id_categoria}</td>
            <td>{producto.precio_unitario.toFixed(2)}</td>
            <td>{producto.stock}</td>
            <td>
              {producto.imagen ? (
                <img
                  src={`data:image/png;base64,${producto.imagen}`}
                  alt={producto.nombre_producto}
                  style={{ maxWidth: '100px' }}
                />
              ) : (
                'Sin imagen'
              )}
            </td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                className="me-2"
                onClick={() => generarPDFDetalleProducto(producto)}
              >
                <i className="bi bi-filetype-pdf"></i>
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(producto)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(producto)}
                >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {/* Paginación fijada abajo del contenedor de la tabla */}
    <div className="mt-auto">
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </div>
  </div>
  );
};

// Exportación del componente
export default TablaProductos;