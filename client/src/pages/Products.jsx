import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Pagination from '../components/Pagination'
import {
  getProducts,
  getRandomProducts,
} from '../features/product/productSlice'

const Products = () => {
  const { id, keyword, productAmount } = useParams()
  const pageNumberId = id - 1
  const productType = keyword
  const productCount = productAmount
  const [productsPerPage, setProductsPerPage] = useState(
    productCount ? productCount : 5
  )
  const [random, setRandom] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const dispatch = useDispatch()

  const {
    products,
    randomProducts,
    success,
    successRandom,
    loading,
    error,
    message,
  } = useSelector(state => state.products)

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (productType === 'all' && !successRandom) {
      setRandom(true)
      dispatch(getRandomProducts())
    } else if (!success) {
      dispatch(getProducts())
    }
  }, [dispatch, success, productType, successRandom])

  // Index of first product on page
  const start = productsPerPage * (pageNumberId ? pageNumberId : 0)
  // Index of last product on page
  const end = start + productsPerPage

  const typeProducts = products.filter(product => product.type === productType)

  return (
    <>
      <Container>
        <Row>
          {loading && <Loader />}
          {error && <Message variant='danger'>{message}</Message>}
        </Row>
        <Row>
          <Col>
            {/* {!random } */}
            <Dropdown>
              <DropdownButton id='dropdown-basic-button' title='View'>
                <Dropdown.Item>Products Per Page</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => setProductsPerPage(5)}
                  href={`/products/${
                    productType && productType
                  }/1/${productsPerPage}`}
                >
                  5
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setProductsPerPage(10)}
                  href={`/products/${
                    productType && productType
                  }/1/${productsPerPage}`}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setProductsPerPage(20)}
                  href={`/products/${
                    productType && productType
                  }/1/${productsPerPage}`}
                >
                  20
                </Dropdown.Item>
              </DropdownButton>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {productType === 'all' && randomProducts
            ? randomProducts.slice(start, end).map((product, i) => (
                <Col md={4} key={i}>
                  <Product key={i} product={product} index={i} user={user} />
                </Col>
              ))
            : productType && typeProducts
            ? typeProducts.slice(start, end).map((product, i) => (
                <Col md={4} key={i}>
                  <Product key={i} product={product} index={i} user={user} />
                </Col>
              ))
            : products &&
              products
                .slice(start, end)
                .map((product, i) => (
                  <Product key={i} product={product} index={i} user={user} />
                ))}
        </Row>
        <Row>
          <Pagination
            totalProducts={
              productType && random && randomProducts
                ? randomProducts.length
                : productType && typeProducts
                ? typeProducts.length
                : products && products.length
            }
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
            pageNumberId={pageNumberId}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            type={productType}
          />
        </Row>
      </Container>
    </>
  )
}

export default Products
