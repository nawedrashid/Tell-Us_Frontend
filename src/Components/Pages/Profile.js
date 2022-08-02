import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { AddAPhoto, Edit } from "@mui/icons-material";
import styled from "@emotion/styled";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid black",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

const STextField = styled(TextField)({
  margin: "5px",
  width: "75%",
});

const Profile = () => {

  const userInfo = useSelector((state) => state.user);

  const [editUser, setEditUser] = useState({
    name: "",
    username: "",
    bio: "",
    userImage: "",
  });
  const [file, setFile] = useState();

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditUser({ ...editUser, userImage: reader.result });
    };
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const form = new FormData();
      form.append("name", editUser.name);
      form.append("username", editUser.username);
      form.append("bio", editUser.bio);
      form.append("photo", file);
      const response = await axios({
        method: "post",
        url: `https://tell-us-backend.herokuapp.com/user/editProfile/${userInfo.user._id}`,
        data: form,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      if (response.data.success === true) {
        setEditUser({
          name: "",
          username: "",
          bio: "",
          userImage: "",
        });
        toast.success("Profile Updated")
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 

  const [open, setOpen] = useState(false);
  const modalOpenHandler = () => setOpen(true);
  const modalCloseHandler = () => setOpen(false);
  

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3} mt={2}>
          <Card
            sx={{ boxShadow: 5, borderRadius: "0.75rem", bgcolor: "#f5c71a" }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Avatar
                    sx={{ width: 250, height: 250, mt: 2 }}
                    src={userInfo?.user?.avatar}
                  />
                  <Typography pt={0.5} component="div" variant="h3">
                    {userInfo?.user?.name}
                  </Typography>
                  <Typography pt={0.5} component="div" variant="h6">
                    Username: {userInfo?.user?.username}
                  </Typography>
                  <Typography component="div" variant="subtitle2">
                    Email: {userInfo?.user?.email}
                  </Typography>
                  <Typography component="div" variant="body2">
                    Bio: {userInfo?.user?.bio}
                  </Typography>
                  <Grid
                    container
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                    }}
                  >
                    <Card
                      sx={{
                        boxShadow: 2,
                        p: 2,
                        width: 100,
                        borderRadius: "0.75rem",
                        bgcolor: "#f5c71a",
                        m: 1,
                      }}
                    >
                      <Typography component="div" variant="subtitle2">
                        Followings: {userInfo?.user?.followings.length}
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        boxShadow: 2,
                        p: 2,
                        width: 100,
                        borderRadius: "0.75rem",
                        bgcolor: "#f5c71a",
                        m: 1,
                      }}
                    >
                      <Typography component="div" variant="subtitle2">
                        Followers: {userInfo?.user?.followers.length}
                      </Typography>
                    </Card>
                    <Card
                      sx={{
                        boxShadow: 2,
                        p: 2,
                        width: 100,
                        borderRadius: "0.75rem",
                        bgcolor: "#f5c71a",
                        m: 1,
                      }}
                    >
                      <Typography component="div" variant="subtitle2">
                        Posts: {userInfo?.user?.posts.length}
                      </Typography>
                    </Card>
                  </Grid>
                  <IconButton
                    sx={{ p:"1rem", color: "black" }}
                  >
                    <Edit onClick={modalOpenHandler} />
                    Edit
                    <Modal
                      open={open}
                      onClose={modalCloseHandler}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Grid
                          container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Avatar sx={{ height: 75, width: 75, mt: "1rem" }} 
                          src={editUser.userImage}/>
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
                            setEditUser({ ...editUser, name: e.target.value });
                              }}
                              value={editUser.name}
                          />
                          <STextField
                            label="Username"
                            variant="outlined"
                              onChange={(e) => {
                            setEditUser({ ...editUser, username: e.target.value });
                              }}
                              value={editUser.username}
                          />
                          <STextField
                            label="Bio"
                            variant="outlined"
                              onChange={(e) => {
                            setEditUser({ ...editUser, bio: e.target.value });
                              }}
                              value={editUser.bio}
                          />
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#f5c71a",
                              color: "black",
                              width: "75%",
                              margin: "1rem",
                            }}
                            onClick={editProfileHandler}
                          >
                            Confirm
                          </Button>
                        </Grid>
                      </Box>
                    </Modal>
                  </IconButton>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Profile;
