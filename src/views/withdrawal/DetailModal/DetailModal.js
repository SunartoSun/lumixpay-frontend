import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';

import TransactionDetail from './TransactionDetail';

const DetailModal = ({ showModal, onModalClose, item }) => {
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
};

DetailModal.defaultProps = {
  item: {},
};
export default DetailModal;
