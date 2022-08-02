import { Box } from '@mui/material';
import React from 'react'
import CreatePost from './Posts/CreatePost';

const Feeds = () => {


  return (
    <Box flex={8} p={1}>
       <CreatePost/>
    </Box>
  )
}

export default Feeds