import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config'
import {
  addProduct,
  getProductById,
  reset,
  updateProduct,
} from '../features/product/productSlice'

const ProductEdit = () => {
  const { id } = useParams()
  const productId = id
  let myRef = React.createRef()
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    link: '',
    desc: '',
    article: '',
    video: '',
  })
  const { name, image, link, desc, article, video } = formData
  const [url, setUrl] = useState('')
  const [imageError, setImageError] = useState(null)
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { product, successCreate, loading, errorProduct, message } =
    useSelector(state => state.products)

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId))
    }
    if (successCreate) {
      reset()
      navigate('/')
    }
    if (product && product.image) {
      setUrl(product.image)
      setProgress(100)
    } else {
      setUrl('')
      setProgress(0)
      myRef.current.value = ''
    }
  }, [dispatch, navigate, productId, product, successCreate, myRef])

  const changeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const types = ['image/png', 'image/jpeg', 'image/jpg']

  const imageChangeHandler = async e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file && types.includes(file.type)) {
      await uploadFileHandler(file)
    }
  }

  const uploadFileHandler = file => {
    if (!file) return
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )

        setProgress(prog)
      },
      err => setImageError(err),
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then(url => setUrl(url))
      }
    )
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

    if (!productId) {
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
        _id: productId,
        name: name,
        image: url,
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

              <Form.Group controlId='image' className='mb-4 text-center'>
                <Form.Label style={{ fontWeight: 'bold' }}>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={
                    'Enter text' !== null || '' ? image : 'Enter Image URL'
                  }
                  value={product ? product.image : image ? image : ''}
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
                  onChange={imageChangeHandler}
                />
              </Form.Group>
              <div className='progress-bar' style={{ width: progress + '%' }} />

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
                <Form.Label>Article</Form.Label>
                <Form.Control
                  type='text'
                  name='article'
                  placeholder={product ? product.article : 'Add article'}
                  onChange={changeHandler}
                  value={article}
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Video</Form.Label>
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
