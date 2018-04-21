import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { fetchApiStocks, getCompanyStocks } from "./state/stock-module";
import { updateSingleStock } from "./state/entity-module";
import Companies from "./Companies";
class App extends PureComponent {
  componentDidMount() {
    this.props.fetchApiStocks();
    setInterval(this.props.updateSingleStock, 500);
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
