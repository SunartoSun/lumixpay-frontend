import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CBadge, CButton, CCardBody, CDataTable, CImg } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyIcon, getStatusBadge } from 'src/helper/utils';
import CIcon from '@coreui/icons-react';
import { cilCopy } from '@coreui/icons';
import { alertActions } from 'src/redux/alertReducer';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const fields = [
  { key: 'ApiKeys', label: 'API Keys' },
  { key: 'ReferanceName' },
  { key: 'Status' },
  { key: 'CreatedOn' },
  { key: 'ExpiredOn' },
  {
    key: 'action',
    filter: false,
  },
];

const dummy = [
  {
    ApiKeys: '0x1800246b58dc9edf07013b66a5a6800a9596f419',
    ReferanceName: '',
    Status: 'Active',
    CreatedOn: '08/11/2020',
    ExpiredOn: '01/12/2021',
  },
  {
    ApiKeys: '0x1452dbfcff5aa0ba612b74876a025750a51b5b15',
    ReferanceName: '',
    Status: 'Active',
    CreatedOn: '27/11/2020',
    ExpiredOn: '27/12/2020',
  },
];

const ApiKeysTable = ({ onActionClick }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deposit.loading);

  const [items, setItems] = useState(dummy);

  const handleCopyClipboard = (value) => {
    console.log('value', value);
    dispatch(
      alertActions.addSuccessAlert({
        title: 'Copied',
        message: value,
      }),
    );
  };

  return (
    <CCardBody>
      <div>Add new or revoke LumixPay access key.</div>
      <div className="mb-5">
        The key is required for API integration to generate wallet address and read notifications of your transactions.
      </div>
      <CDataTable
        addTableClasses="table-nowrap"
        items={items}
        fields={fields}
        hover
        loading={loading}
        scopedSlots={{
          ApiKeys: (item) => (
            <td>
              <div className="d-flex align-items-center">
                {item.ApiKeys}
                <CopyToClipboard text={item.ApiKeys} onCopy={handleCopyClipboard}>
                  <CButton color="secondary" variant="ghost" style={{ padding: `0px 12px`, boxShadow: 'none' }}>
                    <CIcon content={cilCopy} />
                  </CButton>
                </CopyToClipboard>
              </div>
            </td>
          ),
          Status: (item) => (
            <td>
              <CBadge color={getStatusBadge(item.Status)}>{item.Status}</CBadge>
            </td>
          ),
          action: (item) => {
            return (
              <td>
                <CButton
                  className="button-action"
                  color="danger"
                  size="sm"
                  style={{ marginRight: 12 }}
                  onClick={() => {
                    onActionClick(item);
                  }}
                >
                  Revoke
                </CButton>
              </td>
            );
          },
        }}
      />
    </CCardBody>
  );
};

ApiKeysTable.propTypes = {
  onActionClick: PropTypes.func.isRequired,
};
export default ApiKeysTable;
