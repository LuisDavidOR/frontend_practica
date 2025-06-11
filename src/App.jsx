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
import RutaProtegida from "./components/rutas/RutaProtegida";
import PiePagina from "./components/infopie/PiePagina";
import Empleados from "./views/Empleados";

const App = () => {
  return (
    
    <Router>
      <div className="app-wrapper">
        <Encabezado />

      <main className="margen-superior-main content">
      
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/inicio" element={<RutaProtegida vista={<Inicio />} />} />
          <Route path="/servicios" element={<RutaProtegida vista={<Servicios />} />} />
          <Route path="/clientes" element={<RutaProtegida vista={<Clientes />} />} />
          <Route path="/empleados" element={<RutaProtegida vista={<Empleados />} />} />
          <Route path="/productos" element={<RutaProtegida vista={<Productos />} />} />
          <Route path="/categorias" element={<RutaProtegida vista={<Categorias />} />} />
          <Route path="/usuarios" element={<RutaProtegida vista={<Usuarios />} />} />
          <Route path="/ventas" element={<RutaProtegida vista={<Ventas />} />} />
          <Route path="/compras" element={<RutaProtegida vista={<Compras />} />} />
          <Route path="/catalogo" element={<RutaProtegida vista={<CatalogoProductos />} />} />
          <Route path="/estadistica" element={<RutaProtegida vista={<Estadisticas />} />} />
          <Route path="/dashboard" element={<RutaProtegida vista={<Dashboard />} />} />
        </Routes>
        </main>
        <PiePagina />
        </div>
      
    </Router>
  );
};

export default App;