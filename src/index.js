import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';

//init store
const initialState = {};

ReactDOM.render(<App />, document.getElementById('root'));
