import React, { useEffect, useRef, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { PATH_LOGIN } from 'src/helper/urlRoutes';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from 'src/services/axios';
import { alertActions } from 'src/redux/alertReducer';
import { Formik } from 'formik';
import { schema, validate } from 'src/helper/utils';
import * as Yup from 'yup';
import RegisterForm from './RegisterForm';

const validationSchema = () => {
  return Yup.object().shape({
    username: schema.username,
    email: schema.email,
    password: schema.password,
    confirmPassword: schema.confirmPassword,
  });
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formikRef = useRef();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  async function handleSubmit(values, { resetForm }) {
    setLoading(true);
    console.log('values reg', values);
    // Cookies.set('token', 'authData', { expires: 1 });
    // history.replace('/');
    try {
      // const { data, status } = await api.auth.register({ username: values.username, email: values.email, password: values.password });
      const response = await api.auth.register({ username: values.username, email: values.email, password: values.password });
      console.log('response', response);
      // if (data.success) {
      //   dispatch(
      //     alertActions.addSuccessAlert({
      //       title: 'Register Success',
      //       message: data.message,
      //     }),
      //   );
      //   history.replace(PATH_LOGIN);
      //   resetForm();
      // } else {
      //   dispatch(
      //     alertActions.addErrorAlert({
      //       title: 'Register Failed',
      //       message: data.message.message,
      //     }),
      //   );
      // }
    } catch (error) {
      console.log('error', error);
      dispatch(
        alertActions.addErrorAlert({
          title: 'Register Failed',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    formikRef.current && formikRef.current.resetForm();
  }, [formikRef]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={initialValues}
                  validate={validate(validationSchema)}
                  onSubmit={handleSubmit}
                  innerRef={formikRef}
                  enableReinitialize
                >
                  {(props) => <RegisterForm {...props} />}
                </Formik>
                <CRow style={{ marginTop: 24 }}>
                  <CCol xs="12" className="text-center d-flex align-items-center justify-content-center">
                    <span className="mr-1">Already have an account?</span>
                    <CButton color="link" className="px-0" to={PATH_LOGIN}>
                      Login here
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
