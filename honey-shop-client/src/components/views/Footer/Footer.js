import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-5 mt-auto'>
      <Container>
        <Row className='gy-4'>
          {/* Kolumna 1: O nas */}
          <Col md={4} className='text-center text-md-start'>
            <h5 className='text-uppercase fw-bold mb-3'>
              Honey <span className='text-warning'>Shop</span>
            </h5>
            <p className='small text-muted' style={{ lineHeight: '1.7' }}>
              Traditional Polish apiaries and the highest quality artisanal
              honey. For the love of nature and bees since 1980.
            </p>
          </Col>

          {/* Kolumna 2: Kontakt */}
          <Col md={4} className='text-center'>
            <h5 className='text-uppercase fw-bold mb-3'>Contact</h5>
            <p className='small mb-1'>ul. Miodowa 12, 00-001 Warszawa</p>
            <p className='small mb-0'>contact@honeyshop.com</p>
          </Col>

          {/* Kolumna 3: Social Media */}
          <Col md={4} className='text-center text-md-end'>
            <h5 className='text-uppercase fw-bold mb-3'>Subscribe us!</h5>
            <div className='d-flex justify-content-center justify-content-md-end gap-3'>
              <a href='#' className='text-white h4'>
                <FaInstagram />
              </a>
              <a href='#' className='text-white h4'>
                <FaFacebook />
              </a>
              <a href='#' className='text-white h4'>
                <FaYoutube />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
