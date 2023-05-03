import { ArrowForwardIos, Favorite, ThumbDown } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postAction } from "../../Store/PostSlice";
import Rightbar from "../Rightbar";
import Sidebar from "../Sidebar";
import Comments from "./Comments";

const PostComment = () => {
  const { postId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.posts);
  const dispatch = useDispatch();


  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `https://tell-us-backend.onrender.com/userActions/${postId}/comments`
      );
      if (response.data.success === true)
        dispatch(postAction.Comment(response.data.getPost));
    };
    getComments();
  }, []);

  const selectedPost = post.filter((post) => post._id === postId);

  const [createComment, setCreateComment] = useState('')

  const commentHandler = async (userId,postId) => {
    try{
        const response = await axios.post(`https://tell-us-backend.onrender.com/userActions/addComment/${postId}/userId/${userId}`,{
          commentText:createComment
        })
        console.log(response)
    }catch(error){
      console.log(error)
    }
  }


  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3}>
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
              title={user.name}
            />
            {selectedPost[0].postImage ? (
              <CardMedia
                component="img"
                height="100%"
                image={selectedPost[0].postImage}
                alt=""
              />
            ) : (
              <div></div>
            )}
            <Typography p="0.5rem 1rem" component="div" variant="subtitle2">
              {selectedPost[0].postText}
            </Typography>
            <CardActions disableSpacing>
              <IconButton aria-label="like">
                <Favorite
                //  onClick={likeHandler}
                />
                <Typography>{selectedPost[0].like.length}</Typography>
              </IconButton>
              <IconButton
                aria-label="dislike"
                //  onClick={dislikeHandler}
              >
                <ThumbDown />
                <Typography>{selectedPost[0].dislike.length}</Typography>
              </IconButton>
              {/* <IconButton aria-label="Comment">
                <Comment />
                <Typography>{selectedPost[0].comments.length}</Typography>
              </IconButton> */}
            </CardActions>
            {selectedPost[0].comments.map((comment) => (
              <Comments comment={comment} />
            ))}
            <Box
              p="0.5rem"
              m="1.5rem 1.5rem"
              borderRadius="2rem"
              bgcolor="white"
            >
              <Stack direction="row" justifyContent="space-between">
                <InputBase
                  placeholder="Enter Comment Here"
                  fullWidth="true"
                  multiline="true"
                  maxRows="4"
                  onChange={(e) => {
                    setCreateComment(e.target.value);
                  }}
                  value={createComment}
                />
                <IconButton>
                  <ArrowForwardIos
                    onClick={() => commentHandler(user._id, postId)}
                  />
                </IconButton>
              </Stack>
            </Box>
          </Card>
        </Box>
        <Rightbar />
      </Stack>
    </Box>
  );
};

export default PostComment;
