import { useSelector, useDispatch } from 'react-redux';
import {
  getCart,
  removeFromCart,
  updateQuantity,
  updateComment,
} from '../../../redux/cartRedux';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCart);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };
  const handleCommentChange = (id, comment) => {
    dispatch(updateComment({ id, comment }));
  };
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Obliczanie sumy całkowitej
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <Container className='text-center my-5'>
        <h2>Your cart is empty</h2>
        <Link to='/'>
          <Button
            variant='outline-dark'
            className='mt-3 text-uppercase fw-bold'
          >
            Back to the shop
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className='my-5'>
      <h1 className='display-5 fw-bold text-uppercase mb-5 text-center'>
        Your cart
      </h1>
      <Row>
        <Col lg={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className='mb-3 border-0 shadow-sm rounded-0'>
              <Card.Body>
                <Row className='align-items-center text-center text-md-start'>
                  <Col md={4}>
                    <h5 className='fw-bold text-uppercase mb-1'>{item.name}</h5>
                    <p className='text-warning fw-bold mb-0'>
                      {item.price / 100} PLN
                    </p>
                  </Col>

                  <Col md={2} className='my-3 my-md-0'>
                    <Form.Control
                      type='number'
                      min='1'
                      value={item.quantity}
                      onChange={(event) =>
                        handleQuantityChange(item.id, event.target.value)
                      }
                      className='rounded-0 border-dark'
                    />
                  </Col>

                  <Col md={5}>
                    <Form.Control
                      placeholder='Add comments'
                      value={item.comment || ''}
                      onChange={(event) =>
                        handleCommentChange(item.id, event.target.value)
                      }
                      className='rounded-0 border-light bg-light small'
                    />
                  </Col>

                  <Col md={1}>
                    <Button
                      variant='link'
                      className='text-danger p-0'
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrash size={18} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Podsumowanie po prawej */}

        <Col lg={4}>
          <Card
            className='p-4 border-0 shadow-sm rounded-0 bg-light sticky-top'
            style={{ top: '20px' }}
          >
            <h4 className='fw-bold text-uppercase mb-4'>Summary</h4>
            <div className='d-flex justify-content-between mb-3'>
              <span>Products:</span>
              <span className='fw-bold'>{totalPrice / 100} PLN</span>
            </div>
            <div className='d-flex justify-content-between border-top pt-3 mb-4'>
              <span className='fs-5 fw-bold text-uppercase'>Total:</span>
              <span className='fs-5 fw-bold text-warning'>
                {totalPrice / 100} PLN
              </span>
            </div>
            <Link to='/order'>
              <Button
                variant='dark'
                className='w-100 py-3 text-uppercase fw-bold rounded'
              >
                Go to the order
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
