import { bucket } from '.bdmultimedia/server/db/connection.js';
import fs from 'fs';

// Función para guardar un archivo de video en GridFS
const guardarVideoEnGridFS = async (filename, rutaArchivo) => {
  try {
    const uploadStream = bucket.openUploadStream(filename);
    const fileStream = fs.createReadStream(rutaArchivo);
    fileStream.pipe(uploadStream);
    await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
    });
    console.log(`Archivo de video ${filename} guardado en GridFS`);
  } catch (error) {
    console.error('Error al guardar el archivo de video en GridFS:', error);
  }
};

// Función para guardar un archivo PDF en GridFS
const guardarPDFEnGridFS = async (filename, rutaArchivo) => {
  try {
    const uploadStream = bucket.openUploadStream(filename);
    const fileStream = fs.createReadStream(rutaArchivo);
    fileStream.pipe(uploadStream);
    await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
    });
    console.log(`Archivo PDF ${filename} guardado en GridFS`);
  } catch (error) {
    console.error('Error al guardar el archivo PDF en GridFS:', error);
  }
};

// Función para guardar un archivo de música en GridFS
const guardarMusicaEnGridFS = async (filename, rutaArchivo) => {
  try {
    const uploadStream = bucket.openUploadStream(filename);
    const fileStream = fs.createReadStream(rutaArchivo);
    fileStream.pipe(uploadStream);
    await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
    });
    console.log(`Archivo de música ${filename} guardado en GridFS`);
  } catch (error) {
    console.error('Error al guardar el archivo de música en GridFS:', error);
  }
};

export { guardarVideoEnGridFS, guardarPDFEnGridFS, guardarMusicaEnGridFS };

/* ASI SE MANDA A LLAMAR AL METODO PARA GUARDAR LOS ARCHIVOS MANUALMENTE
import { guardarVideoEnGridFS, guardarPDFEnGridFS, guardarMusicaEnGridFS } from './ruta/a/tu/savefile';

// Guardar un archivo de video
await guardarVideoEnGridFS('video.mp4', 'ruta/al/archivo/video.mp4');

// Guardar un archivo PDF
await guardarPDFEnGridFS('documento.pdf', 'ruta/al/archivo/documento.pdf');

// Guardar un archivo de música
await guardarMusicaEnGridFS('cancion.mp3', 'ruta/al/archivo/cancion.mp3'); */

