import React from "react";
import Navbar from "./../../Common/Navbar_Admin";
import Chart from "./../../Common/Chart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Index() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "5%" }}>
        <br />
        <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Welcome!
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Want to View{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Your Account?
          </a>
        </p>
        <br />
        <br />
        <br />
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Box gridColumn="span 12">
            <Item style={{ padding: "1.5%", borderLeft: "2rem solid #7882bd" }}>
              <h3 style={{ textAlign: "left" }}>Exam Title</h3>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={1}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Box gridColumn="span 3" style={{ textAlign: "left" }}>
                  4 Hours
                </Box>
                <Box gridColumn="span 3">June'21 to July'21</Box>
                <Box gridColumn="span 3" style={{ color: "red" }}>
                  View Results
                </Box>
                <Box
                  gridColumn="span 3"
                  style={{ textAlign: "right", color: "#7882bd" }}
                >
                  Confirm Presence
                </Box>
              </Box>
            </Item>
          </Box>
          <Box gridColumn="span 12">
            <Item style={{ padding: "1.5%", borderLeft: "2rem solid #ffb2b2" }}>
              <h3 style={{ textAlign: "left" }}>Exam Title</h3>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={1}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Box gridColumn="span 3" style={{ textAlign: "left" }}>
                  4 Hours
                </Box>
                <Box gridColumn="span 3">June'21 to July'21</Box>
                <Box gridColumn="span 3" style={{ color: "red" }}>
                  View Results
                </Box>
                <Box
                  gridColumn="span 3"
                  style={{ textAlign: "right", color: "#7882bd" }}
                >
                  Confirm Presence
                </Box>
              </Box>
            </Item>
          </Box>
        </Box>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
