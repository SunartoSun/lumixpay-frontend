import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CFormGroup, CInput, CLabel, CRow } from '@coreui/react';

const DetailField = ({ label, fieldValue }) => {
  return (
    <CRow>
      <CCol lg="12">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel className="m-0">{label}</CLabel>
          </CCol>
          <CCol md="9">
            <CInput type="text" name="userId" id="userId" required value={fieldValue} disabled />
          </CCol>
        </CFormGroup>
      </CCol>
    </CRow>
  );
};

DetailField.propTypes = {
  label: PropTypes.string,
  fieldValue: PropTypes.string,
};

DetailField.defaultProps = {
  label: '',
  fieldValue: '',
};

export default DetailField;
