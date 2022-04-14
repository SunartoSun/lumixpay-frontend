import React, { lazy, useEffect, useState } from 'react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import MainChartExample from './DashboardChart';
import { useHistory } from 'react-router-dom';
import { getRevenueReadDateRange, getCurrentDate, getWeekAgoDate, getMonthAgoDate, getDateTomorrow } from 'src/helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import DashboardChart from './DashboardChart';
import { OptionsDateRange } from 'src/helper/selectOptions';
import { fetchDashboardChart } from 'src/redux/dashboardReducer';
import { PERMISSION_ADMIN_DASHBOARD_CARD, PERMISSION_ADMIN_DASHBOARD_CHART } from 'src/helper/constants';
import AmountField from 'src/reusable/AmountField';

const DashboardCard = lazy(() => import('./DashboardCard.js'));

const assets = [
  {
    currency: 'ETH',
    amount: 1.0,
  },
  {
    currency: 'USDT',
    amount: 2.0,
  },
];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.user.permission);
  const [dateRange, setDateRange] = useState({ rangeButton: 2, startDate: getMonthAgoDate(true), endDate: getCurrentDate(true) });
  const [chartItems, setChartItems] = useState(null);

  useEffect(() => {
    // dispatch(
    //   fetchDashboardChart({
    //     df: dateRange.startDate,
    //     dt: dateRange.endDate,
    //   }),
    // ).then((data) => {
    //   if (data.payload) {
    //     const queryItems = data.payload.result;
    //     setChartItems(queryItems);
    //   }
    // });
  }, [dateRange]);

  return (
    <>
      <CCard>
        <CCardBody>
          <DashboardChart items={chartItems} style={{ height: '300px', marginTop: '40px' }} />
        </CCardBody>

        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">ETH</div>
              <strong>{chartItems && chartItems.TotalProfit}</strong>
              <CProgress className="progress-xs mt-2" precision={1} color="success" value={40} />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">USDT</div>
              <strong>{chartItems && chartItems.TotalWinlose}</strong>
              <CProgress className="progress-xs mt-2" precision={1} color="info" value={40} />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard>
        <CCardHeader>Your Assets</CCardHeader>
        <CCardBody>
          {assets.map((d) => (
            <AmountField currency={d.currency} amount={d.amount} />
          ))}
        </CCardBody>
      </CCard>
    </>
  );
};

export default DashboardPage;
