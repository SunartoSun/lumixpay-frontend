import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { schema, validate } from 'src/helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import GenerateApiForm from './GenerateApiForm';
import moment from 'moment';
import api from 'src/services/axios';
import { alertActions } from 'src/redux/alertReducer';

const validationSchema = () => {
  return Yup.object().shape({
    referenceName: schema.referenceName,
  });
};

const GenerateApiModal = ({ showModal, onModalClose, item, isEdit }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const loading = useSelector((state) => state.merchant.loading);

  const initialValues = {
    referenceName: item.ReferenceName ? item.ReferenceName : '',
    expiry: item.ExpiryDate ? moment(item.ExpiryDate, 'YYYY-MM-DD') : '',
  };

  async function handleSubmit(values, { resetForm }) {
    const { data, status } = await api.api.createApiKey({ name: values.referenceName });
    console.log('status', status);
    console.log('data', data);
    try {
      if (status === 200) {
        console.log('data', data);

        if (data.success) {
          dispatch(
            alertActions.addSuccessAlert({
              title: 'Add API Key Success',
              message: data.message,
            }),
          );
        }
      }
    } catch (error) {
      console.log('error', error);
      dispatch(
        alertActions.addErrorAlert({
          title: 'Add API Key Failed',
          message: data.message,
        }),
      );
    }

    console.log('values', values);
    resetForm();
    onModalClose();
  }

  useEffect(() => {
    formikRef.current && formikRef.current.resetForm();
  }, [formikRef, showModal]);

  return (
    <CModal show={showModal} onClose={onModalClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Generate Api Key</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          innerRef={formikRef}
          enableReinitialize
        >
          {(props) => <GenerateApiForm {...props} isEdit={isEdit} />}
        </Formik>
      </CModalBody>
      <CModalFooter>
        <CButton form="ModalForm" type="submit" color="info" disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Generate'}
        </CButton>
        <CButton color="secondary" onClick={onModalClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

GenerateApiModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  isEdit: PropTypes.bool,
};

GenerateApiModal.defaultProps = {
  item: {},
  isEdit: false,
};
export default GenerateApiModal;
