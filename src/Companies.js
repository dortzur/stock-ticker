import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCompanyStocks } from "./state/stock-module";

class Companies extends PureComponent {
  render() {
    const { companyStocks } = this.props;
    return (
      <div>
        <h1>Nasdaq 100 Companies</h1>
        {companyStocks.map(cs => (
          <div key={cs.symbol} style={{ marginTop: 20 }}>
            <strong style={{ fontSize: 20 }}>
              {cs.symbol} ({cs.companyName})
            </strong>
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

export default connect(state => ({ companyStocks: getCompanyStocks(state) }))(
  Companies
);
