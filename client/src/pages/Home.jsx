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
    products.filter(
      product => product.type === 'kitchen' && product.featured === true
    )
  const productsForHim =
    products &&
    products.filter(
      product => product.type === 'forHim' && product.featured === true
    )
  const productsForHer =
    products &&
    products.filter(
      product => product.type === 'forHer' && product.featured === true
    )

  const productsOutdoors =
    products &&
    products.filter(
      product => product.type === 'outdoors' && product.featured === true
    )

  const productsTech =
    products &&
    products.filter(
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

      <div id='tech'>
        <Featured
          title='Featured Tech'
          type='tech'
          products={productsTech && productsTech}
          user={user && user}
          error={error}
          loading={loading}
          message={message}
        />
      </div>

      <div id='outdoors'>
        <Featured
          title='Featured Outdoors'
          type='outdoors'
          products={productsOutdoors && productsOutdoors}
          user={user && user}
          error={error}
          loading={loading}
          message={message}
        />
      </div>

      <div id='kitchen'>
        <Featured
          title='Featured Kitchen'
          type='kitchen'
          products={productsKitchen && productsKitchen}
          user={user && user}
          error={error}
          loading={loading}
          message={message}
        />
      </div>

      <div id='gift_ideas_for_him'>
        <Featured
          title='Featured Gift Ideas For Him'
          type='forHim'
          products={productsForHim && productsForHim}
          user={user && user}
          error={error}
          loading={loading}
          message={message}
        />
      </div>

      <div id='gift_ideas_for_her'>
        <Featured
          title='Featured Gift Ideas For Her'
          type='forHer'
          products={productsForHer && productsForHer}
          user={user && user}
          error={error}
          loading={loading}
          message={message}
        />
      </div>
    </>
  )
}

export default Home
