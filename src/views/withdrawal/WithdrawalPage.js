import React, { useState } from 'react';
import { CCard, CCardHeader, CCol, CRow } from '@coreui/react';
import { useSelector } from 'react-redux';
import { getCurrentDate, getDateTomorrow } from 'src/helper/utils';
import WithdrawalTable from './WithdrawalTable';
import DetailModal from './DetailModal/DetailModal';

const WithdrawalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleActionClick = (item) => {
    setSelectedItem(item);
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  const [filterValue, setFilterValue] = useState({
    sort: '',
    sort_by: '',
    qUsername: '',
    qFullname: '',
    qParent: '',
    dateRange: { startDate: getCurrentDate(), endDate: getDateTomorrow() },
    qStatus: -1,
    qCurrency: '',
  });

  return (
    <CRow>
      <CCol sm="12">
        {showModal && <DetailModal showModal={showModal} item={selectedItem} onModalClose={handleModalClose} />}
        <CCard>
          <CCardHeader>Deposit History</CCardHeader>
          <WithdrawalTable onActionClick={handleActionClick} onFilterChange={(filter) => setFilterValue(filter)} />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default WithdrawalPage;
