import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CCol, CForm, CFormGroup, CInput, CInvalidFeedback, CLabel, CRow } from '@coreui/react';
import EditField from 'src/reusable/EditField';

const UserChangePasswordForm = (props) => {
  const {
    values,
    errors,
    touched,
    status,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    handleReset,
    setTouched,
  } = props;

  return (
    <CRow>
      <CCol lg="12">
        <CForm id="ChangePasswordForm" onSubmit={handleSubmit} name="ChangePasswordForm">
          <EditField
            label="Old Password"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            required
            invalid={touched.oldPassword && !!errors.oldPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.oldPassword}
            error={errors.oldPassword}
          />
          <EditField
            label="New Password"
            type="password"
            name="password"
            placeholder="New Password"
            required
            invalid={touched.password && !!errors.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.password}
            error={errors.password}
          />
          <EditField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            invalid={touched.confirmPassword && !!errors.confirmPassword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.confirmPassword}
            error={errors.confirmPassword}
          />
        </CForm>
      </CCol>
    </CRow>
  );
};

UserChangePasswordForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default UserChangePasswordForm;
