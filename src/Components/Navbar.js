import styled from "@emotion/styled";
import { Deck, Login, Logout } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userAction } from "../Store/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#f5c71a",
  color: "black",
});

const UserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginRight: "2.5%",
}));

const Navbar = () => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h4"
          fontWeight="bold"
          marginLeft="2%"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Tell Us
        </Typography>

        <Deck
          fontSize="large"
          sx={{ display: { xs: "block", sm: "none" }, marginLeft: "2%" }}
        />
        {!userInfo.userLoggedIn ? (
          <UserInfo>
            <Typography variant="h6" fontWeight="bold">
              Login to Continue!!
            </Typography>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f5c71a",
                  border: "solid black 1px",
                  borderRadius: "2rem",
                  color: "black",
                  m: "0 1rem",
                  p: "0 2rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Login
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <IconButton>
                <Login
                  sx={{
                    display: { xs: "block", sm: "none" },
                    marginLeft: "2%",
                  }}
                />
              </IconButton>
            </Link>
          </UserInfo>
        ) : (
          <UserInfo>
            <Typography variant="h5" fontWeight="bold" marginLeft="2%">
              Welcome
            </Typography>
            <Typography variant="body1" fontWeight="bold" marginLeft="2%">
              {userInfo?.user?.name}
            </Typography>
            <Avatar src={userInfo?.user?.avatar} />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f5c71a",
                border: "solid black 1px",
                borderRadius: "3rem",
                color: "black",
                ml: "3%",
                p: "0 2rem",
                display: { xs: "none", sm: "flex" }
              }}
              onClick={() => {
                dispatch(userAction.logoutUser());
                navigate("/");
                toast.success("LoggedOut Successfully")
              }}
            >
              Logout
            </Button>
            <IconButton>
              <Logout
                sx={{ display: { xs: "block", sm: "none" }, marginLeft: "2%" }}
                onClick={() => {
                  dispatch(userAction.logoutUser());
                  navigate("/");
                }}
              />
            </IconButton>
          </UserInfo>
        )}
      </StyledToolbar>
    </AppBar>
    <ToastContainer theme="light" position="top-center" autoClose={1000}  />
    </>
  );
};

export default Navbar;
