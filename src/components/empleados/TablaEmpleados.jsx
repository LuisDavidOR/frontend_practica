// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaEmpleados que recibe props
const TablaEmpleados = ({
    empleados, 
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
    return <div>Cargando empleados...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>; // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <div
    className="d-flex flex-column justify-content-between"
    style={{ minHeight: "60vh" }} // ajusta el valor si querés más o menos altura mínima
  >
    <div className="d-none d-md-block">
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID Empleado</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Celular</th>
          <th>Cargo</th>
          <th>fecha de Contratación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((empleado) => (
          <tr key={empleado.id_empleado}>
            <td>{empleado.id_empleado}</td>
            <td>{empleado.primer_nombre}</td>
            <td>{empleado.segundo_nombre}</td>
            <td>{empleado.primer_apellido}</td>
            <td>{empleado.segundo_apellido}</td>
            <td>{empleado.celular}</td>
            <td>{empleado.cargo}</td>
            <td>
              {empleado.fecha_contratacion
                ? new Date(empleado.fecha_contratacion).toLocaleDateString()
                : 'Sin fecha'}
            </td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(empleado)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(empleado)}
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
      {empleados.map((empleado) => (
        <Card key={empleado.id_empleado} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title>
              {empleado.primer_nombre} {empleado.segundo_nombre} {empleado.primer_apellido} {empleado.segundo_apellido}</Card.Title>
            <Card.Text><strong>ID:</strong> {empleado.id_empleado}</Card.Text>
            <Card.Text><strong>Celular:</strong> {empleado.celular}</Card.Text>
            <Card.Text><strong>Cargo:</strong> {empleado.cargo}</Card.Text>
            <Card.Text><strong>Fecha de Contratación:</strong>
              {empleado.fecha_contratacion
              ? new Date(empleado.fecha_contratacion).toLocaleDateString()
              : 'Sin fecha'}
            </Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(empleado)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(empleado)}
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
export default TablaEmpleados;