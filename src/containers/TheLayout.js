import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { TheContent, TheSidebar, TheAside, TheFooter, TheHeader } from './index';
import { useHistory } from 'react-router-dom';
const TheLayout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.appState.darkMode);
  const classes = classNames('c-app c-default-layout', darkMode && 'c-dark-theme');

  // async function callApiRefreshToken() {
  //   try {
  //     const { data } = await refreshToken({ variables: { token: accessToken } });
  //     if (data && data.refreshToken.public) {
  //       dispatch(storeAccessToken(data.refreshToken.data.token));
  //       Cookies.set('token', data.refreshToken.data.token, { expires: 1 / 96 });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     callApiRefreshToken();
  //   }, 15 * 60 * 1000);

  //   return () => clearInterval(interval);
  // }, [accessToken]);

  return (
    <div className={classes}>
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
