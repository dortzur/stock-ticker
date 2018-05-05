import React, { PureComponent } from "react";
import Earning from "./Earning";
import PropTypes from "prop-types";
class YearlyEarnings extends PureComponent {
  static propTypes = {
    earnings: PropTypes.array
  };
  render() {
    const { earnings } = this.props;

    return (
      <div style={{ marginTop: 10 }}>
        Yearly Earnings:
        <div>
          {earnings.map(qe => (
            <div
              style={{ fontStyle: "italic", fontSize: 12 }}
              key={qe.reportId}
            >
              <Earning {...qe} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default YearlyEarnings;
