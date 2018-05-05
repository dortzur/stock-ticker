import React, { PureComponent } from "react";
import Earning from "./Earning";
import YearlyEarnings from "./YearlyEarnings";

class CompanyStock extends PureComponent {
  render() {
    const { companyStock } = this.props;
    return (
      <div style={{ marginTop: 20 }}>
        <strong style={{ fontSize: 20 }}>
          {companyStock.stock.id} ({companyStock.companyName})
        </strong>
        <div>
          <strong>
            <em
              style={
                companyStock.stock.id === "AAPL" ? { color: "limegreen" } : {}
              }
            >
              Stock Price: {companyStock.stock.price}
            </em>
          </strong>
        </div>
        <div>
          <span>Latest Earnings: </span>
          <Earning {...companyStock.stock.lastEarningsReport} />
        </div>
        <YearlyEarnings earnings={companyStock.stock.quarterEarnings} />
      </div>
    );
  }
}

export default CompanyStock;
