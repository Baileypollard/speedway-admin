import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

import firebase from './components/Firebase/index'
import { Provider } from 'react-redux'
import {combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' 
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'

import authReducer from './state/reducers/authReducer'

const initialState = {}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer 
});

const store = createStore(
  rootReducer, 
  initialState,
  applyMiddleware(thunk)   
);

const rrfConfig = {
  useFirestoreForProfile: true 
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>      
      <App/>
    </ReactReduxFirebaseProvider>,
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();