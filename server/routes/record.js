import express from "express"
import path from "path"
import Grid from "gridfs-stream"
import * as mongoose from 'mongoose';
import multer from "multer";
import {GridFsStorage} from 'multer-gridfs-storage'
import fs from "fs"
import crypto from "crypto"
import { ObjectId } from 'mongodb'; // Importa ObjectId de la biblioteca mongodb

import mongodb from "mongodb";

import db from "../db/connection.js"

const router = express.Router()

const bucket = new mongodb.GridFSBucket(db, {
  bucketName: 'portadas'
});

router.get("/", (req, res) => {
  res.send("Server ON")
})

// This section will help you get a list of all the records.
router.get("/api/getNotes/:collectionName", async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const collection = await db.collection(collectionName);
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).send("Error fetching data")
  }
  console.log("Data fetched successfully")
})




router.get("/api/download/:collectionName/:id", async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const id = req.params.id;

    // Verificar si la colección existe
    if (!db.collection(collectionName)) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Convertir el id proporcionado a un ObjectId
    const objectId = new ObjectId(id);

    // Buscar el archivo en el bucket por su _id
    const file = await db.collection(collectionName).findOne({ _id: objectId });

    // Si no se encuentra el archivo, devolver un error 404
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Configurar los encabezados de la respuesta para indicar que es una imagen
    res.setHeader('Content-Type', 'image/jpg');
    
    // Devolver el contenido del archivo como respuesta
    res.send(file);

  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Error downloading file" });
  }
});



// Ruta para subir un archivo a la base de datos
/*router.post("/api/uploadFile", upload.single("file"), async (req, res) => {
  try {
    // Verifica si hay un archivo en la solicitud
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // Guarda el archivo en la base de datos utilizando GridFS
    const writestream = gfs.createWriteStream({
      filename: req.file.filename,
    });
    const readstream = fs.createReadStream(req.file.path);
    readstream.pipe(writestream)

    return res.status(200).json({ message: "File uploaded successfully" })
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" })
  }
})*/

/*router.get('/api/downloadFile/:collectionName/:fileId', (req, res) => {
  console.log("Downloading file... ", req.params.collectionName,req.params.fileId)
  const collectionName = req.params.collectionName;
  const fileId = req.params.fileId;

  // Buscar el archivo en la colección especificada
  gfs.files.findOne({filename: fileId}),(err, files) => {
    if(!files || files.legth === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }

    return res.json(files)

  }
})*/

router.get('/api/getFiles/:collectionName', (req, res) => {
  const collectionName = req.params.collectionName;
  console.log("Getting files from... ", collectionName)
  // Verifica si la colección especificada existe
  if (!gfs.collections[collectionName]) {
    return res.status(404).json({
      error: 'Collection not found'
    });
  }else {
    console.log("Collection found")
  }

  // Buscar el archivo en la colección especificada
  gfs.collection(collectionName).find().toArray((err, files) => {
    if (err) {
      return res.status(500).json({
        error: 'Error fetching files'
      });
    }

    if (!files || files.length === 0) {
      return res.status(404).json({
        error: 'No files exist in the collection'
      });
    }

    return res.json(files);
  });
});


export default router;