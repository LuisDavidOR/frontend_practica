// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Card, Button } from 'react-bootstrap';
import Paginacion from '../ordenamiento/Paginacion';
import 'bootstrap/dist/css/bootstrap.min.css';


const TablaUsuarios = ({
  usuarios,
  cargando,
  error,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
  abrirModalEliminacion,
  abrirModalEdicion
}) => {

  if (cargando) {
    return <div>Cargando usuarios...</div>; // Muestra mensaje mientras carga
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
          <th>ID Usuario</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id_usuario}>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.usuario}</td>
            <td>{'*'.repeat(usuario.contraseña.length)}</td>
            <td>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(usuario)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEliminacion(usuario)}
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
      {usuarios.map((usuario) => (
        <Card key={usuario.id_usuario} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Title>{usuario.usuario}</Card.Title>
            <Card.Text><strong>ID:</strong> {usuario.id_usuario}</Card.Text>
            <Card.Text><strong>Contraseña:</strong> {'*'.repeat(usuario.contraseña.length)}</Card.Text>
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => abrirModalEdicion(usuario)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(usuario)}
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
export default TablaUsuarios;