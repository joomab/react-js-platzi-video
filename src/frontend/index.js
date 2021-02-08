import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import App from "./routes/App";
import reducer from "./reducers";
/* import initialState from "./initialState"; */

const history = createBrowserHistory();
const preloadedState = window.__PRELOADED_STATE__;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState, composeEnhancers()); //composeEnhancers() por redux dev tools en el navegador

//Para que desde la consola del navegador no puedan obtener el __PRELOADED_STATE__
delete window.__PRELOADED_STATE__;

/* ReactDOM.render( */
ReactDOM.hydrate(
  //hydrate sirve que no se asocien eventos del lado del servidor (solo envía el string)
  //Y también sirve para que el navegador cargue todos los eventos del navegador (onClick, etc)
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
