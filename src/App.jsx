import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { useState, useEffect } from 'react'
import HomePage from './routes/home-page'
import CreateProductPage from './routes/create-product'
import MyProductsPage from './routes/my-products'
import './App.css'
import Layout from './components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { categorias } from './data'
import useStore from './store'



function App() {
  const initializeProducts = useStore((state) => state.initializeProducts);

  useEffect(() => {
    initializeProducts();
  }, [initializeProducts]);


  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Layout />}>
          <Route index element={<HomePage categories={categorias}/>}/>
          <Route path='create' element={<CreateProductPage/>} />
          <Route path='my-products' element={<MyProductsPage/>}/>
        </Route>
      </Routes>

    </Router>
  )
}

export default App
