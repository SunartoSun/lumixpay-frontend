import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from '@coreui/react';

import DetailField from 'src/reusable/DetailField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalDpWd } from 'src/redux/userReducer';
import SpinnerLoading from './SpinnerLoading';

const TotalDpWdModal = ({ showModal, userId, onModalClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.account.loading);
  const [items, setItems] = useState(null);

  useEffect(() => {
    dispatch(
      fetchTotalDpWd({
        userid: userId,
      }),
    ).then((data) => {
      if (data.payload) {
        const queryItems = data.payload.result;
        setItems(queryItems);
      }
    });
  }, []);

  return (
    <CModal show={showModal} onClose={onModalClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Total Deposit Withdrawal</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow alignHorizontal="center" alignVertical="center">
          <CCol>
            <DetailField label="Total Deposit" fieldValue={items?.TotalDeposit} />
            <DetailField label="Total Withdarawal" fieldValue={items?.TotalWithdarawal} />
            {loading && <SpinnerLoading grow color="primary" />}
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onModalClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

TotalDpWdModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default TotalDpWdModal;
