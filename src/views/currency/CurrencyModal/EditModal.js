import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { schema, validate } from 'src/helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import EditModalForm from './EditModalForm';
import api from 'src/services/axios';

const validationSchema = () => {
  return Yup.object().shape({
    walletAddress: schema.walletAddress,
    status: schema.status,
  });
};

const EditModal = ({ showModal, onModalClose, item, isEdit }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const loading = useSelector((state) => state.merchant.loading);

  const initialValues = {
    currency: item.Currency ? item.Currency : '',
    walletAddress: item.WalletAddressWithdraw ? item.WalletAddressWithdraw : '',
    status: item.Status ? item.Status : '',
  };

  async function handleSubmit(values, { resetForm }) {
    const { data, status } = await api.currency.createAddress(
      { count: '1', currency: values.currency },
      'ca03na188ame03u1d78620de67282882a84',
    );

    console.log('data', data);
    // dispatch(
    //   addAdmin({
    //     adminusername: values.adminusername,
    //     email: values.email,
    //     password: values.password,
    //     role: values.role,
    //   }),
    // ).then((data) => {
    //   if (!data.payload.sts) {
    //     dispatch(
    //       alertActions.addSuccessAlert({
    //         title: 'Add Admin Success',
    //         message: data.payload.msg,
    //       }),
    //     );

    //     resetForm();
    //     onModalClose();
    //   }
    // });
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
        <CModalTitle>{'Edit Currency'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Formik
          initialValues={initialValues}
          validate={validate(validationSchema)}
          onSubmit={handleSubmit}
          innerRef={formikRef}
          enableReinitialize
        >
          {(props) => <EditModalForm {...props} isEdit={isEdit} />}
        </Formik>
      </CModalBody>
      <CModalFooter>
        <CButton form="ModalForm" type="submit" color="primary" disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Submit'}
        </CButton>
        <CButton color="secondary" onClick={onModalClose}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

EditModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  isEdit: PropTypes.bool,
};

EditModal.defaultProps = {
  item: {},
  isEdit: false,
};
export default EditModal;
