import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className='text-center my-5 py-5'>
      <h1 className='display-1 fw-bold text-warning'>404</h1>
      <h2 className='mb-4 text-uppercase'>Ops! The honey has spilled...</h2>
      <p className='lead mb-5'>The page you are looking for does not exist.</p>
      <Link to='/'>
        <Button
          variant='dark'
          className='rounded-0 px-4 py-2 fw-bold text-uppercase'
        >
          Go back to the shop
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
