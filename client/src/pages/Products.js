import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import { getProducts } from '../features/product/productSlice'

const Products = () => {
  const { id } = useParams()
  const productType = id

  const dispatch = useDispatch()

  const { products, loading, error, message } = useSelector(
    state => state.products
  )
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const productsArray = products.filter(product => product.type === productType)

  return (
    <>
      <Container>
        <Row>
          {loading && <Loader />}
          {error && <Message variant='danger'>{message}</Message>}

          {productsArray &&
            productsArray.map((product, index) => (
              <Product product={product} index={index} user={user} />
            ))}
        </Row>
      </Container>
    </>
  )
}

export default Products
