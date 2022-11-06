import { Fragment, useState, useEffect } from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Box
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import './index.scss';
import routes from '../../../route/route';

function NavBar({ mobileOpen, handleDrawerToggle, ...props }) {
  const [selected, setSelected] = useState('Employee');
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  let showSubMenu = true;

  if (
    location.pathname.includes('/userList') 
  ) {
    showSubMenu = false;
  }

  useEffect(() => {
    if (location.pathname.includes('/userList')) setSelected('Employee');
    if (location.pathname.includes('/profile')) setSelected('Profile');
  }, [location]);

  const container = window !== undefined ? () => window().document.body : undefined;
  const routeChange = (routeName) => {
    if (routeName.includes('/profile')) {
      const id = location.pathname.split('/').pop();
      navigate(`${routeName}/${id}`);
    } else {
      navigate(routeName);
    }
  };

  const drawer = (
    <div className="navbar__drawer">
      <Toolbar sx={{ display: { xs: 'none', sm: 'block' } }} className="drawer__top" />
      <List className="navbar__list">
        {routes.map((route, index) => (
          <Fragment key={index}>
            {route.menuType === 'sub' && showSubMenu === false ? (
              ''
            ) : (
              <>
                <ListItem
                  key={index}
                  button
                  className="navbar__listitem"
                  onClick={() => routeChange(route.path)}>
                  <MenuItem button="true" selected={selected === route.name}>
                    <ListItemIcon className={`navbar__listitem-icon `}>
                      {selected === route.name ? route.selectedIcon : route.icon}
                    </ListItemIcon>
                  </MenuItem>
                  <ListItemText
                    key={index}
                    primary={route.name}
                    className="navbar__listitem-text"
                  />
                </ListItem>
                <div className="navbar__divider" />
              </>
            )}
          </Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box component="nav" className="navbar__container">
      <Drawer
        container={container}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }
        }}>
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' }
        }}
        open>
        {drawer}
      </Drawer>
    </Box>
  );
}

export default NavBar;
