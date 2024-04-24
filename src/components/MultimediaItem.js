// MultimediaItem.js
import React from 'react';
import '../screens/css/styles.css';

function MultimediaItem({ item }) {
  return (
    <div className="multimedia-item">
      <h2>{item.titulo}</h2>
      <p>Autor: {item.autor}</p>
      <p>Género: {item.genero}</p>
      <p>Descripción: {item.descripcion}</p>
      {renderizarContenido(item)}
    </div>
  );
}

function renderizarContenido(item) {
  switch (item.tipo) {
    case 'pdf':
      return <embed src={item.url} type="application/pdf" width="100%" height="600px" />;
    case 'audio':
      return <audio controls src={item.url} />;
    case 'video':
      return <video controls width="100%" height="auto" src={item.url} />;
    default:
      return null;
  }
}

export default MultimediaItem;
