import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5050/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir el archivo');
      }

      console.log('Archivo subido exitosamente');
      // Puedes realizar alguna acción adicional aquí después de subir el archivo exitosamente

    } catch (error) {
      console.error('Error:', error.message);
      // Puedes mostrar un mensaje de error al usuario o realizar alguna acción adicional en caso de error
    }
  };

  return (
    <div>
      <h1>Subir Archivo</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Archivo</button>
      </form>
    </div>
  );
}

export default FileUpload;
