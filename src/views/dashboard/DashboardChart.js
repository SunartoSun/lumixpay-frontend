import React, { useEffect, useState } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import { useDispatch } from 'react-redux';
import { fetchDashboardChart } from 'src/redux/dashboardReducer';
import { formatDateChart } from 'src/helper/utils';

const brandSuccess = getStyle('success') || '#4dbd74';
const brandInfo = getStyle('info') || '#20a8d8';
const brandDanger = getStyle('danger') || '#f86c6b';

const DashboardChart = ({ onDateClick, items, ...style }) => {
  const dispatch = useDispatch();
  const [datasets, setDatasets] = useState([]);
  const [dataLabel, setDataLabel] = useState([]);

  useEffect(() => {
    if (!items) return;
    const dataDate = items.Chart.map((d) => {
      return formatDateChart(d.Date);
    });
    const dataTotalDeposit = items.Chart.map((d) => {
      return d.TotalDeposit;
    });
    const dataTotalWinning = items.Chart.map((d) => {
      return d.TotalWinning;
    });
    const dataTotalWithdrawal = items.Chart.map((d) => {
      return d.TotalWithdrawal;
    });

    setDataLabel(dataDate);
    setDatasets([
      {
        label: 'Total Deposit',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: dataTotalDeposit,
      },
      {
        label: 'Total Winning',
        backgroundColor: hexToRgba(brandSuccess, 10),
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: dataTotalWinning,
      },
      {
        label: 'Total Withdrawal',
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: dataTotalWithdrawal,
      },
    ]);
  }, [items]);

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...style}
      datasets={datasets}
      options={defaultOptions}
      labels={dataLabel}
      // labels={[
      //   'Mo',
      //   'Tu',
      //   'We',
      //   'Th',
      //   'Fr',
      //   'Sa',
      //   'Su',
      //   'Mo',
      //   'Tu',
      //   'We',
      //   'Th',
      //   'Fr',
      //   'Sa',
      //   'Su',
      //   'Mo',
      //   'Tu',
      //   'We',
      //   'Th',
      //   'Fr',
      //   'Sa',
      //   'Su',
      //   'Mo',
      //   'Tu',
      //   'We',
      //   'Th',
      //   'Fr',
      //   'Sa',
      //   'Su',
      // ]}
    />
  );
};

export default DashboardChart;
