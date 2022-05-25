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
    loading,
    error,
    successCreate,
    successUpdate,
    successDelete,
    errorDelete,
    message,
  } = useSelector(state => state.products)

  const { user } = useSelector(state => state.auth)

  const productsKitchen =
    products &&
    Array.from(products).filter(
      product => product.type === 'kitchen' && product.featured === true
    )
  const productsForHim =
    products &&
    Array.from(products).filter(
      product => product.type === 'forHim' && product.featured === true
    )
  const productsForHer =
    products &&
    Array.from(products).filter(
      product => product.type === 'forHer' && product.featured === true
    )

  const productsOutdoors =
    products &&
    Array.from(products).filter(
      product => product.type === 'outdoors' && product.featured === true
    )

  const productsTech =
    products &&
    Array.from(products).filter(
      product => product.type === 'tech' && product.featured === true
    )

  useEffect(() => {
    if (!success || successUpdate || successCreate) {
      dispatch(getProducts())
    }
  }, [dispatch, successDelete, success, successUpdate, successCreate])

  return (
    <>
      {error || (errorDelete && <Message variant='danger'>{message}</Message>)}
      {loading && <Loader />}

      <ProductCarousel />

      <Featured
        type='tech'
        title='Featured Tech'
        products={productsTech && productsTech}
        user={user && user}
        error={error}
        loading={loading}
        message={message}
      />

      <Featured
        type='outdoors'
        title='Featured Outdoors'
        products={productsOutdoors && productsOutdoors}
        user={user && user}
        error={error}
        loading={loading}
        message={message}
      />

      <Featured
        type='kitchen'
        title='Featured Kitchen'
        products={productsKitchen && productsKitchen}
        user={user && user}
        error={error}
        loading={loading}
        message={message}
      />

      <Featured
        type='forHim'
        title='Featured Gift Ideas For Him'
        products={productsForHim && productsForHim}
        user={user && user}
        error={error}
        loading={loading}
        message={message}
      />

      <Featured
        type='forHer'
        title='Featured Gift Ideas For Her'
        products={productsForHer && productsForHer}
        user={user && user}
        error={error}
        loading={loading}
        message={message}
      />
    </>
  )
}

export default Home
