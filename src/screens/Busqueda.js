import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FiFilter } from 'react-icons/fi'

import ArchiveCard from '../components/ArchiveCard'

import './css/Busqueda.css'
import './css/styles.css'

//importar la base de datos
import { db } from '../firebase config'
import { collection, getDocs } from "firebase/firestore"; 

// Función principal
const getMultimedia = async () => {
    const multimedia = [];
    const querySnapshot = await getDocs(collection(db, "multimedia"));
    querySnapshot.forEach((doc) => {
        multimedia.push(doc.data());
    });
    return multimedia;
};

function Busqueda() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    
    const navigate = useNavigate()

    useEffect(() => {
        getMultimedia().then((multimedia) => {
            setData(multimedia);
        });
    }, []);

    const handleClick = (item) => {
        navigate('/visualiza', { state: { item } })
    };

    const handleRadioChange = (label) => {
        setFilter(label);
    };

    const checar = () => {
        console.log(filter);
    }

    // Función para dividir el array en subarrays de tres elementos cada uno
    const dividirEnFilas = (array, tamañoFila) => {
        const filas = [];
        for (let i = 0; i < array.length; i += tamañoFila) {
        filas.push(array.slice(i, i + tamañoFila));
        }
        return filas;
    };

    // Divide el array de datos en filas de tres elementos cada una
    const filasDeDatos = dividirEnFilas(data, 4);

    // Filtrar los datos basado en el filtro seleccionado y la búsqueda
    const datosFiltrados = data.filter(item => {
        if (!search) return true;
        switch (filter) {
            case 'titulo':
                return item.titulo.toLowerCase().includes(search.toLowerCase());
            case 'genero':
                return item.genero.toLowerCase().includes(search.toLowerCase());
            case 'autor':
                return item.autor.toLowerCase().includes(search.toLowerCase());
            case 'palabras_clave':
                return item.palabras_clave.some(palabra => palabra.toLowerCase().includes(search.toLowerCase()));
            case 'etiquetas':
                return item.etiquetas.some(etiqueta => etiqueta.toLowerCase().includes(search.toLowerCase()));
            default:
                return true;
        }
    });

     // Divide los datos filtrados en filas de tres elementos cada una
     const filasDeDatosFiltrados = dividirEnFilas(datosFiltrados, 4);
    
    return (
        <div className='Busqueda'>
            <h1 className='searchTitle'>Busqueda de Contenido Multimedia</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    aria-label="Buscar..."
                    aria-describedby="button-addon2"
                />
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                >
                    <BsSearch />
                </button>
            </div>
            {/* Se renderiza la parte del filtro */}
            <div className="div-filter">
                <Button variant="dark" style={{ margin: 10}} onClick={checar()} >
                    <FiFilter />
                </Button>

                <div className="div-content-form">
                    {[
                        { label: 'Titulo', value: 'titulo' },
                        { label: 'Genero', value: 'genero' },
                        { label: 'Autor', value: 'autor' },
                        { label: 'Palabras clave', value: 'palabras_clave' },
                        { label: 'Etiquetas', value: 'etiquetas' }
                    ].map(({ label, value }) => (
                        <div key={value} className="mb-3">
                            <Form.Check
                                inline
                                label={label}
                                name="filter"
                                type="radio"
                                checked={filter === value}
                                onChange={() => handleRadioChange(value)}
                                id={`inline-${value}`}
                                className='check-filter'
                            />
                        </div>
                    ))}
                </div>  
            </div>

            {/* Se renderiza la parte de las cartas */}
            <div>
                {/* Renderiza cada fila */}
                {filasDeDatosFiltrados.map((fila, index) => (
                    <div key={`fila-${index}`} style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Renderiza cada componente en la fila */}
                    {fila.map((item, itemIndex) => (
                        <div key={`item-${index}-${itemIndex}`} style={{ margin: '10px' }}>
                            <button style={{ border: 'none', background: 'none', padding: 0, margin: 0 }} onClick={() => handleClick(item)}>
                                <ArchiveCard item={item} />
                            </button>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Busqueda;
