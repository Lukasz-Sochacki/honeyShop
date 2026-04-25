import { API_URL } from '../config';

//selectors
export const getCart = (state) => state.cart;

//actions
const createActionName = (actionName) => `app/cart/${actionName}`;

const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART = createActionName('REMOVE_FROM_CART');
const UPDATE_QUANTITY = createActionName('UPDATE_QUANTITY');
const UPDATE_COMMENT = createActionName('UPDATE_COMMENT');
const CLEAR_CART = createActionName('CLEAR_CART');

//action creators
export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });
export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});
export const updateQuantity = (payload) => ({ type: UPDATE_QUANTITY, payload });
export const updateComment = (payload) => ({ type: UPDATE_COMMENT, payload });
export const clearCart = () => ({ type: CLEAR_CART });

export const sendOrderRequest = (orderData) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    };

    return fetch(`${API_URL}/orders`, options)
      .then((res) => {
        if (res.ok) {
          return true;
        } else {
          console.error('Order failed');
          return false;
        }
      })
      .catch(() => false);
  };
};

const cartsReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Sprawdzamy, czy produkt o tym samym ID już jest w koszyku
      const existingProduct = statePart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingProduct) {
        // Jeśli jest, mapujemy koszyk i zwiększamy ilość dla tego produktu
        return statePart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
      }
      // Jeśli go nie ma, dodajemy nowy obiekt do tablicy
      return [...statePart, { ...action.payload }];

    case REMOVE_FROM_CART:
      return statePart.filter((item) => item.id !== action.payload);

    case UPDATE_QUANTITY:
      return statePart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

    case UPDATE_COMMENT:
      return statePart.map((item) =>
        item.id === action.payload.id
          ? { ...item, comment: action.payload.comment }
          : item,
      );

    case CLEAR_CART:
      return [];

    default:
      return statePart;
  }
};
export default cartsReducer;
