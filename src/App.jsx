import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Servicios from "./views/Servicios";
import './App.css';
import Encabezado from "./components/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import Categorias from "./views/Categorias";
import Usuarios from "./views/Usuarios";
import Ventas from "./views/Ventas";
import Compras from "./views/Compras";
import CatalogoProductos from "./views/CatalogoProductos";
import Estadisticas from "./views/Estadisticas";
import Dashboard from "./views/Dashboard";

const App = () => {
  return (
    <Router>
      <main className="margen-superior-main">
      <Encabezado />
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/catalogo" element={<CatalogoProductos />} />
          <Route path="/estadistica" element={<Estadisticas />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </main>
    </Router>
  );
};

export default App;