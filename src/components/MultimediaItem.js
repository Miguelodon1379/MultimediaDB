import React, { useEffect, useState } from 'react';

function MultimediaItem({ item }) {
  const [imagenSrc, setImagenSrc] = useState('');

  useEffect(() => {
    async function fetchImg() {
      try {
        const response = await fetch(`http://localhost:5050/api/download/portadas/${item.portada_id}`);

        if (!response.ok) {
          throw new Error('Error al obtener la imagen');
        }

        const blob = await response.blob();
        const extension = blob.type.split('/')[1]; // Extraer la extensión del tipo MIME
        const url = URL.createObjectURL(blob) + '.' + extension; 

        console.log('Imagen cargada:', url);

        setImagenSrc(url);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchImg();
  }, [item.portada_id]);

  return (
    <div className={`multimedia-item ${item.filetype.charAt(0)}`}>
      <div className={`${item.filetype}-container`}>
        <img src={imagenSrc} alt="Thumbnail" className={`${item.filetype}-thumbnail`} />
        <div className={`${item.filetype}-details`}>
          <h2>{item.titulo}</h2>
          <p>Autor: {item.autor}</p>
          <p>Género: {item.genero}</p>
          <p>Descripción: {item.descripcion}</p>
        </div>
      </div>
      {renderizarContenido(item)}
    </div>
  );
}

function renderizarContenido(item) {
  switch (item.filetype) {
    case 'libro':
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
