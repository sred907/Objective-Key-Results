import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import filterReducer from './reducers/filterReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(filterReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);