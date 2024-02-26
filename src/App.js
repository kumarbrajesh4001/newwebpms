import React, { useEffect } from "react";
import RoutesComponent from "./pages/base/Routes";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import store from "./redux/store";
import axios from "axios";
import { postRequest } from "./services";

function App() {
  return (
    <div>
      <Provider store={store}>
        <RoutesComponent />
      </Provider>
    </div>
  );
}

export default App;
