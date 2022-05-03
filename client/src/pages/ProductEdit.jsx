import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config'
import { getProductById } from '../features/product/productSlice'
import ProductForm from '../components/ProductForm'

const ProductEdit = () => {
  const { id } = useParams()
  const productId = id
  let myRef = React.createRef()
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState('')
  const [imageError, setImageError] = useState('')

  const dispatch = useDispatch()

  const {
    product,
    successProduct,
    loading,
    errorProduct,
    errorCreate,
    errorUpdate,
    message,
  } = useSelector(state => state.products)

  useEffect(() => {
    if (productId && !successProduct) {
      dispatch(getProductById(productId))
    }
  }, [dispatch, productId, successProduct])

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
        onImageChange={imageChangeHandler}
        url={url}
        setUrl={setUrl}
        myRef={myRef}
        progress={progress}
        imageError={imageError}
      />
    </>
  )
}

export default ProductEdit
