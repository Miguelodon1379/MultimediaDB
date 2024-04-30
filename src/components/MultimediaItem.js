import React from 'react';

function MultimediaItem({ item }) {

  return (
    <div className={`multimedia-item ${item.filetype.charAt(0)}`}>
      <div className={`${item.filetype}-container`}>
        <img src={item.cover_url} alt="Thumbnail" className={`${item.filetype}-thumbnail`} />
        <div className={`${item.filetype}-details`}>
          <h2>{item.titulo}</h2>
          <p>Autor: {item.autor}</p>
          <p>Género: {item.genero}</p>
        </div>
      </div>
      {renderizarContenido(item)}
    </div>
  );
}

function renderizarContenido(item) {
  switch (item.filetype) {
    case 'libro':
      return <embed className="pdf-viewer" src={item.file_url} type="application/pdf" height="650px" />;
    case 'audio':
      return <audio controls src={item.file_url} />;
    case 'video':
      return <video className="video-player" controls width="100%" height="auto" src={item.file_url} />;
    default:
      return null;
  }
}

export default MultimediaItem;
