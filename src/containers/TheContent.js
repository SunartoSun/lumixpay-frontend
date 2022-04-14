import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

// routes config
import routes from '../routes';
import { PATH_ACCOUNT, PATH_DASHBOARD, PATH_LOGIN } from 'src/helper/urlRoutes';
import Cookies from 'js-cookie';
import { PERMISSION_ADMIN_DASHBOARD_CARD } from 'src/helper/constants';
import { useSelector } from 'react-redux';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const permission = useSelector((state) => state.user.permission);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) =>
                      Cookies.get('token') ? (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      ) : (
                        <Redirect to={{ pathname: PATH_LOGIN }} />
                      )
                    }
                  />
                )
              );
            })}
            <Redirect from="/" to={PATH_DASHBOARD} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
