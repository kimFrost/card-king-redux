import './styles.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import { reducer, rootReducer } from './store/reducer'
import { logger } from './store/middleware.logger';
import { initialState } from './store/initial.state';
import { queueActions } from './store/middleware.queue';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './store/sagas';

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(logger, /*queueActions,*/ sagaMiddleware);
const store = createStore(rootReducer, initialState, middlewares);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
