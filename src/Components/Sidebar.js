import {
  Home,
  Person,
  Settings,
  CameraRoll,
  PeopleAlt,
  SupervisedUserCircle,
  Search,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      flex={2}
      color="#f5c71a"
      position="static"
    >
      <Box position="fixed">
        <List fontSize="large">
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Home"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Home
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Home"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Profile"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Person
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Profile"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Posts"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CameraRoll
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Posts"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Followers"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PeopleAlt
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Followers"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Followings"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SupervisedUserCircle
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Followings"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding  sx={{
                      display: { xs: "block", sm: "none" },
                      color: "#f5c71a",
                    }}>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Search"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Search
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Search"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <Link style={{ textDecoration: "none" }} to={"/Settings"}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Settings
                    sx={{
                      color: "#f5c71a",
                      margin: "10px",
                      fontSize: { xs: "250%", sm: "200%" },
                    }}
                  />
                  <ListItemText
                    primary="Settings"
                    sx={{
                      display: { xs: "none", sm: "block" },
                      color: "#f5c71a",
                    }}
                  />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
