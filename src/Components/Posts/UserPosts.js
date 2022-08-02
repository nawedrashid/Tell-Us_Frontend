import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Favorite, Delete, ThumbDown, Comment } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { postAction } from "../../Store/PostSlice";
import Sidebar from "../Sidebar";
import Rightbar from "../Rightbar";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const [count, setCount] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://tell-us-backend.herokuapp.com/user/${user._id}/posts`
        );
 
        if (response) {
          await dispatch(postAction.getPost(response.data.getDetails.posts));
          setCount(false)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [dispatch,count]);

  const likeHandler = async (postId) => {
    try {
      const response = await axios.post(
        `https://tell-us-backend.herokuapp.com/userActions/${user._id}/likedPost/${postId}`
      );
      if (response.status === 200) {
        await dispatch(postAction.likePost({ postId: postId, userId: user._id }));
        setCount(true)
      } else {
        console.log("Failed to Like");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dislikeHandler = async (postId) => {
    try {
      const response = await axios.post(
        `https://tell-us-backend.herokuapp.com/userActions/${user._id}/dislikedPost/${postId}`
      );
      if (response.status === 200) {
        await dispatch(
          postAction.dislikePost({ postId: postId, userId: user._id }))
          setCount(true)
      } else {
        console.log("Failed to Dislike");
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const [open, setOpen] = useState(false);
  const modalOpenHandler = () => setOpen(true);
  const modalCloseHandler = () => setOpen(false);

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3}>
          {posts?.post?.map((post, i) => {
            return (
              <Card
                sx={{
                  boxShadow: 5,
                  border: "solid 3px #f5c71a",
                  borderRadius: "0.75rem",
                  bgcolor: "#f5c71a",
                  mb: "1rem",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={user.avatar} />}
                  action={
                    <IconButton>
                      <Delete onClick={modalOpenHandler} />
                      <DeleteModal
                        closeHandler={modalCloseHandler}
                        open={open}
                        setOpen={setOpen}
                        postId= {post._id}
                        setCount={setCount}
                      />
                    </IconButton>
                  }
                  title={user.name}
                />
                {post.postImage ? (
                  <CardMedia
                    component="img"
                    height="100%"
                    image={post.postImage}
                    alt=""
                  />
                ) : (
                  <div></div>
                )}
                <Typography p="0.5rem 1rem" component="div" variant="subtitle2">
                  {post.postText}
                </Typography>
                <CardActions disableSpacing>
                  <IconButton aria-label="like">
                    <Favorite
                      onClick={() => likeHandler(post._id)}
                    />
                    <Typography>{post.like.length}</Typography>
                  </IconButton>
                  <IconButton
                    aria-label="dislike"
                    onClick={() => dislikeHandler(post._id)}
                  >
                    <ThumbDown />
                    <Typography>{post.dislike.length}</Typography>
                  </IconButton>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${post._id}/comments`}
                  >
                    <IconButton aria-label="Comment">
                      <Comment />
                      <Typography>{post.comments.length}</Typography>
                    </IconButton>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default Posts;
