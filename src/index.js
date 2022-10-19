import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/Components/redux/store";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
