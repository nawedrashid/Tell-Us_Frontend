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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../Store/UserSlice";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";


const Followings = () => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const followings = user.followings;
  const [follow, setFollow] = useState(true)
console.log(followings)
  useEffect(() => {
    const getFollowingData = async () => {
      try {
        const response = await axios.get(
          `https://tell-us-backend.herokuapp.com/user/${user._id}`
        );
        if(response)
        dispatch(
          userAction.getUserFollowings(response.data.getDetails.followings)
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    getFollowingData();
  }, [dispatch,follow]);

  const unfollowHandler = async(clientId) => {
    try {
      const response = await axios.post(`https://tell-us-backend.herokuapp.com/userActions/${user._id}/unfollow/${clientId}`)
      if(response){
        setFollow(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3}>
          {followings.length === 0 ? (
            <Typography sx={{color:"#f5c71a"}} variant="h6">You are following no one</Typography>
          ) : (
            followings.map((eachUser) => (
              <Card sx={{ boxShadow: 5, borderRadius:"0.75rem", bgcolor:"#f5c71a", mt:"1rem" }}>
                <CardContent>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Stack direction="row" spacing={1}>
                        <Avatar src={eachUser.avatar}  />
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
                          border:"solid 1px black"
                        }}
                        onClick={()=>unfollowHandler(eachUser._id)}
                      >
                        Unfollow
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

export default Followings