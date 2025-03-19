import { useNavigate } from "react-router-dom";

const ListaServicios = ({titulo}) =>{

    const navegar = useNavigate();

    const navegarInicio = () => {
        navegar("/inicio");
    }
    return(
        <>
        <h3>{titulo}</h3>
        <ol>
            <li>Mantenimiento preventivo</li>
            <li>Instalación del paquete de programas</li>
            <li>Instalación de Office</li>
            <li>Formateo de Windows</li>
            <li>Instalación de redes</li>
        </ol>
      <button onClick={navegarInicio}>Inicio</button>
        </>
    )
}

export default ListaServicios;