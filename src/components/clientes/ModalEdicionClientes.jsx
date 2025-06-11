import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCliente = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  clienteEditado,
  manejarCambioInputEdicion,
  actualizarCliente,
  errorCarga,
}) => {

  const validacionFormulario = () => {
    return(
      clienteEditado?.primer_nombre.trim() !== "" &&
      clienteEditado?.segundo_nombre.trim() !== "" &&
      clienteEditado?.primer_apellido.trim() !== "" &&
      clienteEditado?.segundo_apellido.trim() !== "" &&
      clienteEditado?.celular.trim() !== "" &&
      clienteEditado?.direccion.trim() !== "" &&
      clienteEditado?.cedula.trim() !== "" 
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
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formPrimerNombreCliente">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={clienteEditado?.primer_nombre || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el primer nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoNombreCliente">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={clienteEditado?.segundo_nombre || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el segundo nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrimerApellidoCliente">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={clienteEditado?.primer_apellido || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el primer apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSegundoApellidoCliente">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={clienteEditado?.segundo_apellido || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarLetras}
              placeholder="Ingresa el segundo apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCelularCliente">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={clienteEditado?.celular || ''}
              onChange={manejarCambioInputEdicion}
              onKeyDown={validarNumeros}
              placeholder="Ingresa el celular (máx. 8 caracteres)"
              maxLength={8}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDireccionCliente">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={clienteEditado?.direccion || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección (máx. 150 caracteres)"
              maxLength={150}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCedulaCliente">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={clienteEditado?.cedula || ''}
              onChange={manejarCambioInputEdicion}
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
          setMostrarModalEdicion(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" disabled={!validacionFormulario()} onClick={actualizarCliente}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;