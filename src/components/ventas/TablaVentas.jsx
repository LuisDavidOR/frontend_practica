// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaVentas = ({ ventas,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  obtenerDetalles,
  abrirModalEliminacion,
  abrirModalActualizacion
}) => {
  if (cargando) {
    return <div>Cargando ventas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
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
          <th>ID Venta</th>
          <th>Fecha Venta</th>
          <th>Cliente</th>
          <th>Empleado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={`${venta.id_venta}`}>
            <td>{venta.id_venta}</td>
            <td>
              {venta.fecha_venta
                ? new Date(venta.fecha_venta).toLocaleDateString()
                : 'Sin fecha'}
            </td>
            <td>{venta.nombre_cliente}</td>
            <td>{venta.nombre_empleado}</td>
            <td>C$ {venta.total_venta.toFixed(2)}</td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => obtenerDetalles(venta.id_venta)}
              >
                <i className="bi bi-list-ul"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(venta)}
              >
                <i className="bi bi-trash"></i>
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => abrirModalActualizacion(venta)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>

    <div className="d-block d-md-none">
      {ventas.map((venta) => (
        <Card key={venta.id_venta} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title> <strong>ID:</strong> {venta.id_venta} </Card.Title>
            <Card.Text><strong>Fecha de Venta:</strong>
              {venta.fecha_venta
              ? new Date(venta.fecha_venta).toLocaleDateString()
              : 'Sin fecha'}
            </Card.Text>
            <Card.Text><strong>Cliente:</strong> {venta.nombre_cliente}</Card.Text>
            <Card.Text><strong>Empleado:</strong> {venta.nombre_empleado}</Card.Text>
            <Card.Text><strong>Total:</strong> C$ {venta.total_venta.toFixed(2)}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalActualizacion(venta)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(venta)}
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
export default TablaVentas;