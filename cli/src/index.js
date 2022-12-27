import React from "react";
import reactDom from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const domContainer = document.getElementById("root");
const root = reactDom.createRoot(domContainer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
