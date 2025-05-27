import { Card, Button } from "react-bootstrap";
import { Bar, Radar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const CantidadPorCategoria = ({ categorias, cantidadVendidas }) => {
  const data = {
    labels: categorias, //Nombres de los meses
    datasets: [
      {
        label: 'Cantidades',
        data: cantidadVendidas, //total de ventas por mes
        backgroundColor: 'rgba(192, 0, 0, 1)',
        bolderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidades',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Categorias',
        },
      },
    },
  };

  const chartRef = useRef(null);
  
  const generarPDF = () => {
    const doc = new jsPDF();
  
    // Encabezado 
    doc.setFillColor(28,41,51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255,255,255);
    doc.setFontSize(22);
    doc.text("Reporte de Ventas por Mes", doc.internal.pageSize.getWidth() / 2, 20, {align: "center"});
  
    //Capturar gráfico como imagen
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);
  
    if(chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 180, 100);
    }
  
    //Tabla de datos
    const columnas = ["Categoria", "Cantidades"];
    const filas = categorias.map((categoria, index) => [categoria, cantidadVendidas[index]]);
  
    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 150,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { top: 20, left: 14, right: 14 },
    });
  
    //Generar un nombre dinámico para el archivo PDF
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() +1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `CantidadPorCategoria${dia}_${mes}_${anio}.pdf`;
  
    //Guardar PDF
    doc.save(nombreArchivo);
  }


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Cantidad por Categorias</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      <Button className="btn btn-primary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
    </Card.Body>
  </Card>
);
};
export default CantidadPorCategoria;

