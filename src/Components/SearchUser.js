import { Button, Card, CardActions, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const SearchUser = ({ name, username, avatar, id }) => {

  const { user } = useSelector((state) => state.user)
  const followingHandler = async() =>{
    try{
        const response = await axios.post(`https://tell-us-backend.herokuapp.com/user/${user._id}/follow/${id}`)
        if(response){
          console.log("Followed")
        }
        else{
          console.log("Failed to follow")
        }
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <Card
      sx={{
        boxShadow: 5,
        border: "solid 3px #f5c71a",
        borderRadius: "0.75rem",
        mb: "1rem",
      }}
    >
      <CardMedia
        component="img"
        image={avatar}
        alt="/broken-image.jpg"
      />
      <Typography textAlign={"center"} p="0 1rem" component="div" variant="h6">
        {name}
      </Typography>
      <CardActions>
      <Button
            variant="contained"
            sx={{
                backgroundColor: "#f5c71a",
                borderRadius: "3rem",
                color: "black",
                width:"95%",
                ml: "3%",
                p: "0",
              }}
              onClick={followingHandler}
          >
            Follow
          </Button>
      </CardActions>
    </Card>
  );
};

export default SearchUser;
