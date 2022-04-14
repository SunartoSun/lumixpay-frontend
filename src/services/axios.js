import axios from 'axios';
import md5 from 'md5';
import { logout } from 'src/api/logout';
import { store } from 'src/redux';
import { alertActions } from 'src/redux/alertReducer';

const HASH_TOKEN = process.env.REACT_APP_TOKENKEY || '40C98D38-31D8-4A91-A1C8-A71A14664E84';
const BASE_URL = process.env.REACT_APP_OPS_API;

export const API_EXPORT_BET_HISTORY = '/admin/exportbethistory';
export const API_EXPORT_DEPOSIT = '/admin/exportdeposit';
export const API_EXPORT_REFERRAL = '/admin/exportreferrallist';
export const API_EXPORT_WITHDRAWAL = '/admin/exportwithdrawal';
class Api {
  _axios;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 6000,
      headers: {
        'content-type': 'application/json',
      },
    });
    this._axios = axiosInstance;

    this.injectLogger();
    this.injectReqResHandler();
  }

  auth = {
    login: (params) => {
      return this.request({
        url: '/auth/login',
        params,
        auth: false,
      });
    },
    register: (params) => {
      return this.request({
        url: '/auth/register',
        params,
        auth: false,
      });
    },
  };

  currency = {
    createAddress: (params, apiKey) => {
      return this.request({
        url: '/api/create_address',
        params,
        apiKey,
      });
    },
  };

  api = {
    createApiKey: (params) => {
      return this.request({
        url: '/bo/create_api_key',
        params,
      });
    },
  };

  getPermissionList() {
    return this.request({
      url: '/admin/permission',
    });
  }

  getCountries() {
    return this.request({
      url: '/countries',
      auth: false,
      method: 'get',
    });
  }

  request({ url, params = {}, header = {}, auth = true, method = 'post', autoReject = false, apiKey = '' }) {
    if (auth) {
      // inject token
      const authData = store.getState().auth.data;
      const token = authData.accessToken;
      header = { ...header, Authorization: `Bearer ${token}` };
      if (apiKey) header = { ...header, apiKey: apiKey };
    }
    console.log('header', header);
    return this._axios.request({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: params,
      headers: header,
    });
  }

  injectReqResHandler() {
    // this._axios.interceptors.request.use(this.signatureHandler.bind(this), this.onRequestFailed.bind(this));
    this._axios.interceptors.response.use(this.responseHandler.bind(this), this.onRequestFailed.bind(this));
  }

  injectLogger() {
    this._axios.interceptors.response.use(
      function logResponse(res) {
        console.log('%c Request Success:', 'color: #4CAF50; font-weight: bold', res);
        return res;
      },
      function logPromiseError(err) {
        console.log('%c Request Error:', 'color: #EC6060; font-weight: bold', err);
        return Promise.reject(err);
      },
    );
  }

  signatureHandler(config) {
    const paramKey = config.method.toLowerCase() === 'get' ? 'params' : 'data';
    const params = config[paramKey];
    if (params) {
      const keys = Object.keys(params);
      let formulatedQuery = keys.sort().reduce((cumulatedParams, k, i) => `${cumulatedParams}${i > 0 ? '&' : ''}${k}=${params[k]}`, '');
      formulatedQuery += `&token=${HASH_TOKEN}`;
      // console.log('formulatedQuery', formulatedQuery);
      config[paramKey].signature = md5(formulatedQuery);
    }

    return config;
  }

  onRequestFailed(error) {
    // POP UP System Error
    return Promise.reject(error);
  }

  // if sts = 1
  onStatusFalse(data) {
    const { msg } = data;
    // // POP Up error message
    store.dispatch(
      alertActions.addErrorAlert({
        title: 'API Error',
        message: msg,
      }),
    );
  }

  responseHandler(res) {
    console.log('res', res);
    const {
      data: { sts, msg },
      config: {
        headers: { autoReject },
      },
    } = res;

    if (sts > 0) {
      this.onStatusFalse(res.data);
      // if (autoReject) throw new Error(msg);
    }

    if (sts > 0) {
      if (msg === 'BadAccessToken') {
        // logout();
      } else if (msg === 'BadSignature') {
        console.log('res', res);
        // alertError('System Error');
      } else {
        this.onStatusFalse(res.data);
        if (autoReject) throw new Error(msg);
      }
    }

    return res;
  }
}

const api = new Api();

// export const apiRequestExport = (exportApi, df, dt) => {
//   const authData = store.getState().auth.data;

//   const query = 'accesstoken=' + authData.accesstoken + '&df=' + df + '&dt=' + dt + '&username=' + authData.username;
//   const signature = md5(query + '&token=' + HASH_TOKEN);

//   return `${BASE_URL}${exportApi}?${query}&signature=${signature}`;
// };

export const apiRequestExport = (exportApi, config = {}) => {
  const authData = store.getState().auth.data;

  let lastQuery = '';
  let params = config;
  if (params) {
    params = { ...params, ...authData };
    const keys = Object.keys(params);
    let formulatedQuery = keys.sort().reduce((cumulatedParams, k, i) => `${cumulatedParams}${i > 0 ? '&' : ''}${k}=${params[k]}`, '');
    formulatedQuery += `&token=${HASH_TOKEN}`;

    params.signature = md5(formulatedQuery);

    const keys1 = Object.keys(params);
    lastQuery = keys1.sort().reduce((cumulatedParams, k, i) => `${cumulatedParams}${i > 0 ? '&' : ''}${k}=${params[k]}`, '');
  }

  return `${BASE_URL}${exportApi}?${lastQuery}`;
};

export default api;
