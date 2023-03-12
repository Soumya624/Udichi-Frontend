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
import {
  Person2Outlined,
  Person3Outlined,
  Person4Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Logout"];

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
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Button
                  key={item}
                  sx={{ color: "black" }}
                  onClick={() => {
                    deleteAllCookies();
                    window.location.href = "/";
                  }}
                >
                  {item}
                </Button>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [open, setOpen] = React.useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ backgroundColor: "#3e606f" }}>
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
              {/* <img src={Logo_PC} style={{ width: "5%", marginTop: "5px" }} /> */}
              <a
                href="/dashboardAssessor"
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
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => {
                  deleteAllCookies();
                  window.location.href = "/";
                }}
              >
                {item}
              </Button>
            ))} */}
            <Button
              sx={{ color: "#fff" }}
              onClick={onOpenModal}
              endIcon={<SettingsOutlined />}
            >
              Assessor
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
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            alignItems: "flex-start",
            justifyContent: "left",
            marginTop: "70px",
            width: "150px",
            position: "absolute",
            right: "0",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <div>
          <h4>Udichi</h4>
          <p
            style={{
              color: "grey",
              fontSize: "13px",
              margin: "1px",
              padding: "1px",
            }}
          >
            Account ID: Not Specific
          </p>
        </div>
        <br />
        <div style={{ padding: "10px" }}>
          <Link to="#" style={{ textDecoration: "none", color: "black" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <Person2Outlined />
              &nbsp; My Profile
            </div>
          </Link>
          <center>
            <br />
            <br />
            <Button
              sx={{ color: "#fff" }}
              variant="contained"
              color="primary"
              onClick={() => {
                deleteAllCookies();
                window.location.href = "/";
              }}
            >
              Sign Out
            </Button>
          </center>
        </div>
      </Modal>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
