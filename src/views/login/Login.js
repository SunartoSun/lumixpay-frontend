import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import api from 'src/services/axios';
import { alertActions } from 'src/redux/alertReducer';
import { authActions } from 'src/redux/authReducer';
import { PATH_DASHBOARD, PATH_REGISTER } from 'src/helper/urlRoutes';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await api.auth.login({ email, password });

      if (status === 200) {
        Cookies.set('token', data.accessToken, { expires: (1 / 86400) * data.expiresIn });
        dispatch(authActions.signIn(data));

        history.replace(PATH_DASHBOARD);
      } else {
        dispatch(
          alertActions.addErrorAlert({
            title: 'Login Failed',
          }),
        );
      }
    } catch (error) {
      dispatch(
        alertActions.addErrorAlert({
          title: 'Login Api Error',
        }),
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow style={{ marginBottom: 24 }}>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type="submit" style={{ minWidth: 120 }} disabled={loading}>
                          {loading ? <CSpinner size="sm" /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12" className="text-center d-flex align-items-center justify-content-center">
                        <span className="mr-1">Don't have an account?</span>
                        <CButton color="link" className="px-0" to={PATH_REGISTER}>
                          Sign up now
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
