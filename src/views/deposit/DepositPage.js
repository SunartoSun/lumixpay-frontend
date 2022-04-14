import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PERMISSION_ADMIN_EXPORT_DEPOSIT } from 'src/helper/constants';
import { formatDateRange, getCurrentDate, getDateTomorrow } from 'src/helper/utils';
import TotalDpWdModal from 'src/reusable/TotalDpWdModal';
import { apiRequestExport, API_EXPORT_DEPOSIT } from 'src/services/axios';
import DepositTable from './DepositTable';
import DetailModal from './DetailModal/DetailModal';

const DepositPage = () => {
  const permission = useSelector((state) => state.user.permission);
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
          <DepositTable onActionClick={handleActionClick} onFilterChange={(filter) => setFilterValue(filter)} />
        </CCard>
      </CCol>
    </CRow>
  );
};

export default DepositPage;
