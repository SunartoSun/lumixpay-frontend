import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CCol, CFormGroup, CInput, CInputGroup, CInputGroupAppend, CLabel, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { alertActions } from 'src/redux/alertReducer';

const CopyField = ({ label, fieldValue }) => {
  const dispatch = useDispatch();

  const handleCopyClipboard = () => {
    dispatch(
      alertActions.addSuccessAlert({
        title: 'Copied',
        message: fieldValue,
      }),
    );
  };

  return (
    <CRow>
      <CCol lg="12">
        <CFormGroup row>
          <CCol md="3" className="d-flex align-items-center">
            <CLabel className="m-0">{label}</CLabel>
          </CCol>
          <CCol md="9">
            <CInputGroup>
              <CInput type="text" name="userId" id="userId" required value={fieldValue} disabled />
              <CInputGroupAppend>
                <CopyToClipboard text={fieldValue} onCopy={handleCopyClipboard}>
                  <CButton color="secondary" style={{ padding: `0px 12px`, boxShadow: 'none' }}>
                    <CIcon name="cil-copy" content={freeSet.cilCopy} />
                  </CButton>
                </CopyToClipboard>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CFormGroup>
      </CCol>
    </CRow>
  );
};

CopyField.propTypes = {
  label: PropTypes.string,
  fieldValue: PropTypes.string,
};

CopyField.defaultProps = {
  label: '',
  fieldValue: '',
};

export default CopyField;
