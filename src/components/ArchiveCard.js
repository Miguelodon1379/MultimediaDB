import React from 'react'
import '../screens/css/ArchiveCard.css'
import Card from 'react-bootstrap/Card'

function ArchiveCard({ item }) {
  return (
    <Card className='card-multi-cont'>
      <Card.Img style={{ width: '50%', height: '60%', objectFit:'contain', alignSelf: 'center'}} variant="top" src={item.cover_url} />
          <Card.Body className='card-body-multi' >
            <Card.Title style={{fontSize: 20, marginBottom: 0}}>{item.titulo}</Card.Title>
            <Card.Text className='card-text-multi'>
              <span style={{fontWeight:'bold'}} className='mb-2'>Autor: <span style={{fontWeight:'normal'}}>{item.autor}</span></span>
              <span style={{fontWeight:'bold'}} className='mb-2'>Género: <span style={{fontWeight:'normal'}}>{item.genero}</span></span>
              <span style={{fontWeight:'bold'}} className='mb-2'>Palabras clave:
                {item.palabras_clave.map((palabra, index) => (
                      <span key={index} style={{fontWeight:'normal'}} className='text-muted'>{palabra+','}</span>
                    ))}
              </span>

              <span style={{fontWeight:'bold'}} className='mb-2'>Etiquetas:
                {item.etiquetas.map((etiqueta, index) => (
                      <span key={index} style={{fontWeight:'normal'}} className='text-muted'>{'#'+etiqueta+' '}</span>
                ))}
              </span>
            </Card.Text>
          </Card.Body>
    </Card>
  )
}

export default ArchiveCard