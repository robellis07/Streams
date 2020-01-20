import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  email: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        email: action.payload.email
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, email: null };
    default:
      return state;
  }
};
