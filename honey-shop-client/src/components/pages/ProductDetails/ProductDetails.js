import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { Row, Col, Button, Form, Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { addToCart } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => getProductById(state, id));
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.mainImage);

  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        comment: '',
      }),
    );
    setShowModal(true);
  };

  if (!product) return <Navigate to='/' />;

  return (
    <Container className='my-5'>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className='border-0'>
          <Modal.Title className='fw-bold text-uppercase'>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center py-4'>
          Product <strong>{product.name}</strong> (quantity: {quantity}) has
          been added to cart!
        </Modal.Body>
        <Modal.Footer className='border-0 justify-content-center'>
          <Button
            variant='outline-dark'
            className='rounded-0 fw-bold'
            onClick={() => setShowModal(false)}
          >
            Continue shopping
          </Button>
          <Link to='/cart'>
            <Button variant='dark' className='rounded-0 fw-bold'>
              Go to the cart
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <Row className='align-items-start'>
        <Col md={6}>
          {/* Zdjęcie główne - teraz całe będzie widoczne */}
          <div
            className='mb-3 rounded shadow-sm d-flex align-items-center justify-content-center bg-light'
            style={{ height: '450px', overflow: 'hidden' }}
          >
            <img
              src={process.env.PUBLIC_URL + activeImage}
              alt={product.name}
              className='img-fluid mb-3'
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Galeria dodatkowych zdjęć */}
          <Row className='g-2'>
            {/* Opcjonalnie: warto dodać miniaturkę zdjęcia głównego na początek, 
      żeby klient mógł do niego wrócić po kliknięciu w detale */}
            <Col xs={3}>
              <div
                className='rounded shadow-sm d-flex align-items-center justify-content-center bg-light'
                style={{
                  height: '100px',
                  overflow: 'hidden',
                  border: '1px solid #eee',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveImage(product.mainImage)} // Tutaj wracamy do głównego
              >
                <img
                  src={process.env.PUBLIC_URL + product.mainImage}
                  className='img-fluid mt-3'
                  style={{ objectFit: 'contain', height: '100%' }}
                  alt='main'
                />
              </div>
            </Col>
            {product.images &&
              product.images.map((img) => (
                <Col xs={3} key={img.id}>
                  <div
                    className='rounded shadow-sm d-flex align-items-center justify-content-center bg-light'
                    style={{
                      height: '100px',
                      overflow: 'hidden',
                      border: '1px solid #eee',
                      cursor: 'pointer',
                    }}
                    onClick={() => setActiveImage(img.url)}
                  >
                    <img
                      src={process.env.PUBLIC_URL + img.url}
                      alt='detail'
                      className='img-fluid'
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
        {/* Prawa kolumna: Tekst i Formularz */}
        <Col md={6} className='ps-md-5'>
          <div className='sticky-top' style={{ top: '20px' }}>
            <h1 className='display-5 fw-bold text-uppercase mb-3'>
              {product.name}
            </h1>
            <p className='fs-3 fw-bold text-warning mb-4'>
              {product.price / 100} PLN
            </p>
            <hr />
            <p className='text-muted mb-5' style={{ lineHeight: '1.8' }}>
              {product.description}
            </p>
            <Form className='d-flex align-items-end gap-3'>
              <Form.Group style={{ width: '100px' }}>
                <Form.Label className='small fw-bold text-uppercase'>
                  Quantity
                </Form.Label>
                <Form.Control
                  type='number'
                  min='1'
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className='rounded-0 border-dark py-2'
                />
              </Form.Group>

              <Button
                variant='primary'
                className='flex-grow-1 py-2 text-uppercase fw-bold rounded-0 shadow-sm'
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
