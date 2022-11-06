import {lazy} from "react";
import { ReactComponent as HomeSvg } from '../web/assets/svg/home.svg';
import { ReactComponent as HomeSelectedSvg } from '../web/assets/svg/home-selected.svg';
import { ReactComponent as IntelSvg  } from '../web/assets/svg/intel.svg';
import { ReactComponent as IntelSelectedSvg } from '../web/assets/svg/intel-selected.svg';
const UserList = lazy(() => import('../web/pages/UserList'));
const ProfilePage = lazy(() => import('../web/pages/Profile'));


const routes = [
  {
    path: '/userList',
    exact: true,
    name: 'Employee',
    element: UserList,
    menuType: 'main',
    icon: <HomeSvg />,
    selectedIcon: <HomeSelectedSvg />
  },
  {
    path: '/profile/:id',
    exact: true,
    name: 'Profile',
    element: ProfilePage,
    menuType: 'sub',
    icon: <IntelSvg />,
    selectedIcon: <IntelSelectedSvg />
  },
];

export default routes;
