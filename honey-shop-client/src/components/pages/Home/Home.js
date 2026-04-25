import { useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/productsRedux';
import { Row, Col, Card, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../Home/Home.module.scss';
import { useState } from 'react';

const Home = () => {
  const products = useSelector(getAllProducts);
  const [searchPhrase, setSearchPhrase] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchPhrase.toLowerCase()),
  );

  return (
    <Container>
      <div
        className={styles.hero}
        style={{
          backgroundImage: `linear-gradient(rgba(225, 135, 79, 0.5), rgba(147, 124, 75, 0.5)), url("${process.env.PUBLIC_URL}/images/bg.jpg")`,
        }}
      >
        <h1 className='display-3 fw-bold text-uppercase'>Our honey</h1>
        <p className='lead fw-bold'>True nature locked in a jar</p>
      </div>

      <Row className='justify-content-center mb-5'>
        <Col md={6}>
          <Form.Control
            type='text'
            placeholder='Search favorite honey...'
            className='rounded-0 border-dark py-2 shadow-sm'
            value={searchPhrase}
            onChange={(event) => setSearchPhrase(event.target.value)}
          />
          {searchPhrase && (
            <p className='text-muted small mt-2'>
              Products found: {filteredProducts.length}
            </p>
          )}
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className='g-4 mb-5'>
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <Card className={`${styles.productCard} h-100 shadow-sm`}>
              <div style={{ overflow: 'hidden' }}>
                <Card.Img
                  variant='top'
                  src={process.env.PUBLIC_URL + product.mainImage}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </div>
              <Card.Body className='d-flex flex-column text-center'>
                <Card.Title className='fw-bold text-uppercase'>
                  {product.name}
                </Card.Title>
                <Card.Text className='text-muted small'>
                  {product.shortDescription}
                </Card.Text>
                <Card.Text className='fw-bold fs-5 mt-auto'>
                  from {product.price / 100} PLN
                </Card.Text>
                <Link to={`/product/${product.id}`} className='mt-3'>
                  <Button
                    variant='outline-dark'
                    className='w-100 text-uppercase fw-bold'
                  >
                    View product
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && (
        <div className='text-center my-5'>
          <h3 className='text-muted'>
            Unfortunately, we don't have honey with that name...
          </h3>
        </div>
      )}
    </Container>
  );
};

export default Home;
