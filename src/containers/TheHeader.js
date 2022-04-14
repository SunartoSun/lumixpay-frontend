import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHeader, CToggler, CHeaderBrand, CHeaderNav, CHeaderNavItem, CSubheader } from '@coreui/react';
import CIcon from '@coreui/icons-react';

// routes config
import routes from 'src/routes';

import { TheHeaderDropdown } from './index';
import { PATH_DASHBOARD } from 'src/helper/urlRoutes';
import { appActions } from 'src/redux/appStateReducer';

const TheHeader = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.appState.darkMode);
  const sidebarShow = useSelector((state) => state.appState.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch(appActions.toggleNavBar({ sidebarShow: val }));
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch(appActions.toggleNavBar({ sidebarShow: val }));
  };

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">{/* <CHeaderNavLink to={PATH_DASHBOARD}>Dashboard</CHeaderNavLink> */}</CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={() => dispatch(appActions.toggleDarkMode({ darkMode: !darkMode }))}
          title="Toggle Light/Dark Mode"
        >
          <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
        </CToggler>
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        {/* <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} /> */}
        {/* <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" aria-current="page" to={PATH_DASHBOARD}>
            <CIcon name="cil-graph" alt="Dashboard" />
            &nbsp;Dashboard
          </CLink>
        </div> */}
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
