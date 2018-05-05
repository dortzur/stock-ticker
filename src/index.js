import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configure-store";
import { Provider } from "react-redux";
import qs from "query-string";
import WhyDidYouUpdate from "why-did-you-update";

const wdyu = qs.parse(window.location.search).wdyu;
if (wdyu !== "false") {
  WhyDidYouUpdate(React);
}

const store = configureStore();
//for debug purposes
if (global.window) {
  window.store = store;
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
