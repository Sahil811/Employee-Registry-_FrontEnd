import {lazy} from "react";
import { ReactComponent as HomeSvg } from '../web/assets/svg/home.svg';
import { ReactComponent as HomeSelectedSvg } from '../web/assets/svg/home-selected.svg';
const UserList = lazy(() => import('../web/pages/UserList'));

const routes = [
  {
    path: '/userList',
    exact: true,
    name: 'Employee',
    element: UserList,
    menutype: 'main',
    icon: <HomeSvg />,
    selectedIcon: <HomeSelectedSvg />
  },
  // {
  //   path: '/myprojects',
  //   name: 'My Projects',
  //   element: Myprojects,
  //   menutype: 'main',
  //   icon: <MyProjectsSvg />,
  //   selectedIcon: <MyProjectsSelectedSvg />
  // },
  // {
  //   path: '/intel',
  //   name: 'Intel',
  //   element: Summary,
  //   menutype: 'sub',
  //   icon: <IntelSvg />,
  //   selectedIcon: <IntelSelectedSvg />
  // },
  // {
  //   path: '/vision',
  //   name: 'Vision',
  //   element: ProjectMap,
  //   menutype: 'sub',
  //   icon: <VisionSvg />,
  //   selectedIcon: <VisionSelectedSvg />
  // },
  // {
  //   path: '/marketplace',
  //   name: 'Marketplace',
  //   element: Marketplace,
  //   menutype: 'main',
  //   icon: <MarketSvg />,
  //   selectedIcon: <MarketSelectedSvg />
  // }
];

export default routes;