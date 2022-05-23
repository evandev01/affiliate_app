import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import { getProducts } from '../features/product/productSlice'
import Featured from '../components/Featured'

const Home = () => {
  const dispatch = useDispatch()

  const {
    products,
    success,
    successCreate,
    successUpdate,
    successDelete,
    loading,
    errorProducts,
    errorDelete,
    message,
  } = useSelector(state => state.products)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!success || successUpdate || successCreate) {
      dispatch(getProducts())
    }
  }, [dispatch, successDelete, success, successUpdate, successCreate])

  return (
    <>
      {/* <Container> */}
      {errorProducts ||
        (errorDelete && <Message variant='danger'>{message}</Message>)}
      {loading && <Loader />}

      <ProductCarousel />

      <Featured
        type='kitchen'
        title='Featured Kitchen'
        products={products && products}
        user={user && user}
      />

      <Featured
        type='forHim'
        title='Featured Gift Ideas For Him'
        products={products && products}
        user={user && user}
      />

      <Featured
        type='outdoors'
        title='Featured Outdoors'
        products={products && products}
        user={user && user}
      />

      <Featured
        type='tech'
        title='Featured Tech'
        products={products && products}
        user={user && user}
      />
      {/* </Container> */}
    </>
  )
}

export default Home
