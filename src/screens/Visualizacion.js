/*import React from 'react'
import { useLocation } from 'react-router-dom';

function Visualizacion() {
    const { state } = useLocation(); // Obtener el objeto enviado como prop en la navegación
    const item = state.rowData; // Obtener el objeto completo

  return (
    <div>Visualizacion</div>
  )
}

export default Visualizacion*/
// VisualizacionContenido.js

import React from 'react';
import MultimediaItem from '../components/MultimediaItem.js';
import dummyData from '../assets/dummydata.js';
import './css/styles.css';

function VisualizacionContenido() {
    const item = dummyData[1];
  return (
    <div className="visualizacion-contenido">
      <h1>Visualización de Contenido Multimedia</h1>
      <div className="contenedor-multimedia">
        <MultimediaItem key={item.id} item={item} />
      </div>
    </div>
  );
}

export default VisualizacionContenido;
