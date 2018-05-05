import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCompanyStocks } from "./state/stock-module";
import CompanyStock from "./CompanyStock";

class Companies extends PureComponent {
  render() {
    const { companyStocks } = this.props;
    return (
      <div>
        <h1>Nasdaq 100 Companies</h1>
        {companyStocks.map(cs => (
          <CompanyStock key={cs.id} companyStock={cs} />
        ))}
      </div>
    );
  }
}

export default connect(state => ({ companyStocks: getCompanyStocks(state) }))(
  Companies
);
