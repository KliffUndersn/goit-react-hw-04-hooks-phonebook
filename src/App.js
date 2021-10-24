import React from 'react';
import InputForm from './components/InputForm/InputForm';
import store from './components/redux/store';
import { Provider } from 'react-redux';

store.getState();

function App() {
  return (
    <>
      <Provider store={store}>
        <InputForm />
      </Provider>
    </>
  );
}

export default App;
