import React from "react";
import reactDom from "react-dom/client";
import App from "./src/App";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

const domContainer = document.getElementById("root");
const root = reactDom.createRoot(domContainer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
