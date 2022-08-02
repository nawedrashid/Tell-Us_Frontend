import { Comment, Favorite, ThumbDown } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FeedPosts = () => {
  const { user } = useSelector((state) => state.user);
  const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get(
        `https://tell-us-backend.herokuapp.com/user/${user._id}/followingposts`
      );
      if (response.data) await setFeedPosts(response.data.allPosts);
    };
    getPosts();
  }, []);
  return (
    <>
      {feedPosts?.length > 0 ? (
        <Box flex={8} p={1} pt={3}>
          {feedPosts?.map((post, i) => {
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
                  avatar={<Avatar src={post.author.avatar} />}
                  title={post.author.name}
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
                    //   onClick={() => likeHandler(post._id, userInfo.user._id)}
                    />
                    <Typography>{post.like.length}</Typography>
                  </IconButton>
                  <IconButton
                    aria-label="dislike"
                    // onClick={() => dislikeHandler(post._id, userInfo.user._id)}
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
      ) : (
        <Box flex={8} p={1} pt={3}>
          <Typography sx={{color:"#f5c71a"}} variant="h6">Follow People to see their Posts.....</Typography></Box>
      )}
    </>
  );
};

export default FeedPosts;
