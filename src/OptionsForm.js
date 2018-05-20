import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";

class OptionsForm extends PureComponent {
  static propTypes = {};
  render() {
    return (
      <Formik
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
        initialValues={{ renorm: false, interval: 3000 }}
      >
        {props => (
          <Form>
            <label>
              Update interval
              <Field type="number" name="interval" /> ms
            </label>
            <label>
              Enable Renorm
              <Field
                checked={props.values.renorm}
                type="checkbox"
                name="renorm"
              />
            </label>
            <label>
              Enable "Why Did You Update" console warnings
              <Field type="checkbox" name="wdyu" />
            </label>
            <label>
              Update only once
              <Field type="checkbox" name="singleRun" />
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default OptionsForm;
