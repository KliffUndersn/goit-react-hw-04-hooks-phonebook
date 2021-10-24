import { createStore } from 'redux';
import types from './types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialStore = {
  filter: '',
  items: [],
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case types.ADD:
      return { filter: state.filter, items: [...state.items, action.payload] };
    case types.DELETE:
      return {
        filter: state.filter,
        items: state.items.filter(e => e.id !== action.payload),
      };
    case types.FILTER:
      return { filter: action.payload, items: [...state.items] };
    default:
      return state;
  }
};
const contactPercistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};
const store = createStore(
  persistReducer(contactPercistConfig, reducer),
  composeWithDevTools(),
);

export const persistor = persistStore(store);
export default store;
