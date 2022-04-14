import React from 'react';
import PropTypes from 'prop-types';
import { CSpinner } from '@coreui/react';

const SpinnerLoading = ({ ...props }) => {
  return <CSpinner className="absolute-center" {...props} />;
};

SpinnerLoading.propTypes = {};

export default SpinnerLoading;
