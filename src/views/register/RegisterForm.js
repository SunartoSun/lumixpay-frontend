import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CInvalidFeedback, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const RegisterForm = (props) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = props;

  return (
    <CForm onSubmit={handleSubmit}>
      <h1>Register</h1>
      <p className="text-muted">Create your account</p>
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-user" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          required
          invalid={touched.username && !!errors.username}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        <CInvalidFeedback>{errors.username}</CInvalidFeedback>
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText style={{ width: 42, justifyContent: 'center' }}>@</CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="email"
          type="text"
          placeholder="Email"
          autoComplete="email"
          required
          invalid={touched.email && !!errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <CInvalidFeedback>{errors.email}</CInvalidFeedback>
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-lock-locked" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          required
          invalid={touched.password && !!errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={errors.password}
        />
        <CInvalidFeedback>{errors.password}</CInvalidFeedback>
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-lock-locked" />
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          required
          invalid={touched.confirmPassword && !!errors.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
        />
        <CInvalidFeedback>{errors.confirmPassword}</CInvalidFeedback>
      </CInputGroup>

      <CButton color="primary" block type="submit" style={{ minWidth: 120 }} disabled={isSubmitting}>
        {isSubmitting ? <CSpinner size="sm" /> : 'Register'}
      </CButton>
    </CForm>
  );
};

RegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default RegisterForm;
