import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
  Package as PackageIcon
} from "react-feather";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import shopAPI from "../api/shop";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Katarina Smith"
};

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard"
  },
  {
    href: "/app/orders",
    icon: PackageIcon,
    title: "Orders"
  },
  {
    href: "/app/products",
    icon: ShoppingBagIcon,
    title: "Products"
  },
  {
    href: "/app/account",
    icon: UserIcon,
    title: "Account"
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings"
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  const shop = state.entities.shop.data;
  const [data, setData] = useState(null);
  const shopId = shop._id;
  const email = shop.email;
  const [image, setImage] = useState(null);

  const getShopData = async () => {
    const result = await shopAPI.getShopData(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setData(result.data);
    setImage(
      result.data.image === null
        ? "https://via.placeholder.com/150"
        : result.data.image
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getShopData();
    if (openMobile && onMobileClose) {
      onMobileClose();
      // setImage(
      //   shop.image === null ? "https://via.placeholder.com/150" : shop.image
      // );
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={image}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {data?.shopName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {data?.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)"
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
