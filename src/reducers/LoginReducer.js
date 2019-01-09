import { LoginType, ErrorType } from '../actions/ActionType';

const initialState = {
  userInfo: null,
  message: null
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case LoginType.AUTHENTICATE: {
      st = {
        ...state,
        userInfo: action.userInfo
      };
      break;
    }

    case ErrorType.ERROR_LOG: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }

    default: {
      return st;
    }
  }
  return st;
}
