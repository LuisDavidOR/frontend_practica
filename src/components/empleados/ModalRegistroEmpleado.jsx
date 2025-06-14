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

  const validacionFormulario = () => {
    return(
      nuevoEmpleado.primer_nombre.trim() !== "" &&
      nuevoEmpleado.segundo_nombre.trim() !== "" &&
      nuevoEmpleado.primer_apellido.trim() !== "" &&
      nuevoEmpleado.segundo_apellido.trim() !== "" &&
      nuevoEmpleado.celular.trim() !== "" &&
      nuevoEmpleado.cargo.trim() !== ""
    );
  };

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo letras {A-Z, a-z}
    if(
      (charCode < 65 || charCode > 90) && //Letras mayúsculas
      (charCode < 97 || charCode > 122) && //Letras minúsculas
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9 //Tab
    ) {
      e.preventDefault(); //Evita que se escriba el carácter
    }
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Permitir solo números (0-9), retroceso, borrar y tabb
    if(
      (charCode < 48 || charCode > 57) && // Números (0-9)
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9 //Tab
    ) {
      e.preventDefault(); //Evita que se escriba el carácter
    }
  };
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
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
              onKeyDown={validarNumeros}
              placeholder="Ingresa el celular (máx. 12 caracteres)"
              maxLength={12}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formcargoEmpleado">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              onKeyDown={validarLetras}
              placeholder="Ingresa el cargo (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFechaEmpleado">
            <Form.Label>Fecha de Contratación</Form.Label>
            <br></br>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              className="form-control"
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={agregarEmpleado}>
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;