import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Button, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import { getProducts } from '../features/product/productSlice'

const Search = () => {
  const { searchWord } = useParams()

  const dispatch = useDispatch()

  const { products, loading, success, error, message } = useSelector(
    state => state.products
  )

  const { user } = useSelector(state => state.auth)

  const searchResult = products.filter(product =>
    product.name.toLowerCase().includes(searchWord.toLowerCase())
  )

  useEffect(() => {
    if (!success) {
      dispatch(getProducts())
    }
  }, [dispatch, success])

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message variant='danger'>{message}</Message>}
        {searchResult.length === 0 ? (
          <>
            <Link to='/'>
              <Button className='p-3 m-2'>Go Back</Button>
            </Link>
            <Message variant='warning'>Product not found.</Message>
          </>
        ) : (
          <Row>
            {products &&
              products
                .filter(product =>
                  product.name.toLowerCase().includes(searchWord.toLowerCase())
                )
                .map((product, index) => (
                  <Product product={product} index={index} user={user} />
                ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default Search
