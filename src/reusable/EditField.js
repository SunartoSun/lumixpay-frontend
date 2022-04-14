import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CFormGroup, CInput, CInvalidFeedback, CLabel } from '@coreui/react';

const EditField = ({ label, type, name, placeholder, disabled, isRequired, invalid, handleChange, handleBlur, value, error }) => {
  return (
    <CFormGroup row>
      <CCol md="3" className="d-flex align-items-center">
        <CLabel className="m-0" htmlFor={name}>
          {label}
        </CLabel>
      </CCol>
      <CCol md="9">
        <CInput
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          required={isRequired}
          invalid={invalid}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          disabled={disabled}
        />
        <CInvalidFeedback>{error}</CInvalidFeedback>
      </CCol>
    </CFormGroup>
  );
};

EditField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  invalid: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.node.isRequired,
  error: PropTypes.string,
};
EditField.defaultProps = {
  isRequired: false,
};
export default EditField;
