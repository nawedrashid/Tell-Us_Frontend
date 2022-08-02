import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/SignUp";
import Profile from "./Components/Pages/Profile";
import Posts from "./Components/Posts/UserPosts";
import PrivateRoute from "./Components/PrivateRoute";
import { Box } from "@mui/material";
import Followers from "./Components/Pages/Followers";
import Followings from "./Components/Pages/Followings";
import PostComment from "./Components/Posts/PostComment";
import axios from "axios";
import { useEffect } from "react";
import SearchPage from "./Components/Pages/Search";
import Settings from "./Components/Pages/Settings";

function App() {

  useEffect(() => {
    const getFollowingData = async () => {
      try {
        const response = await axios.get(
          `https://tell-us-backend.herokuapp.com/userActions/unfollowed`
        );
        if(response)
        console.log(response)
      } catch (error) {
        console.log(error.message);
      }
    };
    getFollowingData();
  }, []);
  return (
    <>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/followers" element={<Followers/>} />
          <Route path="/followings" element={<Followings/>} />
          <Route path="/Search" element={<SearchPage/>} />
          <Route path="/Settings" element={<Settings/>} />
          <Route path="/posts/:postId/comments" element={<PostComment/>} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
