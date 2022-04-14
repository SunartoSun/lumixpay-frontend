import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CForm, CFormGroup, CInput, CInvalidFeedback, CRow, CSpinner } from '@coreui/react';

const CallbackForm = (props) => {
  const { values, loading, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  return (
    <CRow>
      <CCol lg="12">
        <CForm id="ModalForm" onSubmit={handleSubmit} noValidate name="ModalForm">
          <CFormGroup row>
            <CCol md="6" className="mb-1">
              <CInput
                name="callbackUrl"
                id="callbackUrl"
                type="text"
                placeholder="Example https:/yourdomain.com/callbackurl"
                required
                invalid={touched.callbackUrl && !!errors.callbackUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.callbackUrl}
              />
              <CInvalidFeedback>{errors.callbackUrl}</CInvalidFeedback>
            </CCol>

            <CCol md="3">
              <CButton form="ModalForm" type="submit" color="info" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Save'}
              </CButton>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
    </CRow>
  );
};

CallbackForm.propTypes = {
  values: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default CallbackForm;
