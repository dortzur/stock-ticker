import React, { PureComponent } from "react";

class CompanyStock extends PureComponent {
  render() {
    const { companyStock } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <strong style={{ fontSize: 20 }}>
          {companyStock.id} ({companyStock.companyName})
        </strong>
        <div>
          <div>Financial Status: {companyStock.financialStatus}</div>
          <div>Market Category: {companyStock.marketCategory}</div>
        </div>
        <div>
          <strong>
            <em
              style={companyStock.id === "AAPL" ? { color: "limegreen" } : {}}
            >
              Stock Price: {companyStock.stock.price}
            </em>
          </strong>
        </div>
      </div>
    );
  }
}

export default CompanyStock;
