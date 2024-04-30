import express from "express"
import bodyParser from "body-parser"
import rutas from "./routes/record.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors());
app.use(rutas);



// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});