import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { fetchApiStocks } from "./state/stock-module";
import { updateSingleStock } from "./state/entity-module";
import { qs } from "./utils";
import Companies from "./Companies";
import OptionsForm from "./OptionsForm";

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
          <h1 className="App-title">Welcome to the Stock Sticker Demo</h1>
          <OptionsForm />
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
