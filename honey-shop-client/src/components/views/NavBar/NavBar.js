import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';
const NavBar = () => {
  const cartItems = useSelector(getCart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg='white' expand='lg' className='py-4 border-bottom mb-4'>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to='/'
          className='fw-bold fs-3 text-uppercase'
        >
          Honey <span className='text-warning'>Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto align-items-center'>
            <Nav.Link
              as={NavLink}
              to='/'
              className='text-uppercase fw-semibold mx-2'
            >
              Shop
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to='/cart'
              className='mx-2 position-relative'
            >
              <FaShoppingBasket size={24} />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg='warning'
                  text='dark'
                  className='position-absolute top-0 start-100 translate-middle'
                >
                  {totalItems}
                </Badge>
              )}
              {/* Tutaj w przyszłości dodamy licznik produktów w koszyku */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
