import { Delete } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "../../Store/PostSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#f5c71a",
  border: "1px solid black",
  borderRadius: "10px",
  boxShadow: 24,
};

const DeleteModal = ({closeHandler,open,setOpen,postId,setCount}) => {

  const {user} = useSelector((state)=> state.user)
  const dispatch = useDispatch()

  const deletePostHandler = async () => {
    setOpen(false);
    try {
      const response = await axios.post(
        `https://tell-us-backend.onrender.com/userActions/${user._id}/removePost/${postId}`
      );
      if (response.data.success === true){
        dispatch(postAction.deletePost(postId));
        setCount(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} width="400" p="1rem">
        <Typography id="modal-modal-title">
          Are you sure you want to delete this post ?
        </Typography>
        <Button
          onClick={deletePostHandler}
          sx={{ margin: "1rem 1rem 0 0", color: "black" }}
          endIcon={<Delete />}
        >
          Delete
        </Button>
        <Button
          sx={{ margin: "1rem 1rem 0 0", color: "black" }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
