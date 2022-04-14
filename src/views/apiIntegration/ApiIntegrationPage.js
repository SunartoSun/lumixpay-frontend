import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CRow } from '@coreui/react';
import ApiKeysTable from './APIKeysTable';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import { Formik } from 'formik';
import { schema, validate } from 'src/helper/utils';
import * as Yup from 'yup';
import CallbackForm from './CallbackForm';
import GenerateApiModal from './GenerateApiModal/GenerateApiModal';

const validationSchema = () => {
  return Yup.object().shape({
    callbackUrl: schema.callbackUrl,
  });
};

const ApiIntegrationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [item, setItem] = useState({});

  const initialValues = {
    callbackUrl: item.callbackUrl ? item.callbackUrl : '',
  };

  const handleActionClick = (valueItem) => {
    setSelectedItem(valueItem);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  async function handleSubmit(values, { resetForm }) {
    // dispatch(
    //   addAdmin({
    //     adminusername: values.adminusername,
    //     email: values.email,
    //     password: values.password,
    //     role: values.role,
    //   }),
    // ).then((data) => {
    //   if (!data.payload.sts) {
    //     dispatch(
    //       alertActions.addSuccessAlert({
    //         title: 'Add Admin Success',
    //         message: data.payload.msg,
    //       }),
    //     );

    //     resetForm();
    //     onModalClose();
    //   }
    // });
    console.log('values', values);
    resetForm();
  }

  return (
    <CRow>
      <CCol sm="12">
        {showModal && <GenerateApiModal showModal={showModal} item={selectedItem} onModalClose={handleModalClose} />}
        <CCard>
          <CCardHeader>API Keys</CCardHeader>
          <ApiKeysTable onActionClick={handleActionClick} />
          <CCardFooter>
            <CButton className="button-action" color="info" size="sm" style={{ marginRight: 12 }} onClick={() => setShowModal(!showModal)}>
              <CIcon content={cilPlus} size="sm" /> <span>New API Key</span>
            </CButton>
          </CCardFooter>
        </CCard>
        <CCard>
          <CCardHeader>Callback URL</CCardHeader>
          <CCardBody>
            <div className="mb-4">Get notify when there are transaction done on your payment gateway.</div>
            <div className="mb-1">URL</div>

            <Formik initialValues={initialValues} validate={validate(validationSchema)} onSubmit={handleSubmit} enableReinitialize>
              {(props) => <CallbackForm {...props} />}
            </Formik>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApiIntegrationPage;
