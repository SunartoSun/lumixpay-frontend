import React, { useState } from 'react';
import { CCard, CCardHeader, CCol, CRow } from '@coreui/react';
import EditModal from './CurrencyModal/EditModal';
import DepositTable from './CurrencyTable';

const DepositPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleActionClick = (item) => {
    setSelectedItem(item);
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <CRow>
      <CCol sm="12">
        {showModal && <EditModal showModal={showModal} item={selectedItem} onModalClose={handleModalClose} />}
        <CCard>
          <CCardHeader>Currency</CCardHeader>
          <DepositTable onActionClick={handleActionClick} />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default DepositPage;
