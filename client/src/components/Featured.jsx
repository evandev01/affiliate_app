import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import Product from './Product'

const Featured = ({ type, title, products, user }) => {
  return (
    <>
      <Row className='mt-5 mb-3' id='border'>
        <Col>
          <h5 className='p-2'>{title}</h5>
        </Col>
      </Row>
      <Row className='mt-3 mb-3'>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link to={`/products/${type}`}>
            <Button>View All</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        {products &&
          products.map((product, index) => (
            <Product key={index} product={product} index={index} user={user} />
          ))}
      </Row>
    </>
  )
}

export default Featured
