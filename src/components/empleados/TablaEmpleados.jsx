// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
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
    establecerPaginaActual}) => {

  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando empleados...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>; // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th>ID Empleado</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Celular</th>
          <th>Dirección</th>
          <th>Cédula</th>
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
            <td>{empleado.direccion}</td>
            <td>{empleado.cedula}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Paginacion
  elementosPorPagina={elementosPorPagina}
  totalElementos={totalElementos}
  paginaActual={paginaActual}
  establecerPaginaActual={establecerPaginaActual}
  />
    </>
  );
};

// Exportación del componente
export default TablaEmpleados;