import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import SearchUser from "../SearchUser";
import Sidebar from "../Sidebar";

const SearchPage = () => {
  const [searchData, setSearchData] = useState([]);
  const getData = async (e) => {
    try {
      const response = await axios.get(
        `https://tell-us-backend.herokuapp.com/userActions/${e.target.value}`
      );
      setSearchData(response.data.response);
    } catch (error) {
      console.log(error.message);
    }
  };

  function debounce(func, d) {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, d);
    };
  }

  const betterFunc = debounce(getData, 1000);

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={10} p={3}>
          <TextField
            id="outlined-basic"
            label="Search people"
            variant="outlined"
            style={{ color: "#f5c71a", width:"100%", }}
            onKeyUp={betterFunc}
            InputProps={{
              startAdornment: (
                <InputAdornment position="center">
                  <IconButton>
                    <Search style={{ color: "#f5c71a" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box m={"3rem"}>
            {searchData?.map((data) => (
              <SearchUser
                name={data.name}
                username={data.username}
                avatar={data.avatar}
                id={data._id}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchPage;
