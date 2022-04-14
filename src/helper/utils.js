import moment from 'moment';
import * as yup from 'yup';

import BTC from 'src/assets/coins/bitcoin.png';
import ETH from 'src/assets/coins/eth.png';
import USDT from 'src/assets/coins/usdt.png';

export const isEmptyObject = (obj) => {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

export const removeEmptyKey = (data) => {
  Object.keys(data).forEach((k) => !data[k] && (data[k] !== undefined || data[k] !== null) && delete data[k]);
  return data;
};

export const getCurrencyIcon = (currency) => {
  switch (currency) {
    case 'BTC':
      return BTC;
    case 'ETH':
      return ETH;
    case 'USDT':
      return USDT;

    default:
      return ETH;
  }
};

export const getStatusBadge = (status) => {
  switch (status) {
    case 'Success':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Failed':
      return 'danger';

    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Suspend':
      return 'warning';

    default:
      return 'primary';
  }
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
      return 'Approved';
    case 2:
      return 'Rejected';
    case 3:
      return 'Cancelled';
    default:
      return 'Pending';
  }
};

export const getSwitchStatus = (status) => {
  switch (status) {
    case 'Active':
      return true;
    case 'Inactive':
      return false;

    default:
      return false;
  }
};

export const getSwitchStatusLabel = (status) => {
  switch (status) {
    case true:
      return 'Active';
    case false:
      return 'Inactive';

    default:
      return 'Inactive';
  }
};

export const getRevenueDateRange = (revenueBy) => {
  switch (revenueBy) {
    case 0:
      return getCurrentDate();
    case 1:
      return getWeeklyDate();
    case 2:
      return getMonthlyDate();

    default:
      return getCurrentDate();
  }
};

export const getRevenueReadDateRange = (revenueBy) => {
  switch (revenueBy) {
    case 0:
      return getCurrentDateRead();
    case 1:
      return getWeeklyDateRead();
    case 2:
      return getMonthlyDateRead();

    default:
      return getCurrentDateRead();
  }
};

export const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values);
    try {
      validationSchema.validateSync(values, { abortEarly: false });
      return {};
    } catch (error) {
      return getErrorsFromValidationError(error);
    }
  };
};

export const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0;
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    };
  }, {});
};

const DATE_FORMAT = 'DD-MM-YYYY';

export const formatDate = (date) => {
  if (!date) return date;
  return moment(date).format('DD/MM/YYYY, HH:mm');
};

export const formatDateRange = (date) => {
  if (!date) return date;
  return moment(date).format(DATE_FORMAT);
};

export const getCurrentDate = (isFormat = false) => {
  return isFormat ? moment().format(DATE_FORMAT) : moment();
};

export const getDateTomorrow = (isFormat = false) => {
  return isFormat ? moment().add(1, 'day').format(DATE_FORMAT) : moment().add(1, 'day');
};

export const getDateYesterday = (isFormat = false) => {
  return isFormat ? moment().subtract(1, 'day').format(DATE_FORMAT) : moment().subtract(1, 'day');
};

export const getWeekAgoDate = (isFormat = false) => {
  return isFormat ? moment().subtract(7, 'day').format(DATE_FORMAT) : moment().subtract(7, 'day');
};

export const getMonthAgoDate = (isFormat = false) => {
  return isFormat ? moment().subtract(1, 'months').format(DATE_FORMAT) : moment().subtract(7, 'day');
};

export const formatDateChart = (date) => {
  if (!date) return date;
  return moment(date, 'DD/MM/YYYY').format('DD MMM');
};

export const formatDateMonth = (date) => {
  if (!date) return date;
  return moment(date, 'DD/MM/YYYY').format('DD MMM YYYY');
};

export const formatDateBirthday = (date) => {
  if (!date) return date;
  return moment(date, 'DD/MM/YYYY, HH:mm').format('DD/MM/YYYY');
};

export const getWeeklyDate = () => {
  return `${moment().subtract(7, 'day').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}`;
};

export const getMonthlyDate = () => {
  return `${moment().subtract(1, 'month').format('YYYY-MM-DD')},${moment().format('YYYY-MM-DD')}`;
};

export const getCurrentDateRead = () => {
  return moment().format('DD MMM YYYY');
};

export const getWeeklyDateRead = () => {
  return `${moment().subtract(7, 'day').format('DD MMM YYYY')} - ${moment().format('DD MMM YYYY')}`;
};

export const getMonthlyDateRead = () => {
  return `${moment().subtract(1, 'month').format('DD MMM YYYY')} - ${moment().format('DD MMM YYYY')}`;
};

export const formatCurrentDateTime = () => {
  return moment().format('YYYY-MM-DD HH:MM:SS.');
};

export const formatStringToNumber = (value) => {
  return Number(value);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const schema = {
  required: yup.string().required(({ path }) => `This field is required|${path}`),
  username: yup
    .string()
    .required('Please enter your username')
    .matches(/^[a-zA-Z0-9_]*$/, 'Please enter alphanumeric characters only')
    .min(6, `Please enter between 6-10 characters`)
    .max(10, `Please enter between 6-10 characters`),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, `Please enter between 6-20 characters`)
    .max(20, `Please enter between 6-20 characters`),
  alphanumeric: yup.string().matches(/^\w+$/, 'Please enter alphanumeric characters only'),
  max: (max) => yup.string().max(max, ({ path }) => `${path} cannot exceed ${max} characters`),
  email: yup.string().email(`Please enter a valid email`),
  confirmPassword: yup.string().oneOf([yup.ref('password')], `Those passwords didn't match. Please re-enter.`),
  walletAddress: yup.string().required('Please enter your wallet address'),
  callbackUrl: yup.string().required('Please enter your callback url'),
  referenceName: yup.string().required('Please enter your reference name'),
};
