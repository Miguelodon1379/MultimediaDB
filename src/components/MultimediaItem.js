// MultimediaItem.js
import React from 'react';
import '../screens/css/styles.css';

function MultimediaItem({ item }) {
  switch (item.tipo) {
    case 'pdf':
      return (
        <div className="multimedia-item p">
          <div className="pdf-container">
            <img src={item.imagen} alt="PDF Thumbnail" className="pdf-thumbnail" />
            <div className="pdf-details">
              <h2>{item.titulo}</h2>
              <p>Autor: {item.autor}</p>
              <p>Género: {item.genero}</p>
              <p>Descripción: {item.descripcion}</p>
            </div>
          </div>
          {renderizarContenido(item)}
        </div>
      );
      case 'audio':
      return (
        <div className="multimedia-item a">
          <div className="audio-container">
            <img src={item.imagen} alt="Audio Thumbnail" className="audio-thumbnail" />
            <div className="audio-details">
              <h2>{item.titulo}</h2>
              <p>Autor: {item.autor}</p>
              <p>Género: {item.genero}</p>
              <p>Descripción: {item.descripcion}</p>
            </div>
          </div>
          {renderizarContenido(item)}
        </div>
      );
    case 'video':
      return (
        <div className="multimedia-item v">
          <div className="video-container">
            <img src={item.imagen} alt="Video Thumbnail" className="video-thumbnail" />
            <div className="video-details">
              <h2>{item.titulo}</h2>
              <p>Autor: {item.autor}</p>
              <p>Género: {item.genero}</p>
              <p>Descripción: {item.descripcion}</p>
            </div>
          </div>
          {renderizarContenido(item)}
        </div>
      );
    default:
      return null;
  }
}

function renderizarContenido(item) {
  switch (item.tipo) {
    case 'pdf':
      return <embed className="pdf-viewer" src={item.url} type="application/pdf" height="650px" />;
    case 'audio':
      return <audio controls src={item.url} />;
    case 'video':
      return <video className="video-player" controls width="100%" height="auto" src={item.url} />;
    default:
      return null;
  }
}

export default MultimediaItem;
