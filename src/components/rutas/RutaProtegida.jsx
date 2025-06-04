import React from "react";
import { Navigate } from "react-router-dom";

const RutaProtegida = ({ vista }) => {
  //verifica si el usuario está autenticado usando localStorage
  const estaLogueado = !!localStorage.getItem("usuario") && !!localStorage.getItem("contraseña");

  //Log para depuración
  console.log("Usuario autenticado:", estaLogueado);

  //Si está autenticado, renderiza la vista; si no, redirige a la ágina de login
  return estaLogueado ? vista : <Navigate to="/" replace />;
};

export default RutaProtegida;