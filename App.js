import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RootStack from './routes/RootStack';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
