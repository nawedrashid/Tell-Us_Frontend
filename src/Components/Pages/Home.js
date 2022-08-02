import { Box, Stack } from "@mui/material";
import React from "react";
import CreatePost from "../Posts/CreatePost";
import FeedPosts from "../Posts/FeedPosts";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";

const Home = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={2} pt={3}>
          <CreatePost />
          <FeedPosts />
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Home;
