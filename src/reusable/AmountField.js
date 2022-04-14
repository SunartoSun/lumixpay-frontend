import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CImg, CLabel, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { getCurrencyIcon } from 'src/helper/utils';
import { freeSet } from '@coreui/icons';

const AmountField = ({ currency, amount }) => {
  return (
    <CRow style={{ alignItems: 'center', padding: 12 }}>
      <CCol xs>
        <CRow style={{ alignItems: 'center' }}>
          <CImg src={getCurrencyIcon(currency)} alt={currency} width={48} />
          <h5 style={{ marginLeft: 12 }}>{currency}</h5>
        </CRow>
      </CCol>
      <CCol xs={1}>
        <CLabel>{`Balance: `}</CLabel>
      </CCol>
      <CCol xs={1}>
        <CLabel>{amount}</CLabel>
      </CCol>

      {/* <CIcon size={'2xl'} content={freeSet.cilChevronRight} /> */}
    </CRow>
  );
};

AmountField.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default AmountField;
