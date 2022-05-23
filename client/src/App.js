import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import ProductEdit from './pages/ProductEdit'
import Search from './pages/Search'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Container
        style={{
          background: 'none',
          paddingRight: '10%',
          paddingLeft: '10%',
        }}
        fluid
      >
        <Header />
        <Routes>
          <Route path='/search/:searchWord' element={<Search />} />
          <Route path='/edit/:id' element={<ProductEdit />} />
          <Route path='/products/:keyword/:id' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/edit' element={<ProductEdit />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  )
}

export default App
