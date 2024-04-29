import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import './css/Home.css'
import image1 from '../assets/imgs/multimedia-cover.jpg'


export default function Home() {
  return (
    <div className='Home'>
      <div className='container d-flex justify-content-center align-items-center h-100 '>
        <Card style={{width: '50%', height: '90%', padding: 10}}>
          <Card.Img style={{width: '100%', height: '50%', objectFit:'cover'}} variant="top" src={image1}/>
          <Card.Body>
            <Card.Title style={{fontSize: 24}}>Bienvenido a tu biblioteca de medios. </Card.Title>
            <Card.Text style={{fontSize: 16}}>
              Donde puedes explorar y disfrutar de una amplia variedad de contenido multimedia. Desde música hasta películas y libros, nuestra plataforma te permite buscar por título, autor, género, etiquetas y palabras clave para encontrar exactamente lo que estás buscando. 
              Además, podrás visualizar las carátulas y reproducir tus archivos multimedia favoritos con facilidad. 
            </Card.Text>
            <Link to='/busqueda'><Button style={{ backgroundColor: '#010101', color: 'white' }}>Continua</Button></Link>
          </Card.Body>
        </Card>
      </div>
    </div>

    
  )
}
