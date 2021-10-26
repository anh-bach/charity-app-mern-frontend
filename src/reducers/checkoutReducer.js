import { TOGGLE_CHECKOUT } from '../actions/types';

const checkoutReducer = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_CHECKOUT:
      return !state;

    default:
      return state;
  }
};

export default checkoutReducer;
