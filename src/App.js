import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { fetchApiStocks, getCompanyStocks } from "./state/stock-module";
import { updateRandomStockPrice } from "./state/entity-module";
class App extends Component {
  componentDidMount() {
    this.props.fetchApiStocks();
    setInterval(this.props.updateRandomStockPrice, 500);
  }
  render() {
    const { companyStocks } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {companyStocks.map(cs => (
          <div key={cs.symbol} style={{ marginTop: 20 }}>
            <strong style={{ fontSize: 20 }}>{cs.symbol} ({cs.companyName})</strong>
            <div>
              <div>Financial Status: {cs.financialStatus}</div>
              <div>Market Category: {cs.marketCategory}</div>
            </div>
            <div>
              <strong>
                <em>Stock Price: {cs.stock.price}</em>
              </strong>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(state => ({ companyStocks: getCompanyStocks(state) }), {
  fetchApiStocks,
  updateRandomStockPrice
})(App);
