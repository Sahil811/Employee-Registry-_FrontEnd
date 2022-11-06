import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import './App.css';
const Signup = lazy(() => import('./web/pages/Signup'));
const Login = lazy(() => import('./web/pages/Login'));
const UserList = lazy(() => import('./web/pages/UserList'));
const ProfilePage = lazy(() => import('./web/pages/Profile'));

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
  {
    path: '/userList',
    exact: true,
    name: 'UserList',
    element: UserList,
  },
  {
    path: '/profile/:id',
    exact: true,
    name: 'Profile',
    element: ProfilePage,
  },
];

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {
                  routes.map(route => <Route key={`${route.name}`} exact path={`${route.path}`} element={<route.element />} />)
                }
              </Routes>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
