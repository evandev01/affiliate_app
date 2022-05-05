import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap'
import Fireworks from '../assets/fireworks.mp4'

const Header = () => {
  const [keyword, setKeyword] = useState('')

  const { user } = useSelector(state => state.auth)

  return (
    <header className='py-3 my-3'>
      <Container>
        <Row className='text-center'>
          <Col>
            <div id='header-div'>
              <h1>Evan's</h1>
              <div id='header-video-div'>
                <video id='header-video' loop autoPlay muted>
                  <source src={Fireworks} type='video/mp4' />
                </video>
              </div>
              <h1>Best</h1>
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div id='header-image' /> */}

      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Evan's Best</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <NavDropdown title='Categories' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/products/tech'>Tech</NavDropdown.Item>
                <NavDropdown.Item href='/products/kitchen'>
                  Kitchen
                </NavDropdown.Item>
                <NavDropdown.Item href='/products/outdoors'>
                  Hunting/Outdoors
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/products/for-him'>
                  Gift Ideas For Him
                </NavDropdown.Item>
                <NavDropdown.Item href='products/for-her'>
                  Gift Ideas For Her
                </NavDropdown.Item>
              </NavDropdown>
              {user && user.isAdmin && (
                <NavDropdown title='Admin'>
                  <NavDropdown.Item href='/edit'>Add Product</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/edit'>
                    Edit Products
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Form className='d-flex'>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                onChange={e => setKeyword(e.target.value)}
                value={keyword}
              />
              <Link to={`/search/${keyword}`}>
                <Button variant='outline-success'>Search</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p className='text-center p-2'>
        The best products, the best prices, just for you!
      </p>
    </header>
  )
}

export default Header
