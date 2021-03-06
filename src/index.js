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
import dashboardReducer from './state/reducers/dashboardReducer'
import raceReducer from './state/reducers/raceReducer'
import modalReducer from './state/reducers/modalReducer'
import contestantReducer from './state/reducers/contestantReducer'
import contestantImageReducer from './state/reducers/contestantImageReducer'

import ModalContainer from './components/Modals/modalContainer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  race: raceReducer,
  modal:modalReducer,
  contestant:contestantReducer,
  contestantImages:contestantImageReducer
});

const store = createStore(
  rootReducer, 
  compose(
  applyMiddleware(thunk.withExtraArgument({getFirestore})),
  reduxFirestore(firebase))
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
      <ModalContainer/>
      <App/>
    </ReactReduxFirebaseProvider>,
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();