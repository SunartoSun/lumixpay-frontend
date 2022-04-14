import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { CBadge, CButton, CCardBody, CDataTable, CPagination } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusBadge } from 'src/helper/utils';
import { OptionItemSelect } from 'src/helper/selectOptions';
import WithdrawalFilter from './WithdrawalFilter';

const fields = [
  {
    key: 'action',
    filter: false,
  },
  { key: 'Currency' },
  { key: 'Datetime' },
  { key: 'TransactionHash' },
  { key: 'Amount' },
  { key: 'Status' },
];

const dummy = [
  {
    Currency: 'ETH',
    Merchant: 'John',
    Datetime: '1/6/2021 19:10  ',
    TransactionHash: '0x71d324d1049618d8d69fa3803a18dcb62adbc001fb2f1aabc7faab545bd5ad2d',
    From: '0x1800246b58dc9edf07013b66a5a6800a9596f419',
    To: '0x1452dbfcff5aa0ba612b74876a025750a51b5b15',
    Amount: 100,
    Status: 'Success',
    ProcessingFee: 1,
  },
  {
    Currency: 'BTC',
    Merchant: 'Bit',
    Datetime: '1/6/2021 19:10  ',
    TransactionHash: '0x71d324d1049618d8d69fa3803a18dcb62adbc001fb2f1aabc7faab545bd5ad2d',
    From: '0x1800246b58dc9edf07013b66a5a6800a9596f419',
    To: '0x1452dbfcff5aa0ba612b74876a025750a51b5b15',
    Amount: 200,
    Status: 'Failed',
    ProcessingFee: 2,
  },
  {
    Currency: 'USDT',
    Merchant: 'Use',
    Datetime: '1/6/2021 19:10  ',
    TransactionHash: '0x71d324d1049618d8d69fa3803a18dcb62adbc001fb2f1aabc7faab545bd5ad2d',
    From: '0x1800246b58dc9edf07013b66a5a6800a9596f419',
    To: '0x1452dbfcff5aa0ba612b74876a025750a51b5b15',
    Amount: 300,
    Status: 'Pending',
    ProcessingFee: 3,
  },
];

const WithdrawalTable = ({ onActionClick, onFilterChange }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deposit.loading);

  const [items, setItems] = useState(dummy);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filterValue, setFilterValue] = useState({
    qCurrency: '',
    qMerchant: '',
    qStatus: '',
    qFromAddress: '',
    qToAddress: '',
  });

  useEffect(() => {
    // dispatch(
    //   fetchDepositList({
    //     page: currentPage,
    //     page_count: itemsPerPage,
    //     sort: filterValue.sort ? filterValue.sort.toLocaleLowerCase() : '',
    //     sort_by: filterValue.sort ? filterValue.sort_by : '',
    //     df: filterValue.dateRange.startDate ? formatDateRange(filterValue.dateRange.startDate) : getCurrentDate(true),
    //     dt: filterValue.dateRange.endDate ? formatDateRange(filterValue.dateRange.endDate) : getDateTomorrow(true),
    //     qUsername: filterValue.qUsername,
    //     qFullname: filterValue.qFullname,
    //     qParent: filterValue.qParent,
    //     qStatus: filterValue.qStatus,
    //     qCurrency: filterValue.qCurrency,
    //   }),
    // ).then((data) => {
    //   if (data.payload) {
    //     const queryItems = data.payload.result;
    //     setTotalPage(data.payload.total_page);
    //     setItems(queryItems);
    //   }
    // });
  }, [currentPage, itemsPerPage, filterValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterValue]);

  const handleFilterChange = (type, value) => {
    setFilterValue({ ...filterValue, [type]: value });
    onFilterChange({ ...filterValue, [type]: value });
  };

  const handleSortChange = (val) => {
    setFilterValue({ ...filterValue, sort: val.column, sort_by: val.asc ? 'asc' : 'dec' });
  };

  return (
    <CCardBody>
      <CDataTable
        addTableClasses="table-nowrap"
        items={items}
        fields={fields}
        hover
        loading={loading}
        overTableSlot={<WithdrawalFilter filterValues={filterValue} onFilterChange={handleFilterChange} />}
        itemsPerPageSelect={OptionItemSelect}
        itemsPerPage={itemsPerPage}
        onPaginationChange={setItemsPerPage}
        sorter={{ external: true, resetable: true }}
        onSorterValueChange={(val) => handleSortChange(val)}
        scopedSlots={{
          Status: (item) => (
            <td>
              <CBadge color={getStatusBadge(item.Status)}>{item.Status}</CBadge>
            </td>
          ),
          action: (item) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  style={{ marginRight: 12 }}
                  onClick={() => {
                    onActionClick(item);
                  }}
                >
                  Detail
                </CButton>
              </td>
            );
          },
        }}
      />
      {totalPage > 1 && <CPagination activePage={currentPage} pages={totalPage} onActivePageChange={setCurrentPage} />}
    </CCardBody>
  );
};

WithdrawalTable.propTypes = {
  onActionClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
export default WithdrawalTable;
