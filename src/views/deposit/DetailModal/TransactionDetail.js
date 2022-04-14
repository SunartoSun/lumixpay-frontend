import React from 'react';
import PropTypes from 'prop-types';
import { CBadge, CCol, CForm, CFormGroup, CImg, CInvalidFeedback, CLabel, CRow, CTextarea } from '@coreui/react';
import Select from 'react-select';
import { OptionMerchantStatus } from 'src/helper/selectOptions';
import DetailField from 'src/reusable/DetailField';
import EditField from 'src/reusable/EditField';
import { getCurrencyIcon, getStatusBadge } from 'src/helper/utils';
import CopyField from 'src/reusable/CopyField';

const TransactionDetail = ({ item }) => {
  return (
    <CRow>
      <CCol lg="12">
        <div className="text-center mb-4">
          <CImg src={getCurrencyIcon(item.Currency)} alt={item.Currency} />
          <h3>{`${item.Amount ? item.Amount : 0} ${item.Currency ? item.Currency : ''}`}</h3>
          <CBadge color={getStatusBadge(item.Status)} style={{ fontSize: 16, padding: `4px 18px`, marginBottom: 4 }}>
            {item.Status}
          </CBadge>
          <div>Created on {item.Datetime}</div>
        </div>
        <h2>Transaction Details</h2>
        <CopyField label="Transaction Hash" fieldValue={item.TransactionHash} />
        <CopyField label="To" fieldValue={item.To} />
        <CopyField label="From" fieldValue={item.From} />
        <DetailField label="Processing Fee" fieldValue={item.ProcessingFee} />
      </CCol>
    </CRow>
  );
};

TransactionDetail.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TransactionDetail;
