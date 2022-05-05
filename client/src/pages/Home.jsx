import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Product from '../components/Product'
import { getProducts } from '../features/product/productSlice'

const Home = () => {
  const dispatch = useDispatch()

  const {
    products,
    successDelete,
    loading,
    errorProducts,
    errorDelete,
    message,
  } = useSelector(state => state.products)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch, successDelete])

  return (
    <div>
      <Container style={{ background: 'none' }}>
        <Row className='text-center'>
          {errorProducts ||
            (errorDelete && <Message variant='danger'>{message}</Message>)}
          {loading && <Loader />}
          {products &&
            products.map((product, index) => (
              <Product product={product} index={index} user={user} />
            ))}
        </Row>
      </Container>
    </div>
  )
}

export default Home
