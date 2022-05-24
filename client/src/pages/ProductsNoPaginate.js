import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Pagination from '../components/Pagination'
import {
  getProducts,
  getRandomProducts,
} from '../features/product/productSlice'

const Products = () => {
  const { id } = useParams()
  const productType = id

  const dispatch = useDispatch()

  const { products, randomProducts, loading, error, message } = useSelector(
    state => state.products
  )
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (id === 'all') {
      dispatch(getRandomProducts())
    } else {
      dispatch(getProducts())
    }
  }, [dispatch, id])

  return (
    <>
      <Container>
        <Row>
          {loading && <Loader />}
          {error && <Message variant='danger'>{message}</Message>}
          {randomProducts
            ? randomProducts.map((product, index) => (
                <Product product={product} index={index} user={user} />
              ))
            : products &&
              products
                .filter(product => product.type === productType)
                .map((product, index) => (
                  <Product product={product} index={index} user={user} />
                ))}
        </Row>
      </Container>
    </>
  )
}

export default Products
