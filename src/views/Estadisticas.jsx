import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentasPorMes from '../components/graficos/VentasPorMes';
import VentasPorEmpleado from '../components/graficos/VentasPorEmpleado';
import CantidadPorCategoria from '../components/graficos/CantidadPorCategoria';

const Estadisticas = () => {

  const [meses, setMeses] = useState([]);
  const [totalesPorMes, setTotalesPorMes] = useState([]);

  const [empleados, setEmpleados] = useState([]);
  const [totales_Ventas, setTotalVentas] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [cantidadVendida, setCantidadVendida] = useState([]);

  useEffect(() => {
    cargaVentasPorMes();
    cargaVentasPorEmpleado();
    cargaCantidadPorCategoria();
  }, []); 

  const cargaVentasPorMes = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/totalventaspormes');
    const data = await response.json();

    setMeses(data.map(item => item.mes));
    setTotalesPorMes(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas:', error);
    alert('Error al cargar ventas: ' + error.message);
  }
  };

  const cargaVentasPorEmpleado = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/totalventasporempleado');
    const data = await response.json();

    setEmpleados(data.map(item => item.primer_nombre + ' ' + item.segundo_nombre + ' ' + item.primer_apellido));
    setTotalVentas(data.map(item => item.total_ventas));
  } catch (error) {
    console.error('Error al cargar ventas por empleado:', error);
    alert('Error al cargar ventas por empleado: ' + error.message);
  }
  };

  const cargaCantidadPorCategoria = async () => {
  try{
    const response = await fetch('http://127.0.0.1:3000/api/totalventasporcategorias');
    const data = await response.json();

    setCategorias(data.map(item => item.nombre_categoria));
    setCantidadVendida(data.map(item => item.cantidad_vendida));
  } catch (error) {
    console.error('Error al cargar cantidad por categoria:', error);
    alert('Error al cargar cantidad por categoria: ' + error.message);
  }
  };
  
  return(
    <Container className='mt-5'>
      <br />
      <h4>Estadísticas</h4>
      <Row className='mt-4'>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <VentasPorMes meses={meses} totales_por_mes={totalesPorMes} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <VentasPorEmpleado empleados={empleados} totales_Ventas={totales_Ventas} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className='mb-4'>
        <CantidadPorCategoria categorias={categorias} cantidadVendidas={cantidadVendida} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
