import React from "react";
const Signup = React.lazy(() => import('../web/pages/Signup'));

const routes = [
    {
      path: '/',
      exact: true,
      name: 'Signup',
      element: Signup,
    },
  ];
  
  export default routes;