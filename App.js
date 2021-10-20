import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RootStack from './routes/RootStack';
import Home from './screens/Home';

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
