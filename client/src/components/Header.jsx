import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Image,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import Fireworks from '../assets/fireworks.mp4'
import Logo from '../assets/icons/evanDev_logo.png'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const [searchWord, setSearchWord] = useState('')

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  return (
    <>
      <header id='header' className='text-center mt-5'>
        <div id='video-div'>
          <video id='header-video' loop autoPlay muted>
            <source src={Fireworks} type='video/mp4' />
          </video>
        </div>
      </header>

      <Container>
        <Row>
          <Navbar bg='light' expand='lg'>
            <Navbar.Brand href='/'>
              <Image id='logo' src={Logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='/'>Home</Nav.Link>
                <NavDropdown title='Categories' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/products/all'>
                    View All
                  </NavDropdown.Item>
                  <NavDropdown.Item href={'/products/tech'}>
                    Tech
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/products/kitchen'>
                    Kitchen
                  </NavDropdown.Item>
                  <NavDropdown.Item href={'/products/outdoors'}>
                    Hunting/Outdoors
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href={'/products/forHim'}>
                    Gift Ideas For Him
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/products/forHer'>
                    Gift Ideas For Her
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title='Featured' id='basic-nav-dropdown'>
                  <NavDropdown.Item href='/#tech'>Tech</NavDropdown.Item>
                  <NavDropdown.Item href='/#kitchen'>Kitchen</NavDropdown.Item>
                  <NavDropdown.Item href='/#outdoors'>
                    Hunting/Outdoors
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/#gift_ideas_for_him'>
                    Gift Ideas For Him
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/#gift_ideas_for_her'>
                    Gift Ideas For Her
                  </NavDropdown.Item>
                </NavDropdown>
                {user && user.isAdmin && (
                  <NavDropdown title='Admin'>
                    <NavDropdown.Item href='/edit'>
                      Add Product
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/edit'>
                      Edit Products
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => dispatch(logout())}
                      href='/'
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              <Form className='d-flex'>
                <FormControl
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={e => setSearchWord(e.target.value)}
                  value={searchWord}
                />
                <Link to={`/search/${searchWord}`}>
                  <Button variant='outline-success'>Search</Button>
                </Link>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
      <p className='text-center'>
        The best products, the best prices, just for you!
      </p>
    </>
  )
}

export default Header
