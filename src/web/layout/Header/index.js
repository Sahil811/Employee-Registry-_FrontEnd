import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logoutActionCreator } from '../../../redux/slices/user';

import NavBar from '../Navbar';
import './index.scss';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state?.userData?.userInfo );
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    dispatch(logoutActionCreator());
    navigate('/')
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar elevation={0} className="header__appbar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="header__menuicon"
            sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="header__logo">
            Employee Register
          </Typography>
          <IconButton size="large" className="header__user-icon">
            <AccountCircle />
          </IconButton>
          <Typography variant="p" noWrap component="div" className="header__user">
            {/* {I18n.get(role)} */}
          </Typography>
          <IconButton size="large" onClick={handleMenu}>
            <ExpandMoreOutlinedIcon />
          </IconButton>
          <div className="user-menu">
            <Menu
              sx={{ top: '35px', right: '25px' }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>{userInfo?.userName}</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <Box component="div" mt={8}>
        <NavBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </Box> 
    </>
  );
}

export default Header;
