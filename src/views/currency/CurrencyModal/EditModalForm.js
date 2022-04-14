import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CForm, CFormGroup, CLabel, CRow, CSwitch } from '@coreui/react';
import DetailField from 'src/reusable/DetailField';
import EditField from 'src/reusable/EditField';
import { getSwitchStatus, getSwitchStatusLabel } from 'src/helper/utils';

const EditModalForm = (props) => {
  const { values, errors, touched, isEdit, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  return (
    <CRow>
      <CCol lg="12">
        <CForm id="ModalForm" onSubmit={handleSubmit} noValidate name="ModalForm">
          <DetailField label="Currency" fieldValue={values.currency} />
          <EditField
            label="Wallet Address Withdraw"
            type="text"
            name="walletAddress"
            placeholder="Wallet Address Withdraw"
            isRequired
            invalid={touched.walletAddress && !!errors.walletAddress}
            handleChange={handleChange}
            handleBlur={handleBlur}
            value={values.walletAddress}
            error={errors.walletAddress}
            disabled={isEdit}
          />

          <CFormGroup row>
            <CCol md="3" className="d-flex align-items-center">
              <CLabel className="m-0" htmlFor="status">
                Status
              </CLabel>
            </CCol>
            <CCol md="9">
              <CSwitch
                className={'mx-1'}
                shape={'pill'}
                color={'info'}
                variant={'opposite'}
                labelOn={'\u2713'}
                labelOff={'\u2715'}
                checked={getSwitchStatus(values.status)}
                onChange={() => setFieldValue('status', getSwitchStatusLabel(!getSwitchStatus(values.status)))}
              />
            </CCol>
          </CFormGroup>
        </CForm>
      </CCol>
    </CRow>
  );
};

EditModalForm.propTypes = {
  values: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default EditModalForm;
