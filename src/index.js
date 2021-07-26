import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers =
    typeof window === 'object' &&
    window.REDUX_DEVTOOLS_EXTENSION_COMPOSE ?
        window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({}) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);