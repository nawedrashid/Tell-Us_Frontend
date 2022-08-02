import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../Store/UserSlice";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";

const Followers = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const followers = user.followers;

  useEffect(() => {
    const getFollowersData = async () => {
      try {
        const response = await axios.get(
          `https://tell-us-backend.herokuapp.com/user/${user._id}`
        );
        if (response)
          dispatch(
            userAction.getUserFollowers(response.data.getDetails.followers)
          );
      } catch (error) {
        console.log(error.message);
      }
    };
    getFollowersData();
  }, [dispatch]);

  const removeFollowerHandler = async (clientId) => {
    try {
      const response = await axios.post(
        `https://tell-us-backend.herokuapp.com/userActions/${user._id}/removefollower/${clientId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3}>
          {followers.length === 0 ? (
            <Typography sx={{ color: "#f5c71a" }} variant="h6">
              Oops... You have 0 followers
            </Typography>
          ) : (
            followers.map((eachUser) => (
              <Card
                sx={{
                  boxShadow: 5,
                  borderRadius: "0.75rem",
                  bgcolor: "#f5c71a",
                }}
              >
                <CardContent>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Stack direction="row" spacing={1}>
                        <Avatar src={eachUser.avatar} />
                        {/* <Stack direction="column" justifyContent="space-between"> */}
                        <Typography pt={0.5} component="div" variant="h6">
                          {eachUser.name}
                        </Typography>
                        {/* <Typography color="#f5c71a" component="div" variant="body2">
                    bio
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography
                      color="#f5c71a"
                      component="div"
                      variant="subtitle2"
                    >
                      Followings:
                    </Typography>
                    <Typography
                      color="#f5c71a"
                      component="div"
                      variant="subtitle2"
                    >
                      Followers:
                    </Typography>
                  </Stack>
                </Stack> */}
                      </Stack>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#f5c71a",
                          borderRadius: "3rem",
                          color: "black",
                          border: "solid 1px black",
                        }}
                        onClick={removeFollowerHandler(eachUser._id)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Followers;
