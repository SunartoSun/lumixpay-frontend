import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CNavItem,
  CProgress,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Logo from 'src/assets/icons/LogoFooter.png';
import LogoSmall from 'src/assets/icons/Logo.png';

// sidebar nav config
import navigation from './_nav';
import { appActions } from 'src/redux/appStateReducer';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.appState.sidebarShow);
  const permission = useSelector((state) => state.user.permission);
  const [filterNav, setFilterNav] = useState(navigation);

  useEffect(() => {
    // const result = navigation.filter((o1) => permission && permission.some((o2) => o1.permission === o2.PermissionDesc));
    // const result = navigation.filter((o1) => {
    //   if (permission && permission.some((o2) => o1.permission === o2.PermissionDesc)) {
    //     const fil1 = o1;
    //     if (o1._tag === 'CSidebarNavDropdown') {
    //       const fil2 = o1._children.filter((o3) => permission && permission.some((o4) => o3.permission === o4.PermissionDesc));
    //       fil1._children = fil2;
    //     }

    //     return fil1;
    //   }
    // });
    // setFilterNav(result);
    setFilterNav(navigation);
  }, []);

  return (
    <CSidebar show={show} unfoldable onShowChange={(val) => dispatch(appActions.toggleNavBar({ sidebarShow: val }))}>
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CImg className="c-sidebar-brand-full" src={Logo} height={35} /> */}
        <CImg className="c-sidebar-brand-minimized" src={LogoSmall} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={filterNav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
