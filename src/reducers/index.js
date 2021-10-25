import { combineReducers } from 'redux';
import checkoutReducer from './checkoutReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  checkoutState: checkoutReducer,
});

export default rootReducer;
