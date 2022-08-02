import React, { useState } from "react";
import { EmojiEmotions, GifBox, Image, Pageview } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
} from "@mui/material";
import { postAction } from "../../Store/PostSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreatePost = () => {

  const userInfo = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState({
    postText: "",
    postImage: "",
  });
  const [file, setFile] = useState();

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCreatePost({ ...createPost, postImage: reader.result });
    };
  };

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("postText", createPost.postText);
      form.append("photo", file);
      const response = await axios({
        method: "post",
        url: `https://tell-us-backend.herokuapp.com/userActions/${userInfo.user._id}/upload`,
        data: form,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      if (response) {
        dispatch(postAction.addPost(response.data.savedPost));
        setCreatePost({ postText: "", postImage: "" });
        toast.success("Uploaded")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box style={{ borderBottom: "solid 1px #f5c71a", padding: "10px" }}>
      <Box position="sticky">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          margin="10px"
        >
          <Avatar src={userInfo.user.avatar} />
          <InputBase
            placeholder="Tell Us Something!"
            fullWidth="true"
            multiline="true"
            maxRows="4"
            onChange={(e) => {
              setCreatePost({ ...createPost, postText: e.target.value });
            }}
            value={createPost.postText}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          margin="10px"
        >
          <Stack direction="row">
            <input
              id="fileButton"
              multiple
              type="file"
              hidden
              onChange={(e) => {
                setFile(e.target.files[0]);
                previewImage(e.target.files[0]);
              }}
            />
            <label htmlFor="fileButton">
              <IconButton variant="contained" component="span">
                <Image style={{ color: "#f5c71a" }} />
              </IconButton>
            </label>
            <IconButton>
              <EmojiEmotions style={{ color: "#f5c71a" }} />
            </IconButton>
            <IconButton>
              <GifBox style={{ color: "#f5c71a" }} />
            </IconButton>
            <Avatar
              src={createPost.postImage}
              sx={{ marginLeft: "1rem", bgcolor: "#f5c71a" }}
            >
              <Pageview />
            </Avatar>
          </Stack>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f5c71a",
              borderRadius: "2rem",
              color: "black",
              p:"0 2rem"
            }}
            onClick={(e) => onClickHandler(e)}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePost;
