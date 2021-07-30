import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {Provider} from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {rootReducer} from "./redux/rootReducer";
import thunk, { ThunkAction } from "redux-thunk";
import MainApi from './api/mainApi';

export const api = {
  mainApi: MainApi.getInstance(),
};

const composeEnhancers =
    typeof window === 'object' &&
    // @ts-ignore
    window.REDUX_DEVTOOLS_EXTENSION_COMPOSE ?
        // @ts-ignore
        window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({}) : compose;

export const generalReducer = combineReducers({
  rootReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api))
  )
)


export type AsyncAction<R = void> = ThunkAction<R, State, typeof api, any | any>;

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

export type State = ReturnType<typeof rootReducer>;
