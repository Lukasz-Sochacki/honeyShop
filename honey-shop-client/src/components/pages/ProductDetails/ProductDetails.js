import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';
import { Row, Col, Button, Form, Container, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { addToCart } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';
import styles from '../ProductDetails/ProductDetails.module.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => getProductById(state, id));

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.mainImage);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showLightbox, setShowLightBox] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.mainImage);
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }
    }
  }, [product]);

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        variantId: selectedVariant.id,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        quantity: quantity,
        comment: '',
      }),
    );
    setShowModal(true);
  };

  if (!product) return <Navigate to='/' />;

  return (
    <Container className='my-5'>
      {/* MODAL LIGHTBOX - Powiększone zdjęcie */}
      <Modal
        show={showLightbox}
        onHide={() => setShowLightBox(false)}
        size='lg'
        centered
        contentClassName='bg-transparent border-0'
      >
        <Modal.Body className='p-0 text-center'>
          <img
            src={process.env.PUBLIC_URL + activeImage}
            alt='Full size'
            className='img-fluid rounded shadow-lg'
            style={{ maxHeight: '90vh' }}
          />
          <Button
            variant='light'
            className='position-absolute top-0 end-0 m-3 rounded-circle'
            onClick={() => setShowLightBox(false)}
          >
            &times;
          </Button>
        </Modal.Body>
      </Modal>

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
            style={{ height: '450px', overflow: 'hidden', cursor: 'zoom-in' }}
            onClick={() => setShowLightBox(true)}
          >
            <img
              src={process.env.PUBLIC_URL + activeImage}
              alt={product.name}
              className={`img-fluid ${styles.transitionScale}`}
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
                className={`rounded shadow-sm d-flex align-items-center justify-content-center bg-light ${activeImage === product.mainImage ? 'border border-warning' : ''}`}
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
                    className={`rounded shadow-sm d-flex align-items-center justify-content-center bg-light ${activeImage === img.url ? 'border border-warning' : ''}`}
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
              {selectedVariant
                ? selectedVariant.price / 100
                : product.price / 100}{' '}
              PLN
            </p>
            <hr />
            <p className='text-muted mb-5' style={{ lineHeight: '1.8' }}>
              {product.description}
            </p>

            <Form onSubmit={handleAddToCart}>
              {/* WYBÓR GRAMATURY */}
              <Form.Group className='mb-4'>
                <Form.Label className='small fw-bold text-uppercase'>
                  Choose grammage
                </Form.Label>
                <Form.Select
                  className='rounded-0 border-dark'
                  value={selectedVariant?.id || ''}
                  onChange={(e) => {
                    const variant = product.variants.find(
                      (v) => v.id === e.target.value,
                    );
                    setSelectedVariant(variant);
                  }}
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} - {v.price / 100} PLN
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className='mb-3' style={{ width: '100px' }}>
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
                type='submit'
                variant='primary'
                className='w-100 py-2 text-uppercase fw-bold rounded-0'
              >
                Add to the cart
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
