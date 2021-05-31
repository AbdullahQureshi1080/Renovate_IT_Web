import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "./Logo";
// import useAuth from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import localStorage from "../hooks/storage";
import { logout } from "src/store/shop";
import { useDispatch } from "react-redux";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeToken();
    dispatch(logout());
    navigate("/Login", { replace: true });
  };
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit" onClick={() => logOut()}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
