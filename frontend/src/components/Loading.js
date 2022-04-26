import React from 'react'
import { Spinner} from 'react-bootstrap'

const Loading = () => {
  return (
    <Spinner animation='border'variant= 'primary' role='status' 
    style={{width:'200px', height:'200px', margin:'auto',
     display: 'flex',
     }}>
<span className='sr-only'> Loading ..</span>
    </Spinner>
  )
}

export default Loading