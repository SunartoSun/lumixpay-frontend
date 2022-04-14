import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CCol, CForm, CFormGroup, CInvalidFeedback, CLabel, CRow } from '@coreui/react';
import DetailField from 'src/reusable/DetailField';
import EditField from 'src/reusable/EditField';

// React DateRangePicker
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const GenerateApiForm = (props) => {
  const { values, errors, touched, isEdit, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  const [focus, setFocused] = useState(false);

  return (
    <CRow>
      <CCol lg="12">
        <CForm id="ModalForm" onSubmit={handleSubmit} noValidate name="ModalForm">
          <EditField
            label="Referance Name"
            type="text"
            name="referenceName"
            placeholder="Referance Name"
            isRequired
            invalid={touched.referenceName && !!errors.referenceName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.referenceName}
            error={errors.referenceName}
            disabled={isEdit}
          />

          <CFormGroup row>
            <CCol md="3" className="d-flex align-items-center">
              <CLabel className="m-0" htmlFor="expiry">
                Expiry Date (optional)
              </CLabel>
            </CCol>
            <CCol md="9">
              <SingleDatePicker
                id="expiry"
                date={values.expiry}
                onDateChange={(dateValue) => setFieldValue('expiry', dateValue)}
                focused={focus}
                onFocusChange={({ focused }) => setFocused(focused)}
                small
                block
                displayFormat="YYYY-MM-DD"
              />
              <CInvalidFeedback>{errors.expiry}</CInvalidFeedback>
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
    </CRow>
  );
};

GenerateApiForm.propTypes = {
  values: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default GenerateApiForm;
