import React, { useState } from 'react';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { authActions } from 'src/redux/authReducer';
import UserChangePasswordModal from './UserChangePasswordModal';
import { PERMISSION_ADMIN_CHANGE_PASSWORD } from 'src/helper/constants';
import { logout } from 'src/api/logout';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.userData);
  const permission = useSelector((state) => state.user.permission);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    // dispatch(authActions.signOut());
    logout();
    history.replace('/');
  };

  const handleActionClick = () => {
    setShowModal(!showModal);
  };

  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>{user && user.username}</strong>
          </CDropdownItem>
          {permission && permission.some((el) => el.PermissionDesc === PERMISSION_ADMIN_CHANGE_PASSWORD) && (
            <CDropdownItem onClick={handleActionClick}>
              <CIcon name="cil-user" className="mfe-2" />
              Change Password
            </CDropdownItem>
          )}
          <CDropdownItem onClick={handleLogout}>
            <CIcon name="cil-account-logout" content={cilAccountLogout} className="mfe-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      {showModal && <UserChangePasswordModal showModal={showModal} onModalClose={handleModalClose} />}
    </>
  );
};

export default TheHeaderDropdown;
