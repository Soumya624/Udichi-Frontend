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

export default function Footer() {
  return (
    <div style={{ marginTop: "10rem" }}>
      <Grid
        container
        spacing={2}
        style={{
          backgroundColor: "#7882BD",
          color: "white",
          padding: "2%",
          position: "relative",
          bottom: "0",
        }}
      >
        <Grid item sm={9}>
          <h4>Footer Text</h4>
          <p style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur
          </p>
        </Grid>
        <Grid item sm={3}>
          <h4>Footer Subtext</h4>
          <p style={{ textAlign: "justify" }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
