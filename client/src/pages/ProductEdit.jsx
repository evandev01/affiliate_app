import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import {
  addProduct,
  getProductById,
  reset,
  updateProduct,
} from '../features/product/productSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductEdit = () => {
  const { id } = useParams()
  const productId = id
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    link: '',
    desc: '',
    article: '',
    video: '',
  })
  const { name, image, link, desc, article, video } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { product, successProduct, loading, errorProduct, message } =
    useSelector(state => state.products)

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId))
    }
    if (successProduct) {
      reset()
      navigate('/')
    }
  }, [dispatch, navigate, productId])

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const clearForm = () =>
    setFormData({
      name: '',
      image: '',
      link: '',
      desc: '',
      article: '',
      video: '',
    })

  const submitHandler = e => {
    e.preventDefault()

    if (successProduct) {
      reset()
      navigate('/')
    }

    if (!productId) {
      const data = {
        name,
        image,
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
        _id: productId,
        name: name,
        image: image,
        link: link,
        desc: desc,
        article: article,
        video: video,
      }
      dispatch(updateProduct(updatedProduct))
      reset()
      clearForm()
    }
  }

  return (
    <>
      <Container>
        <Row>
          {loading && <Loader />}
          {errorProduct && <Message variant='danger'>{message}</Message>}
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group className='mb-3'>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder={product ? product.name : 'Enter product name'}
                  onChange={changeHandler}
                  value={name}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  name='image'
                  placeholder={product ? product.image : 'Image'}
                  onChange={changeHandler}
                  value={image}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type='text'
                  name='link'
                  placeholder={product ? product.link : 'link'}
                  onChange={changeHandler}
                  value={link}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  name='desc'
                  placeholder={product ? product.desc : 'Enter description'}
                  onChange={changeHandler}
                  value={desc}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='text'
                  name='article'
                  placeholder={product ? product.article : 'Add article'}
                  onChange={changeHandler}
                  value={article}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='text'
                  name='video'
                  placeholder={product ? product.video : 'Add video'}
                  onChange={changeHandler}
                  value={video}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Check type='text' label='Check me out' />
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

export default ProductEdit
