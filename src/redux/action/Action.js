export const login = (username) => ({
    type: 'LOGIN',
    payload: username,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });