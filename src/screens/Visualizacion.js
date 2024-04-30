import React from 'react';
import { useLocation } from 'react-router-dom'
import MultimediaItem from '../components/MultimediaItem.js'
import dummyData from '../assets/dummydata.js'
import './css/styles.css';

function VisualizacionContenido() {
  const location = useLocation()
    const { item } = location.state
  return (
    <div className="visualizacion-contenido">
      <h1>Visualización de Contenido Multimedia</h1>
      <div className="contenedor-multimedia">
        <MultimediaItem key={item._id} item={item} />
      </div>
    </div>
  );
}

export default VisualizacionContenido;
