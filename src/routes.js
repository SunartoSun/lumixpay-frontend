import React from 'react';
import { PATH_API_INTEGRATION, PATH_CURRENCY, PATH_DASHBOARD, PATH_DEPOSIT, PATH_MERCHANT, PATH_WITHDRAWAL } from './helper/urlRoutes';

const Dashboard = React.lazy(() => import('./views/dashboard/DashboardPage'));

const Currency = React.lazy(() => import('./views/currency/CurrencyPage'));
const Deposit = React.lazy(() => import('./views/deposit/DepositPage'));
const Withdrawal = React.lazy(() => import('./views/withdrawal/WithdrawalPage'));
const ApiIntegration = React.lazy(() => import('./views/apiIntegration/ApiIntegrationPage'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: PATH_DASHBOARD, name: 'Dashboard', component: Dashboard },
  { path: PATH_CURRENCY, name: 'Currency', component: Currency },
  { path: PATH_DEPOSIT, name: 'Deposit', component: Deposit },
  { path: PATH_WITHDRAWAL, name: 'Withdrawal', component: Withdrawal },
  { path: PATH_API_INTEGRATION, name: 'ApiIntegration', component: ApiIntegration },
];

export default routes;
