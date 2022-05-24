import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {
  reset,
  getProducts,
  addProduct,
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

  const {
    success,
    successProduct,
    successCreate,
    successUpdate,
    error,
    loading,
    message,
  } = useSelector(state => state.products)

  const [type, setType] = useState('')
  const [featured, setFeatured] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    link: '',
    desc: '',
    article: '',
    video: '',
  })
  const { name, price, link, desc, article, review, video } = formData

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const clearForm = () => {
    setFormData({
      name: '',
      price: '',
      link: '',
      desc: '',
      article: '',
      video: '',
    })
    setUrl('')
    setType('')
    setFeatured(false)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (!product) {
      const data = {
        name,
        price,
        image: url,
        link,
        desc,
        article,
        review,
        video,
        type,
        featured,
      }
      dispatch(addProduct(data))
      reset()
      clearForm()
    } else {
      const updatedProduct = {
        _id: product._id,
        name: name,
        price: price,
        image: url ? url : product.image,
        link: link,
        desc: desc,
        article: article,
        review: review,
        video: video,
        type: type,
        featured: featured,
      }
      console.log(updatedProduct)
      dispatch(updateProduct(updatedProduct))
      reset()
      clearForm()
    }
  }

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch(reset())
      navigate('/')
    }
    if (product && product !== null) {
      setFormData({
        name: product.name,
        link: product.link,
        price: product.price,
        desc: product.desc,
        article: product.article,
        review: product.review,
        video: product.video,
      })
      handleType(product.type)
      handleFeatured(product.featured)
    }

    if (!success) {
      dispatch(getProducts())
    }
  }, [
    dispatch,
    navigate,
    productId,
    product,
    success,
    successCreate,
    successUpdate,
    successProduct,
  ])

  const handleType = e => {
    setType(e.toString())
  }
  const handleFeatured = e => {
    setFeatured(e)
  }

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message variant='danger'>{message}</Message>}
        <Row className='mb-3'>
          <Col>
            <Form onSubmit={submitHandler} className='mb-5 p-3'>
              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Product Name:</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter product name'
                  onChange={changeHandler}
                  value={name}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Product Price:</Form.Label>
                <Form.Control
                  type='text'
                  name='price'
                  placeholder='Enter product price'
                  onChange={changeHandler}
                  value={price}
                  required
                />
              </Form.Group>

              <Form.Group controlId='image' className='mb-4'>
                <Form.Label style={{ fontWeight: 'bold' }}>Image:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Image URL'
                  value={url ? url : product ? product.image : ''}
                  onChange={e => setUrl(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='formFile' className='mt-3 mb-3'>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Upload Image:
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
                <Form.Label className='mb-3'>Link</Form.Label>
                <Form.Control
                  type='text'
                  name='link'
                  placeholder='Enter affiliate link'
                  onChange={changeHandler}
                  value={link}
                />
              </Form.Group>

              <Row className='mb-3'>
                <Col>
                  <Form.Label className='mb-3'>Product Type:</Form.Label>
                  <Dropdown>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title={
                        (type && type === 'forHim') || type === 'forHer'
                          ? type.charAt(0).toUpperCase() +
                            type.slice(1, 3) +
                            ' ' +
                            type.slice(3)
                          : type
                          ? type.charAt(0).toUpperCase() + type.slice(1)
                          : 'Type'
                      }
                      name='type'
                      onSelect={handleType}
                    >
                      <Dropdown.Item eventKey='tech'>Tech</Dropdown.Item>
                      <Dropdown.Item eventKey='kitchen'>Kitchen</Dropdown.Item>
                      <Dropdown.Item eventKey='outdoors'>
                        Hunting/Outdoors
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='forHim'>
                        Gift Ideas For Him
                      </Dropdown.Item>
                      <Dropdown.Item eventKey='forHer'>
                        Gift Ideas For Her
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col>
                  <Form.Label className='mb-3'>Featured: </Form.Label>
                  <Dropdown>
                    <DropdownButton
                      id='dropdown-basic-button'
                      title={
                        featured.toString().charAt(0).toUpperCase() +
                        featured.toString().slice(1)
                      }
                      onSelect={handleFeatured}
                    >
                      <Dropdown.Item eventKey={true}>True</Dropdown.Item>
                      <Dropdown.Item eventKey={false}>False</Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                </Col>
              </Row>

              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Description</Form.Label>
                <Form.Control
                  type='text'
                  name='desc'
                  placeholder='Enter description'
                  onChange={changeHandler}
                  value={desc}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Article</Form.Label>
                <Form.Control
                  type='text'
                  name='article'
                  placeholder='Add article'
                  onChange={changeHandler}
                  value={article}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Review</Form.Label>
                <Form.Control
                  type='text'
                  name='review'
                  placeholder='Add review'
                  onChange={changeHandler}
                  value={review}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='mb-3'>Video</Form.Label>
                <Form.Control
                  type='text'
                  name='video'
                  placeholder='Add video'
                  onChange={changeHandler}
                  value={video}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
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
