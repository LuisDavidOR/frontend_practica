import { Card } from "react-bootstrap";
import { Bar, Radar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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


return (
  <Card style={{ height: "100%" }}>
    <Card.Body>
      <Card.Title>Cantidad por Categorias</Card.Title>
      <div style={{ height: "300px", justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Bar data={data} options={options} />
      </div>
    </Card.Body>
  </Card>
);
};
export default CantidadPorCategoria;

