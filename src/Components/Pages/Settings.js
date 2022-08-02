import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "../Sidebar";

const Settings = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Box flex={8} p={1} pt={3} mt={2}>Coming Soon</Box>
      </Stack>
    </Box>
  );
};

export default Settings;
