import { BrowserRouter, Route,Routes } from "react-router-dom"
import Busqueda from './screens/Busqueda.js'
import Home from './screens/Home.js'
import Visualizacion from './screens/Visualizacion.js'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/busqueda" element={<Busqueda />} />
                <Route path="/visualiza" element={<Visualizacion />} />
            </Routes>
        </BrowserRouter>
    )
}