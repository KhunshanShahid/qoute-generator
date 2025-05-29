const initialState = {
    isLoggedIn: false,
    username: 'user',
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, isLoggedIn: true, username: action.payload };
      case 'LOGOUT':
        return { ...state, isLoggedIn: false, username: 'user' };
      default:
        return state;
    }
  };
  