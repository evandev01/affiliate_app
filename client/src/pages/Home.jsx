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

  const productsKitchen = products.filter(
    product => product.type === 'kitchen' && product.featured === true
  )
  const productsForHim = products.filter(
    product => product.type === 'forHim' && product.featured === true
  )
  const productsForHer = products.filter(
    product => product.type === 'forHer' && product.featured === true
  )

  const productsOutdoors = products.filter(
    product => product.type === 'outdoors' && product.featured === true
  )

  const productsTech = products.filter(
    product => product.type === 'tech' && product.featured === true
  )

  return (
    <>
      {errorProducts ||
        (errorDelete && <Message variant='danger'>{message}</Message>)}
      {loading && <Loader />}

      <ProductCarousel />

      <Featured
        type='tech'
        title='Featured Tech'
        products={products && productsTech && productsTech}
        user={user && user}
      />

      <Featured
        type='outdoors'
        title='Featured Outdoors'
        products={products && productsOutdoors && productsOutdoors}
        user={user && user}
      />

      <Featured
        type='kitchen'
        title='Featured Kitchen'
        products={products && productsKitchen && productsKitchen}
        user={user && user}
      />

      <Featured
        type='forHim'
        title='Featured Gift Ideas For Him'
        products={products && productsForHim && productsForHim}
        user={user && user}
      />

      <Featured
        type='forHer'
        title='Featured Gift Ideas For Her'
        products={products && productsForHer && productsForHer}
        user={user && user}
      />
    </>
  )
}

export default Home
