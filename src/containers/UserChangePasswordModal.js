import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { validate } from 'src/helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import { alertActions } from 'src/redux/alertReducer';
import UserChangePasswordForm from './UserChangePasswordForm';
import { userChangePassword } from 'src/redux/userReducer';

const validationSchema = function (values) {
  return Yup.object().shape({
    oldPassword: Yup.string().required('Password is required'),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      // .matches(/(?=.*[a-zA-Z]).{6,}/, 'Password must contain: numbers, alphabets letters\n')
      .required('Password is required'),
    confirmPassword: Yup.string().oneOf([values.password], 'Passwords must match').required('Password confirmation is required'),
  });
};

const UserChangePasswordModal = ({ showModal, onModalClose }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const loading = useSelector((state) => state.user.loading);

  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  async function handleSubmit(values, { resetForm }) {
    dispatch(userChangePassword({ oldpassword: values.oldPassword, password: values.password })).then((data) => {
      if (!data.payload.sts) {
        dispatch(
          alertActions.addSuccessAlert({
            title: 'Password Change Success',
            message: data.payload.msg,
          }),
        );
      } else {
        dispatch(
          alertActions.addErrorAlert({
            title: 'Password Change Failed',
            message: data.payload.msg,
          }),
        );
      }
      resetForm();
      onModalClose();
    });
  }

  useEffect(() => {
    formikRef.current && formikRef.current.resetForm();
  }, [formikRef, showModal]);

  return (
    <CModal show={showModal} onClose={onModalClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Change Password</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(props) => <UserChangePasswordForm {...props} />}
        </Formik>
      </CModalBody>
      <CModalFooter>
        <CButton form="ChangePasswordForm" type="submit" color="primary" disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Submit'}
        </CButton>
        <CButton color="secondary" onClick={onModalClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

UserChangePasswordModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default UserChangePasswordModal;
