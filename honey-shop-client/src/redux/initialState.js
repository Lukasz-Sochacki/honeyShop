const initialState = {
  products: [],

  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [],
};

export default initialState;
