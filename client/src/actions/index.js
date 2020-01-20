import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = (id, email) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: id,
      email: email
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
