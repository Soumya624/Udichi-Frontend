import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import deleteAllCookies from "../deleteAllCookies";
import Logo from "../Assets/Logo.png";
import Logo_PC from "../Assets/Logo_PC.png";

const drawerWidth = 240;
const navItems = [
  "Dashboard",
  "Exams",
  "Candidates",
  "Questions",
  "Statistics",
  "Notification",
  "Logout",
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={Logo} />
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/dashboardAdmin">
                Dashboard
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/examAdmin">
                Exams
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/questionAdmin">
                Questions
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/candidateAdmin">
                Candidates
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/assessorAdmin">
                Assessors
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button sx={{ color: "#000" }} href="/proctorerAdmin">
                Proctorers
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText>
              <Button
                sx={{ color: "#000" }}
                onClick={() => {
                  deleteAllCookies();
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ backgroundColor: "#296d98" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={Logo_PC} style={{ width: "5%", marginTop: "5px" }} />
              <a
                href="/dashboardAdmin"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Udichi
              </a>
            </div>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
            <Button sx={{ color: "#fff" }} href="/dashboardAdmin">
              Dashboard
            </Button>
            <Button sx={{ color: "#fff" }} href="/examAdmin">
              Exams
            </Button>
            <Button sx={{ color: "#fff" }} href="/questionAdmin">
              Questions
            </Button>
            <Button sx={{ color: "#fff" }} href="/candidateAdmin">
              Candidates
            </Button>
            <Button sx={{ color: "#fff" }} href="/assessorAdmin">
              Assessors
            </Button>
            <Button sx={{ color: "#fff" }} href="/proctorerAdmin">
              Proctorers
            </Button>
            {/* <Button sx={{ color: "#fff" }} href="/statisticsAdmin">
              Statistics
            </Button>
            <Button sx={{ color: "#fff" }} href="/dashboardAdmin">
              Notifications
            </Button> */}
            <Button
              sx={{ color: "#fff" }}
              onClick={() => {
                deleteAllCookies();
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
