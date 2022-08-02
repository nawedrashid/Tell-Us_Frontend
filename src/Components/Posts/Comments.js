import { Favorite, ThumbDown } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Comments = ({comment}) => {
 
  return (
    <Box>
      <Box p="0.5rem" m="0.5rem 1.5rem" borderRadius="2rem" bgcolor="white">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <Avatar 
            src={comment.author.avatar} 
            />
            <Typography pt={0.75} component="div">
              {comment.author.name}:
            </Typography>
            <Typography pt={1} component="div" variant="subtitle2">
              {comment.message}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={-1}>
            <IconButton aria-label="like">
              <Favorite />
            </IconButton>
            <IconButton aria-label="dislike">
              <ThumbDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Comments;
