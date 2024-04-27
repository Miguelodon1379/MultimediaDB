import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FiFilter } from 'react-icons/fi'

import ArchiveCard from '../components/ArchiveCard'

import './css/Busqueda.css'
import './css/styles.css'

function Busqueda() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const fetchData = async (collectionName) => {
        try {
            const response = await fetch(`http://localhost:5050/api/getNotes/${collectionName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Error fetching datass:', error);
        }
    };

    useEffect(() => {
        fetchData("musica");
    }, []);

    const navigate = useNavigate()

    const handleClick = (rowData) => {
        console.log(rowData);
        navigate('/visualiza', { state: { rowData } })
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
                        { label: 'Titulo', value: 'title' },
                        { label: 'Genero', value: 'genre' },
                        { label: 'Autor', value: 'author' }
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
                {filasDeDatos.map((fila, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Renderiza cada componente en la fila */}
                    {fila.map((item) => (
                        <div key={item._id} style={{ margin: '10px' }}>
                            <Link to={`/visualiza/${item}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ArchiveCard item={item} />
                            </Link>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Busqueda;
