import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Message from './Message'
import {
  addProduct,
  reset,
  updateProduct,
} from '../features/product/productSlice'

const ProductForm = ({
  product,
  onImageChange,
  url,
  setUrl,
  myRef,
  progress,
  imageError,
}) => {
  const { id } = useParams()
  const productId = id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { successProduct, successCreate, successUpdate } = useSelector(
    state => state.products
  )

  const [formData, setFormData] = useState({
    name: '',
    link: '',
    desc: '',
    article: '',
    video: '',
  })
  const { name, link, desc, article, video } = formData

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const clearForm = () => {
    setFormData({
      name: '',
      link: '',
      desc: '',
      article: '',
      video: '',
    })
    setUrl('')
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!product) {
      const data = {
        name,
        image: url,
        link,
        desc,
        article,
        video,
      }
      dispatch(addProduct(data))
      reset()
      clearForm()
    } else {
      const updatedProduct = {
        _id: product._id,
        name: name,
        image: url,
        link: link,
        desc: desc,
        article: article,
        video: video,
      }
      console.log(updatedProduct)
      dispatch(updateProduct(updatedProduct))
      reset()
      clearForm()
    }
  }

  useEffect(() => {
    if (successCreate || successUpdate) {
      navigate('/')
    }
    if (product && product !== null) {
      setFormData({
        name: product.name,
        link: product.link,
        desc: product.desc,
        article: product.article,
        video: product.video,
      })
    }
  }, [
    dispatch,
    navigate,
    productId,
    product,
    successCreate,
    successUpdate,
    successProduct,
  ])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter product name'
                  onChange={changeHandler}
                  value={name}
                />
              </Form.Group>
              <Form.Group controlId='image' className='mb-4 text-center'>
                <Form.Label style={{ fontWeight: 'bold' }}>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Image URL'
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                controlId='formFile'
                className='mt-3 mb-3 text-center'
              >
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Upload Image
                </Form.Label>
                <Form.Control
                  type='file'
                  ref={myRef}
                  onChange={onImageChange}
                />
              </Form.Group>
              <div className='progress-bar' style={{ width: progress + '%' }} />
              {imageError && <Message variant='danger'>{imageError}</Message>}

              <Form.Group className='mb-3'>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type='text'
                  name='link'
                  placeholder='Enter affiliate link'
                  onChange={changeHandler}
                  value={link}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  name='desc'
                  placeholder='Enter description'
                  onChange={changeHandler}
                  value={desc}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Article</Form.Label>
                <Form.Control
                  type='text'
                  name='article'
                  placeholder='Add article'
                  onChange={changeHandler}
                  value={article}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Video</Form.Label>
                <Form.Control
                  type='text'
                  name='video'
                  placeholder='Add video'
                  onChange={changeHandler}
                  value={video}
                />
              </Form.Group>

              <Button variant='primary' type='text'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductForm
