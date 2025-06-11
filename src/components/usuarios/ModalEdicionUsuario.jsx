import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionUsuario = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  usuarioEditado,
  manejarCambioInputEdicion,
  actualizarUsuario,
  errorCarga,
}) => {

  const [mostrarContraseña, setMostrarContraseña] = useState(true);

  useEffect(() => {
    if (mostrarModalEdicion) {
      setMostrarContraseña(false); // Oculta la contraseña cada vez que se abre el modal
    }
  }, [mostrarModalEdicion]);

  const validacionFormulario = () => {
    return(
      usuarioEditado?.usuario.trim() !== "" &&
      usuarioEditado?.contraseña.trim() !== ""
    );
  };

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="usuario"
              value={usuarioEditado?.usuario || ''}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre del usuario (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContraseña">
            <Form.Label>Contraseña</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={mostrarContraseña ? "text" : "password"}
                name="contraseña"
                value={usuarioEditado?.contraseña || ''}
                onChange={manejarCambioInputEdicion}
                placeholder="Ingresa la contraseña (máx. 20 caracteres)"
                maxLength={20}
                required
              />
              <Button
                  variant="primary"
                  size="sm"
                  className="ms-2 text-white"
                  onClick={() => setMostrarContraseña(!mostrarContraseña)}
                >
                  {mostrarContraseña ? "Ocultar" : "Mostrar"}
                </Button>
            </div>
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
        <Button variant="primary" disabled={!validacionFormulario()} onClick={actualizarUsuario}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionUsuario;