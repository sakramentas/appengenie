import {isAuthenticated} from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Issues from './pages/issues';
import {IssuePage} from './pages/issues/issue-page';
import {ProfilePage} from './pages/user/profile-page';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  ISSUES: '/issues',
  ISSUE_PAGE: '/issues/page',
  PROFILE_PAGE: '/users/profile',
};


const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.ISSUES);
    }
  };
};


export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Issues,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.ISSUES,
        component: Issues,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.ISSUE_PAGE,
        component: IssuePage,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.PROFILE_PAGE,
        component: ProfilePage,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
