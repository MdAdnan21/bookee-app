// reducers.js

const reducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SHIFTS':
        return action.payload;
      case 'ADD_NEW_SHIFTS':
        return [...state, ...action.payload];
      default:
        return state;
    }
  };

  export default reducer