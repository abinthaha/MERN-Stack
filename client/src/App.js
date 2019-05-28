import React from "react";
import "./App.css";
import RegisterComponent from "./scenes/Register/index";

import { Provider } from 'react-redux';

import store from './store/index';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RegisterComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
