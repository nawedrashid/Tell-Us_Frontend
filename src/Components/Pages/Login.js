import styled from "@emotion/styled";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import coverImage from "../../Assets/TellUsCover.png";
import { userAction } from "../../Store/UserSlice";

const STextField = styled(TextField)({
  margin: "5px",
  width: "75%",
});
const Signing = styled("div")({
  display: "flex",
  gap: "20px",
  margin: "1rem",
});

const StyledCard = styled(Card)({
  height: "70vh",
  // position: "absolute",
  left: "72%",
  // left: { sx:"50%", sm:"72%"},
  borderRadius: "1rem",
  // width: { sx:"90%", sm:"23%"},
  width: "23%",
});

const CoverImage = styled("div")({
  backgroundImage: `url(${coverImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "91.3vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tell-us-backend.onrender.com/user/login", {
        email: user.email,
        password: user.password,
      });
      if (response.data.success === true) {
        await dispatch(userAction.loginUser(response.data.checkUser));
        toast.success(`Welcome ${response.data.checkUser.name}`)
        console.log(response.data.checkUser)
        if (location?.state?.from) navigate(location.state.from);
        else navigate("/Home");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CoverImage>
      <StyledCard
        sx={{
          boxShadow: 20,
          width: { xs: "80%", sm: "23%" },
          position: { sm: "absolute" },
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            padding="3rem"
            sx={{ color: "#f5c71a" }}
          >
            Login
          </Typography>
          <STextField
            label="Email"
            variant="outlined"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
          <STextField
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f5c71a",
              color: "black",
              width: "75%",
              margin: "1rem",
            }}
            type="submit"
            onClick={(e) => loginHandler(e)}
          >
            Login
          </Button>
          <Signing>
            <Typography>Not Registered?</Typography>
            <Link style={{ textDecoration: "none" }} to={"/SignUP"}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#f5c71a", color: "black" }}
              >
                Register
              </Button>
            </Link>
          </Signing>
        </Grid>
      </StyledCard>
    </CoverImage>
  );
};

export default Login;
