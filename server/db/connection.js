import { MongoClient, GridFSBucket } from 'mongodb';
import fs from 'fs';

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bucket;

try {
  await client.connect();
  console.log("Conexión establecida con MongoDB");
  const database = client.db("medialib");
  bucket = new GridFSBucket(database);
} catch(err) {
  console.error("Error al conectar con MongoDB:", err);
}

// Función para almacenar un nuevo registro junto con el archivo multimedia en GridFS
const guardarRegistroConArchivo = async (registro, archivo, database) => {
  // Guardar el registro en tu colección principal (ejemplo: registros)
  await database.collection('registros').insertOne(registro);

  // Almacenar el archivo multimedia en GridFS
  const uploadStream = bucket.openUploadStream(archivo.filename);
  archivo.stream.pipe(uploadStream);
  await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
  });
  console.log('Archivo almacenado en GridFS');
};

// Función para recuperar un archivo multimedia desde GridFS
const recuperarArchivoDesdeGridFS = async (filename, destino, bucket) => {
  const downloadStream = bucket.openDownloadStreamByName(filename);
  const fileStream = fs.createWriteStream(destino);
  downloadStream.pipe(fileStream);
  await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
  });
  console.log('Archivo recuperado de GridFS');
};

export { bucket, guardarRegistroConArchivo, recuperarArchivoDesdeGridFS };
