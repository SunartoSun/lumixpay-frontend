import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner } from '@coreui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { schema, validate } from 'src/helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import TransactionDetail from './TransactionDetail';

const validationSchema = () => {
  return Yup.object().shape({
    username: schema.username,
    status: schema.status,
  });
};

const DetailModal = ({ showModal, onModalClose, item, isEdit }) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const loading = useSelector((state) => state.merchant.loading);

  const initialValues = {
    username: item.Username ? item.Username : '',
    status: item.Status ? item.Status : '',
    callbackurl: item.CallbackUrl ? item.CallbackUrl : '',
    ipwhitelist: item.IpWhitelist ? item.IpWhitelist : '',
  };

  async function handleSubmit(values, { resetForm }) {
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
        <CModalTitle>Transaction Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <TransactionDetail item={item} />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onModalClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

DetailModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  isEdit: PropTypes.bool,
};

DetailModal.defaultProps = {
  item: {},
  isEdit: false,
};
export default DetailModal;
