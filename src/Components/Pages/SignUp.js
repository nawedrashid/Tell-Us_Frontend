import styled from "@emotion/styled";
import { AddAPhoto } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import coverImage from "../../Assets/TellUsCover.png";
import axios from "axios";
import { toast } from "react-toastify";

const STextField = styled(TextField)({
  margin: "5px",
  width: "75%",
});
const Signing = styled("div")({
  display: "flex",
  gap: "20px",
  marginBottom: "1rem",
});

const StyledCard = styled(Card)({
  left: "72%",
  borderRadius: "1rem",
});

const CoverImage = styled("div")({
  backgroundImage: `url(${coverImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "91.4vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SignUp = () => {
  const [addUser, setAddUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    userImage: "",
  });
  const [file, setFile] = useState();
  const navigate = useNavigate()

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAddUser({ ...addUser, userImage: reader.result });
    };
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", addUser.name);
      form.append("username", addUser.username);
      form.append("password", addUser.password);
      form.append("email", addUser.email);
      form.append("bio", addUser.bio);
      form.append("photo", file);
      const response = await axios({
        method: "post",
        url: "https://tell-us-backend.onrender.com/user/registration",
        data: form,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      if (response.data.success === true) {
        setAddUser({
          name: "",
          username: "",
          email: "",
          password: "",
          bio: "",
          userImage: "",
        });
        navigate('/')
        toast.success("Registered Successfully")
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <CoverImage>
      <StyledCard sx={{
          boxShadow: 20,
          width: { xs: "80%", sm: "23%" },
          position: { sm: "absolute" },
        }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            sx={{ height: 75, width: 75, mt: "1rem" }}
            src={addUser.userImage}
          />
          <Button
            sx={{
              borderRadius: "2rem",
              backgroundColor: "#f5c71a",
              color: "black",
              m: "1rem",
            }}
            variant="contained"
            component="label"
          >
            Add
            <input
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                previewImage(e.target.files[0]);
              }}
              type="file"
              hidden
            />
            <AddAPhoto />
          </Button>
          <STextField
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setAddUser({ ...addUser, name: e.target.value });
            }}
            value={addUser.name}
          />
          <STextField
            label="Username"
            variant="outlined"
            onChange={(e) => {
              setAddUser({ ...addUser, username: e.target.value });
            }}
            value={addUser.username}
          />
          <STextField
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setAddUser({ ...addUser, email: e.target.value });
            }}
            value={addUser.email}
          />
          <STextField
            label="Password"
            variant="outlined"
            onChange={(e) => {
              setAddUser({ ...addUser, password: e.target.value });
            }}
            value={addUser.password}
          />
          <STextField
            label="Bio"
            variant="outlined"
            onChange={(e) => {
              setAddUser({ ...addUser, bio: e.target.value });
            }}
            value={addUser.bio}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f5c71a",
              color: "black",
              width: "75%",
              margin: "1rem",
            }}
            onClick={(e) => onClickHandler(e)}
          >
            Register
          </Button>
          <Signing>
            <Typography>Already a User</Typography>
            <Link style={{ textDecoration: "none" }} to={"/"}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#f5c71a", color: "black" }}
              >
                Login
              </Button>
            </Link>
          </Signing>
        </Grid>
      </StyledCard>
    </CoverImage>
  );
};

export default SignUp;
