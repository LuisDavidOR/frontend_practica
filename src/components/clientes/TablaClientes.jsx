// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaClientes que recibe props
const TablaClientes = ({
  clientes,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual, 
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion
}) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando clientes...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
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
          <th>ID Cliente</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primero Apellido</th>
          <th>Segundo Apellido</th>
          <th>Celular</th>
          <th>Dirección</th>
          <th>Cédula</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id_cliente}>
            <td>{cliente.id_cliente}</td>
            <td>{cliente.primer_nombre}</td>
            <td>{cliente.segundo_nombre}</td>
            <td>{cliente.primer_apellido}</td>
            <td>{cliente.segundo_apellido}</td>
            <td>{cliente.celular}</td>
            <td>{cliente.direccion}</td>
            <td>{cliente.cedula}</td>
            <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(cliente)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEliminacion(cliente)}
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
      {clientes.map((cliente) => (
        <Card key={cliente.id_cliente} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title>
              {cliente.primer_nombre} {cliente.segundo_nombre} {cliente.primer_apellido} {cliente.segundo_apellido}
            </Card.Title>
            <Card.Text><strong>ID:</strong> {cliente.id_cliente}</Card.Text>
            <Card.Text><strong>Celular:</strong> {cliente.celular}</Card.Text>
            <Card.Text><strong>Dirección:</strong> {cliente.direccion}</Card.Text>
            <Card.Text><strong>Cédula:</strong> {cliente.cedula}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(cliente)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(cliente)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

    {/* Paginación común para ambas vistas */}
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
export default TablaClientes;