import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { fetchApiStocks } from "./state/stock-module";
import { updateSingleStock } from "./state/entity-module";
import qs from "query-string";
import Companies from "./Companies";

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchApiStocks();
    const options = qs.parse(window.location.search);
    const interval = options.interval || 3000;
    if (options.singleRun) {
      setTimeout(this.props.updateSingleStock, interval);
    } else {
      setInterval(this.props.updateSingleStock, interval);
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Companies />
      </div>
    );
  }
}

export default connect(null, {
  fetchApiStocks,
  updateSingleStock
})(App);
