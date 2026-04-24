import { API_URL } from '../config';

//selectors
export const getAllProducts = (state) => state.products;
export const getProductById = ({ products }, productId) =>
  products.find((product) => product.id === productId);

//actions
const createAcionName = (actionName) => `app/products/${actionName}`;
const UPDATE_PRODUCTS = createAcionName('UPDATE_PRODUCTS');

//action creators
export const updateProducts = (payload) => ({ type: UPDATE_PRODUCTS, payload });

export const fetchProducts = () => {
  return (dispatch) => {
    fetch(API_URL + '/products')
      .then((res) => res.json())
      .then((products) => dispatch(updateProducts(products)))
      .catch((error) => console.error('Error fetching products: ', error));
  };
};

const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default productsReducer;
