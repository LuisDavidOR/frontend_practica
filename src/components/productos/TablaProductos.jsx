// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaProductos = ({ productos, cargando, error, abrirModalEliminacion }) => {

  if (cargando) {
    return <div>Cargando productos...</div>; // Muestra mensaje mientras carga
  }

  // Renderizado de la tabla con los datos recibidos
  return (
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
                <a href={producto.imagen} target="_blank" rel="noopener noreferrer">
                  Ver imagen
                </a>
              ) : (
                'Sin imagen'
              )}
            </td>
            <td>
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
  );
};

// Exportación del componente
export default TablaProductos;