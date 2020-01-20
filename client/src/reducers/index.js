import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  authReduc: authReducer,
  form: formReducer
});
