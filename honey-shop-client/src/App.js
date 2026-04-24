import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
//action imports
import { fetchProducts } from './redux/productsRedux';
//views imports
import Home from './components/pages/Home/Home';
import ProductDetails from './components/pages/ProductDetails/ProductDetails';
import Cart from './components/pages/Cart/Cart';
import Order from './components/pages/Order/Order';
import NotFound from './components/pages/NotFound/NotFound';
//const elements imports
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchProducts()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
