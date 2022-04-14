import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { CWidgetProgressIcon, CSpinner, CCardGroup } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardCard } from 'src/redux/dashboardReducer';

const DashboardCard = ({ dateRange }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dashboard.loading);
  const [items, setItems] = useState(null);

  useEffect(() => {
    dispatch(
      fetchDashboardCard({
        df: dateRange.startDate,
        dt: dateRange.endDate,
      }),
    ).then((data) => {
      if (data.payload) {
        const queryItems = data.payload.result;
        setItems(queryItems);
      }
    });
  }, [dateRange]);

  function TotalDeposit() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.TotalDeposit}` : `0`;
  }

  function TotalWithdrawal() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.TotalWithdarawal}` : `0`;
  }

  function TotalWager() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.TotalWager}` : `0`;
  }

  function TotalWinning() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.TotalWinning}` : `0`;
  }

  function TotalActiveUsers() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.ActiveUsers}` : `0`;
  }

  function TotalNewUsers() {
    if (loading) return <CSpinner size="sm" />;

    return items ? `${items.TotalNewUsers}` : `0`;
  }

  return (
    <CCardGroup className="mb-4">
      <CWidgetProgressIcon header={TotalDeposit()} text="Total Deposit" color="gradient-info" inverse>
        <CIcon name="cil-credit-card" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon header={TotalWithdrawal()} text="Total Withdrawal" color="gradient-success" inverse>
        <CIcon name="cil-credit-card" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon header={TotalWager()} text="Total Wager" color="gradient-warning" inverse>
        <CIcon name="cil-credit-card" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon header={TotalWinning()} text="Total Winnings" color="gradient-danger" inverse>
        <CIcon name="cil-credit-card" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon header={TotalActiveUsers()} text="Curreny Active Users" color="gradient-primary" inverse>
        <CIcon name="cil-people" height="36" />
      </CWidgetProgressIcon>

      <CWidgetProgressIcon header={TotalNewUsers()} text="Total New Users" color="gradient-dark" inverse>
        <CIcon name="cil-people" height="36" />
      </CWidgetProgressIcon>
    </CCardGroup>
  );
};

DashboardCard.propTypes = {
  dateRange: PropTypes.object.isRequired,
};

export default DashboardCard;
