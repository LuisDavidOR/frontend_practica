// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
//Form es para darle apariencia
//Button es para el boton del registro

const ModalRegistroClientes = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
}) => {

  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    //Permitir solo letras {A-Z, a-z}
    if(
      (charCode < 65 || charCode > 90) && //Letras mayusculas
      (charCode < 97 || charCode > 122) && //Letras minusculas
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9//Tap
    ) {
      e.preventDefault(); //Evita que se escriba el caracter
    }
  };

  const validacionFormulario = () => {
    return(
      nuevoCliente.primer_nombre.trim() !== "" &&
      nuevoCliente.segundo_nombre.trim() !== "" &&
      nuevoCliente.primer_apellido.trim() !== "" &&
      nuevoCliente.segundo_apellido.trim() !== "" &&
      nuevoCliente.celular.trim() !== "" &&
      nuevoCliente.direccion.trim() !== "" &&
      nuevoCliente.cedula.trim() !== "" 
    )
  }

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    //Permitir solo números (0-9), retroceso, borrar y tap
    if(
      (charCode < 48 || charCode > 57) && //números (0-9)
      charCode !== 8 && //Retroceso
      charCode !== 46 && //Borrar
      charCode !== 9//Tap
    ) {
      e.preventDefault(); //Evita que se escriba el caracter
    }
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Registro de un nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombre">
            <Form.Label>Primer Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
              onKeyDown={validarLetras}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombre">
            <Form.Label>Segundo Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
              required
              onKeyDown={validarLetras}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellido">
            <Form.Label>Primer Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
              onKeyDown={validarLetras}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellido">
            <Form.Label>Segundo Apellido del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
              required
              onKeyDown={validarLetras}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text  "
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambioInput}
              placeholder="Ingresa el celular (máx. 8 caracteres)"
              maxLength={8}
              required
              onKeyDown={validarNumeros}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la dirección (máx. 150 caracteres)"
              maxLength={150}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambioInput}
              placeholder="Ingresa la cedula (máx. 14 caracteres)"
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={agregarCliente}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroClientes;