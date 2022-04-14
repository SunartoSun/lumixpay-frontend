import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CFormGroup, CInput, CLabel, CRow } from '@coreui/react';
import Select from 'react-select';

import { OptionCurrency, OptionTransactionStatus } from 'src/helper/selectOptions';

const WithdrawalFilter = ({ filterValues, onFilterChange }) => {
  return (
    <CRow>
      <CCol lg="3">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel htmlFor="qCurrency" className="my-0">
              Currency
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <Select
              name="qCurrency"
              isClearable
              options={OptionCurrency}
              onChange={(option) => onFilterChange('qCurrency', option ? option.value : '')}
            />
          </CCol>
        </CFormGroup>
      </CCol>

      <CCol lg="3">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel htmlFor="qStatus" className="my-0">
              Status
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <Select
              name="qStatus"
              isClearable
              options={OptionTransactionStatus}
              onChange={(option) => onFilterChange('qStatus', option ? option.value : '')}
            />
          </CCol>
        </CFormGroup>
      </CCol>

      <CCol lg="12">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel htmlFor="qFromAddress" className="my-0">
              From Address
            </CLabel>
          </CCol>
          <CCol xs="12" md="6">
            <CInput
              id="qFromAddress"
              placeholder="Enter from address..."
              value={filterValues.qFromAddress}
              onChange={(e) => onFilterChange('qFromAddress', e.target.value)}
            />
          </CCol>
        </CFormGroup>
      </CCol>

      <CCol lg="12">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel htmlFor="qToAddress" className="my-0">
              To Address
            </CLabel>
          </CCol>
          <CCol xs="12" md="6">
            <CInput
              id="qToAddress"
              placeholder="Enter to address..."
              value={filterValues.qToAddress}
              onChange={(e) => onFilterChange('qToAddress', e.target.value)}
            />
          </CCol>
        </CFormGroup>
      </CCol>
    </CRow>
  );
};

WithdrawalFilter.propTypes = {
  filterValues: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default WithdrawalFilter;
