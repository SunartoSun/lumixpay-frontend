import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CBadge, CButton, CCardBody, CDataTable, CImg } from '@coreui/react';
import { useSelector } from 'react-redux';
import { getCurrencyIcon, getStatusBadge } from 'src/helper/utils';

const fields = [
  { key: 'Currency' },
  { key: 'WalletAddressWithdraw' },
  { key: 'Status' },
  {
    key: 'action',
    filter: false,
  },
];

const dummy = [
  {
    Currency: 'ETH',
    WalletAddressWithdraw: '0x1800246b58dc9edf07013b66a5a6800a9596f419',
    Status: 'Active',
  },
  {
    Currency: 'USDT',
    WalletAddressWithdraw: '0x1452dbfcff5aa0ba612b74876a025750a51b5b15',
    Status: 'Inactive',
  },
];

const CurrencyTable = ({ onActionClick }) => {
  const loading = useSelector((state) => state.deposit.loading);

  const [items, setItems] = useState(dummy);

  return (
    <CCardBody>
      <CDataTable
        addTableClasses="table-nowrap"
        items={items}
        fields={fields}
        hover
        loading={loading}
        scopedSlots={{
          Currency: (item) => (
            <td>
              <CImg src={getCurrencyIcon(item.Currency)} alt={item.Currency} width={48} style={{ marginRight: 12 }} />
              {item.Currency}
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
                  color="info"
                  size="sm"
                  style={{ marginRight: 12 }}
                  onClick={() => {
                    onActionClick(item);
                  }}
                >
                  Edit
                </CButton>
              </td>
            );
          },
        }}
      />
    </CCardBody>
  );
};

CurrencyTable.propTypes = {
  onActionClick: PropTypes.func.isRequired,
};
export default CurrencyTable;
