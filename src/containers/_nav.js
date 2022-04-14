import React from 'react';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import { PATH_API_INTEGRATION, PATH_CURRENCY, PATH_DASHBOARD, PATH_DEPOSIT, PATH_WITHDRAWAL } from 'src/helper/urlRoutes';

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: PATH_DASHBOARD,
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Currency',
    to: PATH_CURRENCY,
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon" content={freeSet.cilCreditCard} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Deposit',
    to: PATH_DEPOSIT,
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon" content={freeSet.cilCreditCard} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Withdrawal',
    to: PATH_WITHDRAWAL,
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon" content={freeSet.cilCreditCard} />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'API Integration',
    to: PATH_API_INTEGRATION,
    icon: <CIcon name="cil-credit-card" customClasses="c-sidebar-nav-icon" content={freeSet.cilCreditCard} />,
  },
];
