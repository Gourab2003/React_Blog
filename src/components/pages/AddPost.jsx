import React from 'react'
import Container from '../Container/Container'
import PostForm from '../PostForm/postForm'


function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost