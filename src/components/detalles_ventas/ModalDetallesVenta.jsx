import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Container, Card } from 'react-bootstrap';

const ModalDetallesVenta = ({ mostrarModal, setMostrarModal, detalles, cargandoDetalles, errorDetalles }) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      fullscreen={true}
      aria-labelledby="detalles-venta-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="detalles-venta-modal">Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cargandoDetalles && <div>Cargando detalles...</div>}
        {!cargandoDetalles && !errorDetalles && detalles.length > 0 && (
          <Container>
            <div className="d-none d-md-block">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID Detalle</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((detalle) => (
                  <tr key={detalle.id_detalle_venta}>
                    <td>{detalle.id_detalle_venta}</td>
                    <td>{detalle.nombre_producto}</td>
                    <td>{detalle.descripcion_producto}</td>
                    <td>{detalle.cantidad}</td>
                    <td>C$ {detalle.precio_unitario.toFixed(2)}</td>
                    <td>C$ {detalle.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>

            <div className="d-block d-md-none">
                  {detalles.map((detalle) => (
                    <Card key={detalle.id_detalle_venta} className="mb-2 shadow-sm">
                      <Card.Body>
                        <Card.Title> <strong>ID:</strong> {detalle.id_detalle_venta} </Card.Title>
                        <Card.Text><strong>Producto:</strong> {detalle.nombre_producto}</Card.Text>
                        <Card.Text><strong>Descripción:</strong> {detalle.descripcion_producto}</Card.Text>
                        <Card.Text><strong>Cantidad:</strong> {detalle.cantidad}</Card.Text>
                        <Card.Text><strong>Precio Unitario:</strong> {detalle.precio_unitario}</Card.Text>
                        <Card.Text><strong>Subtotal:</strong> C$ {detalle.subtotal.toFixed(2)}</Card.Text>
                        <div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => abrirModalActualizacion(detalle)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => abrirModalEliminacion(detalle)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesVenta;