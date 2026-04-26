const initialState = {
  products: [],
  // Sprawdzamy czy w localStorage jest 'cart', jeśli tak - parsujemy go, jeśli nie - dajemy []

  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
};

export default initialState;
