import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './css/Busqueda.css';

function Busqueda() {
    const [data, setData] = useState([
        { "id": 1, "name": "Libro 1", "lastName": "Autor 1", "email": "Género 1" },
        { "id": 2, "name": "Libro 2", "lastName": "Autor 2", "email": "Género 2" },
        { "id": 3, "name": "Libro 3", "lastName": "Autor 3", "email": "Género 3" },
        { "id": 4, "name": "Libro 4", "lastName": "Autor 4", "email": "Género 4" }
    ]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    const handleClick = (rowData) => {
        console.log(rowData);
        navigate('/visualiza', { state: { rowData } })
    };

    return (
        <div className='Busqueda'>
            
            <input className='form-control' type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." />
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Género</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id} onClick={() => handleClick(item)}>
                            <td>{item.name}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Busqueda;
