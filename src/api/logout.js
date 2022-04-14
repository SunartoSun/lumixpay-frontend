// import { persistor, store } from 'store';
// eslint-disable-next-line import/no-cycle
import Cookies from 'js-cookie';
import { PATH_LOGIN } from 'src/helper/urlRoutes';
import { persistor, store } from 'src/redux';
import { authActions } from 'src/redux/authReducer';

export const logout = async () => {
  store.dispatch(authActions.signOut());
  Cookies.remove('token');
  persistor.purge();
  localStorage.clear();
  window.location = `/#${PATH_LOGIN}`;
};
