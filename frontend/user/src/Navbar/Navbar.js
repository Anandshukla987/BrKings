import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../Images/BrownieKing.png";
import Stack from "@mui/material/Stack";
import Styles from "../Component/Global.module.css";
import NavTabs from "../Component/NavTabs/NavTabs";
import "../Component/NavTabs/NavTabs.css";
import { NavLink, json, useNavigate } from "react-router-dom";
import Signup from "../Component/Auth/Signup";
import Login from "../Component/Auth/Login";
import LoginOutBtn from "../Component/Auth/LoginoutBtn/LoginoutBtn";
import Button from "@mui/material/Button";
import "../Component/NavTabs/NavTabs.css";
import { selectAuthUser, closeLog, loginBox } from "../Redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const pages = ["Brownies", "Track Order", "Get in Touch", "about us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authUser?.user) {
      dispatch(closeLog());
      navigate("/");
    } else {
      dispatch(loginBox());
    }
  },[authUser.user]);

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <div className="navBar">
        <AppBar position="static">
          <Container maxWidth="2xl" sx={{ backgroundColor: "black" }}>
            <Toolbar disableGutters>
              <NavLink to="/">
                <Stack
                  className={Styles.logo}
                  spacing={-2}
                  sx={{
                    minWidth: 0,
                    display: { xs: "none", md: "flex" },
                    mr: 1,
                  }}
                >
                  <img src={Logo} alt="Brownie King" />
                  <Typography
                    variant="h6"
                    nowrap="true"
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "Amita",
                      fontWeight: 700,
                      letterSpacing: ".2rem",
                      color: "#dd6800",
                      textDecoration: "none",
                    }}
                  >
                    Brownie King
                  </Typography>
                </Stack>
              </NavLink>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="medium"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* <NavLink to='/'> */}
              <Box
                className={Styles.logo}
                sx={{ display: { xs: "flex", md: "none" }, mr: 0 }}
              >
                <img src={Logo} alt="Brownie King" />
              </Box>
              <Typography
                variant="h6"
                wrap="true"
                component="a"
                href=""
                sx={{
                  mr: 1,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Amita",
                  fontWeight: 700,
                  color: "#dd6800",
                  textDecoration: "none",
                }}
              >
                Brownie King
              </Typography>
              {/* </NavLink> */}
              <Stack
                sx={{
                  flexGrow: 1,
                  backgroundColor: "black",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                <NavTabs />
              </Stack>

              <LoginOutBtn flag={authUser.user}/>

              <NavLink
                className="mx-0 transform transition duration-300 hover:scale-110"
                to="/Cart"
              >
                <IconButton
                  color="primary"
                  sx={{ color: "#dd6800" }}
                  aria-label="add to shopping cart"
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </NavLink>
            </Toolbar>
          </Container>
        </AppBar>
        {authUser.openLogin ? <Login /> : null}
        {authUser.openSignup ? <Signup /> : null}
      </div>
    </>
  );
};

export default Navbar;
