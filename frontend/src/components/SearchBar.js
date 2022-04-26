import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
const SearchBar = ({history}) => {
    const [words, setWords] = useState('')

    const submitHandler =(e) => {
        e.preventDefault()
        if(words.trim()) {
            history.push(`/search/${words}`)
        }else {
            history.push('/')
        }
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control type='text' name='a' onChange={(e) => setWords(e.target.value)} placeholder='Find Books' className='mr-sm-2 ml-sm-5'>

        </Form.Control>
        <Button type='submit' variant='outline-success' className='btn-dark' >
            Find
        </Button>

    </Form>
  )
}

export default withRouter(SearchBar)