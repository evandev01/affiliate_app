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
import ProductForm from '../components/ProductForm'

const ProductEdit = () => {
  const { id } = useParams()
  const productId = id
  let myRef = React.createRef()
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    desc: '',
    article: '',
    video: '',
  })
  const { name, link, desc, article, video } = formData

  const [url, setUrl] = useState('')
  const [imageError, setImageError] = useState('')
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    product,
    successProduct,
    successCreate,
    successUpdate,
    loading,
    errorProduct,
    errorCreate,
    errorUpdate,
    message,
  } = useSelector(state => state.products)

  useEffect(() => {
    if (productId && !product) {
      dispatch(getProductById(productId))
    }
  }, [
    dispatch,
    navigate,
    productId,
    product,
    successCreate,
    successUpdate,
    successProduct,
    myRef,
  ])

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
      console.log('file: ' + file)
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        errorCreate ||
        errorUpdate ||
        (errorProduct && <Message variant='danger'>{message}</Message>)
      )}
      <ProductForm
        product={product ? product : null}
        onChange={changeHandler}
        onImageChange={imageChangeHandler}
        onUpload={uploadFileHandler}
        url={url}
        setUrl={setUrl}
        myRef={myRef}
        progress={progress}
        imageError={imageError}
      />
    </>

    // <>
    //   <Container>
    //     <Row>
    //       {loading && <Loader />}
    //       {errorProduct ||
    //         errorUpdate ||
    //         (errorCreate && <Message variant='danger'>{message}</Message>)}
    //       <Col>
    //         <Form onSubmit={submitHandler}>
    //           <Form.Group className='mb-3'>
    //             <Form.Label>Product Name</Form.Label>
    //             <Form.Control
    //               type='text'
    //               name='name'
    //               placeholder='Enter product name'
    //               onChange={changeHandler}
    //               value={
    //                 product ? product.name : name ? name : name === '' && name
    //               }
    //             />
    //           </Form.Group>
    //           <Form.Group controlId='image' className='mb-4 text-center'>
    //             <Form.Label style={{ fontWeight: 'bold' }}>Image</Form.Label>
    //             <Form.Control
    //               type='text'
    //               placeholder='Enter Image URL'
    //               value={
    //                 url ? url : url === '' ? url : product && product.image
    //               }
    //               onChange={e => setUrl(e.target.value)}
    //             />
    //           </Form.Group>

    //           <Form.Group
    //             controlId='formFile'
    //             className='mt-3 mb-3 text-center'
    //           >
    //             <Form.Label style={{ fontWeight: 'bold' }}>
    //               Upload Image
    //             </Form.Label>
    //             <Form.Control
    //               type='file'
    //               ref={myRef}
    //               onChange={imageChangeHandler}
    //             />
    //           </Form.Group>
    //           <div className='progress-bar' style={{ width: progress + '%' }} />
    //           {imageError && <Message variant='danger'>{imageError}</Message>}

    //           <Form.Group className='mb-3'>
    //             <Form.Label>Link</Form.Label>
    //             <Form.Control
    //               type='text'
    //               name='link'
    //               placeholder='Enter image URL'
    //               onChange={changeHandler}
    //               value={
    //                 link ? link : link === '' ? link : product && product.link
    //               }
    //             />
    //           </Form.Group>

    //           <Form.Group className='mb-3'>
    //             <Form.Label>Description</Form.Label>
    //             <Form.Control
    //               type='text'
    //               name='desc'
    //               placeholder='Enter description'
    //               onChange={changeHandler}
    //               value={
    //                 desc ? desc : desc === '' ? desc : product && product.desc
    //               }
    //             />
    //           </Form.Group>

    //           <Form.Group className='mb-3'>
    //             <Form.Label>Article</Form.Label>
    //             <Form.Control
    //               type='text'
    //               name='article'
    //               placeholder='Add article'
    //               onChange={changeHandler}
    //               value={
    //                 article
    //                   ? article
    //                   : article === ''
    //                   ? article
    //                   : product && product.article
    //               }
    //             />
    //           </Form.Group>

    //           <Form.Group className='mb-3'>
    //             <Form.Label>Video</Form.Label>
    //             <Form.Control
    //               type='text'
    //               name='video'
    //               placeholder='Add video'
    //               onChange={changeHandler}
    //               value={
    //                 video
    //                   ? video
    //                   : video === ''
    //                   ? video
    //                   : product && product.video
    //               }
    //             />
    //           </Form.Group>

    //           <Button variant='primary' type='text'>
    //             Submit
    //           </Button>
    //         </Form>
    //       </Col>
    //     </Row>
    //   </Container>
    // </>
  )
}

export default ProductEdit
