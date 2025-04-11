// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
//Form es para darle apariencia
//Button es para el boton del registro

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de un nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formprimer_nombreEmpleado">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsegundo_nombreEmpleado">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formprimer_apellidoEmpleado">
            <Form.Label>Primer apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formsegundo_apellidoEmpleado">
            <Form.Label>Segundo apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formcelularEmpleado">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 8 caracteres)"
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formdireccionEmpleado">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="direccion"
              value={nuevaCategoria.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la direccion (máx. 150 caracteres)"
              maxLength={150}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formcedulaEmpleado">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoEmpleado.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa la cédula (máx. 14 caracteres)"
              maxLength={14}
              required
            />
          </Form.Group>

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCategoria}>
          Guardar Categoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;