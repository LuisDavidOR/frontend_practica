// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
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
      <div className="d-none d-md-block">
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
    </div>

    <div className="d-block d-md-none">
      {productos.map((producto) => (
        <Card key={producto.id_producto} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title> <strong>ID:</strong> {producto.id_producto} </Card.Title>
            <Card.Text><strong>Producto:</strong> {producto.nombre_producto}</Card.Text>
            <Card.Text><strong>Descripción:</strong> {producto.descripcion_producto || 'Sin descripción'}</Card.Text>
            <Card.Text><strong>Categoria:</strong> {producto.id_categoria}</Card.Text>
            <Card.Text><strong>Precio Unitario:</strong> {producto.precio_unitario}</Card.Text>
            <Card.Text><strong>Stock:</strong> {producto.stock}</Card.Text>  
            <Card.Text>
              {producto.imagen ? (
                <img
                  src={`data:image/png;base64,${producto.imagen}`}
                  alt={producto.nombre_producto}
                  style={{ maxWidth: '100px' }}
                />
              ) : (
                'Sin imagen'
              )}
            </Card.Text>  
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalActualizacion(producto)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(producto)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
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