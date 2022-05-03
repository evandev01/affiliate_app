import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import ProductEdit from './pages/ProductEdit'
import Search from './pages/Search'

const App = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path='/search/:id' element={<Search />} />
          <Route path='/edit/:id' element={<ProductEdit />} />
          <Route path='/edit' element={<ProductEdit />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
