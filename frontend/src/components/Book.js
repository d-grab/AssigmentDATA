import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'


const Product = ({product}) => {
  return (
    <Card className='my-4 p-3 rounded'>
        <Link to={`/book/${product._id}`}>
            <Card.Img src={product.image} variant='top'/>
        </Link>
        <Card.Body as='div'>
        <Link to={`/book/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>    
        </Link>
        <Card.Text as='div'>
            <div className='mt-2'>
              <strong>Author :</strong> {product.author}
            </div>
           
        </Card.Text>
        <Card.Text as='div'>
            <div >
              <strong>Narrated by:</strong> {product.narrated_by} 
            </div>
          </Card.Text>
          <Card.Text as='div'>
            <div >
              <strong>Duration:</strong> {product.duration} 
            </div>
          </Card.Text>
        
        <Card.Text as='div'>
            <div >
              <strong>Type:</strong> {product.type} 
            </div>
          </Card.Text>
        
          <Card.Text as='div'>
            <Rating value={product.rating} text={`reviews`} color='blue' />
            <Card.Text as='h3'>
            <div className='m-4  '>
              
              <strong>£ {product.price} </strong> 
            </div>
          </Card.Text>
          </Card.Text>
        </Card.Body>
        </Card>
  )
}
export default Product
