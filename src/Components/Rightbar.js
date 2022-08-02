import Search from '@mui/icons-material/Search'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import SearchUser from './SearchUser';


const Rightbar = () => {

  const [searchData, setSearchData] = useState([])
  const getData = async(e) => {
    try{
      const response = await axios.get(`https://tell-us-backend.herokuapp.com/userActions/${e.target.value}`)
      setSearchData(response.data.response)
    }catch(error){
      console.log(error.message)
    }
  }

  function debounce(func,d){
    let timer;
    return function(...args){
      if(timer) clearTimeout(timer);
      timer = setTimeout(() =>{
        func.apply(this,args)
      },d)
    }
  }

  const betterFunc = debounce(getData, 1000)

  return (
    <Box flex={3} sx={{ display: { xs:'none', sm:'block'}}}>
      <Box m={"2rem"}>
      <TextField
        id="outlined-basic"
        label="Search people"
        variant="outlined"
        style={{color:'#f5c71a'}}
        onKeyUp={betterFunc}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
          <IconButton>
            <Search style={{color:'#f5c71a'}}/>
          </IconButton>
          </InputAdornment>
          ),
        }}
      />
      </Box>
      <Box m={"3rem"}>
      {searchData?.map((data) => <SearchUser name={data.name} username={data.username} avatar={data.avatar} id={data._id}/>)}
      </Box>
     
    </Box>
)}

export default Rightbar