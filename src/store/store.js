// store.js

import { createStore } from 'redux';
import shiftsReducer from '../reducers/reducer';

const store = createStore(shiftsReducer);

export default store;
