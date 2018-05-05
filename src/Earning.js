import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

class CompanyStock extends PureComponent {
  static propTypes = {
    earnings: PropTypes.number,
    reportId: PropTypes.string,
    quarter: PropTypes.number
  };
  render() {
    const {earnings, quarter} = this.props;
    return <span>
      <span>Quarter {quarter} earnings: </span><span>{earnings}$</span>
    </span>
  }
}

export default CompanyStock;
