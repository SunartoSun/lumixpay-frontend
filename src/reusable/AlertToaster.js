import React from 'react';
import PropTypes from 'prop-types';
import { CAlert, CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react';
import { connect, useSelector } from 'react-redux';
import { alertActions, STATUS_TYPE } from 'src/redux/alertReducer';

const mapDispatch = alertActions;

const AlertToaster = (props) => {
  const isShowing = useSelector((state) => state.alert.isShowing);
  const messageStack = useSelector((state) => state.alert.messageStack);

  const alertData = useSelector((state) => {
    if (state.alert.messageStack.length > 0) {
      return state.alert.messageStack[0];
    }
    return {};
  });

  const { title, message, status } = alertData;

  const handleClose = () => {
    props.toggle(false);
    props.dismissAlert();
  };

  React.useEffect(() => {
    if (messageStack.length > 0) {
      console.log('messageStack', messageStack);
      props.toggle(true);
    }
  }, [props, messageStack]);

  return (
    <CToaster position="top-right">
      <CToast
        show={isShowing}
        autohide={3000}
        fade
        onStateChange={(state) => state === false && handleClose()}
        style={{ backgroundColor: status === STATUS_TYPE.SUCCESS ? '#2eb85c' : '#e55353', color: 'white' }}
      >
        <CToastHeader closeButton style={{ backgroundColor: 'transparent', color: 'white' }}>
          {title}
        </CToastHeader>
        <CToastBody>{message}</CToastBody>
      </CToast>
    </CToaster>
  );
};

AlertToaster.propTypes = {
  toggle: PropTypes.func.isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(AlertToaster);
