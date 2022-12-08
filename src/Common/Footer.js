import React from "react";
import Navbar from "./../Common/Navbar";
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
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <div style={{ marginTop: "10rem" }}>
      <Grid
        container
        spacing={2}
        style={{
          backgroundColor: "#7882BD",
          color: "white",
          padding: window.innerWidth < 968 ? "5%" : "2%",
          position: "relative",
          bottom: "0",
        }}
      >
        <Grid item sm={9} style={{ padding: "2%" }}>
          <h4>About Us</h4>
          <p style={{ textAlign: "justify" }}>
            Udichi is an Ngo registered under society registration act 1860(1)
            in the year 2010. Udichi is backed by a large number of change maker
            who committed and passionate to do better for Society. We want to
            bring a revolution of change for the society by educating the rare
            sections of the society to make them livable in the society
          </p>
        </Grid>
        <Grid item sm={3} style={{ padding: "2%" }}>
          <h4>Contact Us</h4>
          <div style={{ textAlign: "justify", display: "flex" }}>
            <PhoneIcon />
            &nbsp;9818152403
          </div>
          <div style={{ textAlign: "justify", display: "flex" }}>
            <EmailIcon />
            &nbsp;info@udichi.co.in
          </div>
        </Grid>
        {/* <Grid item sm={12} >
          <center>
            <p style={{borderTop:"1px solid white", paddingTop:"2%"}}>
              © Copyright Udichi | All Rights Reserved
            </p>
          </center>
        </Grid> */}
      </Grid>
    </div>
  );
}
