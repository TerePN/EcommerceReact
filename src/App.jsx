import { useEffect, useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import Container from 'react-bootstrap/esm/Container'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {

  const isLoadind = useSelector(state => state.isLoading)
  const dispatch = useDispatch()

  useEffect( () =>{
    dispatch(getProductsThunk())
  }, [])

  return (
    <div className="App">
      <HashRouter>
        <MyNavBar/>
        {isLoadind && <LoadingScreen/>}
        <Container className='mt-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes/> } >
          <Route path='/Purchases' element={<Purchases />} />
          </Route>
        </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
