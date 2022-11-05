import React from "react";
const Signup = React.lazy(() => import('../web/pages/Signup'));
const Login = React.lazy(() => import('../web/pages/Login'));

const routes = [
    {
      path: '/signup',
      exact: true,
      name: 'Signup',
      element: Signup,
    },
    {
      path: '/',
      exact: true,
      name: 'Login',
      element: Login,
    },
  ];
  
  export default routes;