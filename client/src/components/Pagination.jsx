import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
  type,
}) => {
  // If the remainder of total products is 1,
  // ex: totalProducts= 6 / productsPerPage= 5 = 1.2
  // Round up page count to next whole number = 2
  const pageCount = Math.ceil(totalProducts / productsPerPage)

  const navigate = useNavigate()

  const pages = Array.from({ length: pageCount }, (v, i) => i)

  const [isNavigate, setIsNavigate] = useState(false)

  const handlePrev = e => {
    e.preventDefault()
    setIsNavigate(false)
    setCurrentPage(currentPage === pages[0] ? pages[0] : currentPage - 1)
    setIsNavigate(true)
  }
  const handleNext = e => {
    e.preventDefault()
    setIsNavigate(false)
    setCurrentPage(
      currentPage === pages.length - 1 ? pages.length - 1 : currentPage + 1
    )
    setIsNavigate(true)
  }
  const handleCurrent = (e, page) => {
    e.preventDefault()
    setIsNavigate(false)
    setCurrentPage(page)
    setIsNavigate(true)
  }

  useEffect(() => {
    if (isNavigate && type !== null) {
      navigate(`/products/${type}/${currentPage + 1}`)
    }
    if (isNavigate && type === null) {
      navigate(`/products/${currentPage + 1}`)
    }
  }, [navigate, isNavigate, type, currentPage])

  return (
    <>
      <Container>
        <Row>
          <Col className='text-center'>
            <table
              className='center'
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
              <tbody>
                <tr>
                  <td>
                    <Button onClick={handlePrev}>
                      <FontAwesomeIcon icon={faCircleArrowLeft} />
                    </Button>
                  </td>
                  {pages &&
                    pages.map(page => (
                      <td key={page}>
                        <Button
                          className='btn btn-block'
                          key={page}
                          onClick={e => {
                            handleCurrent(e, page)
                          }}
                        >
                          {page + 1}
                        </Button>
                      </td>
                    ))}
                  <td>
                    <Button onClick={handleNext}>
                      <FontAwesomeIcon icon={faCircleArrowRight} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Pagination
