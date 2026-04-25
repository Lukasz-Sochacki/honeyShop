import { useSelector, useDispatch } from 'react-redux';
import { getCart, sendOrderRequest, clearCart } from '../../../redux/cartRedux';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const cartItems = useSelector(getCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pola formularza
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  if (cartItems.length === 0) return <Navigate to='/' />;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      clientName: name,
      clientAddress: address,
      clientEmail: email,
      totalPrice: totalPrice,
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        comment: item.comment,
      })),
    };

    await dispatch(sendOrderRequest(orderData));
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <Container className='my-5'>
      <h1 className='display-5 fw-bold text-uppercase mb-5 text-center'>
        Order summary
      </h1>
      <Row className='g-5'>
        {/* Kolumna Lewa: Twoje Produkty */}
        <Col lg={6}>
          <h4 className='fw-bold mb-4 text-uppercase'>Your honey</h4>
          <ListGroup variant='flush' className='border-bottom'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} className='px-0 py-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6 className='fw-bold mb-0'>
                      {item.name} x {item.quantity}
                    </h6>
                    {item.comment && (
                      <small className='text-muted'>
                        Comments: {item.comment}
                      </small>
                    )}
                  </div>
                  <span className='fw-bold'>
                    {(item.price * item.quantity) / 100} PLN
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className='d-flex justify-content-between mt-4'>
            <span className='fs-4 fw-bold'>PAYMENT: </span>
            <span className='fs-4 fw-bold text-warning'>
              {totalPrice / 100} PLN
            </span>
          </div>
        </Col>
        {/* Kolumna Prawa: Formularz */}
        <Col lg={6} className='bg-light p-4 p-md-5 rounded shadow-sm'>
          <h4 className='fw-bold mb-4 text-uppercase'>Shipping details</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label className='small fw-bold text-uppercase'>
                Name and surname
              </Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='e.g. John Doe'
                className='rounded-0 border-dark'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label className='small fw-bold text-uppercase'>
                Delivery address
              </Form.Label>
              <Form.Control
                required
                as='textarea'
                rows={2}
                placeholder='Street, house number, zip code, city'
                className='rounded-0 border-dark'
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label className='small fw-bold text-uppercase'>
                E-mail address
              </Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='e.g. johndoe@example.com'
                className='rounded-0 border-dark'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Button
              type='submit'
              variant='dark'
              className='w-100 py-3 text-uppercase fw-bold rounded-0'
            >
              Confirm the order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
