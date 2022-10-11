import React from "react";
import Navbar from "./../../../Common/Navbar";
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
import Footer from "./../../../Common/Footer";
import { useState } from "react";

export default function Signup() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2%" }}>
        <center>
          <Card
            sx={{ maxWidth: 500 }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5rem",
              padding: "2%",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ marginBottom: "0", fontWeight: "bold" }}
              >
                Login Here
              </Typography>
              <p style={{ marginTop: "0" }}>
                Please Fill The Requirements Below to
                <br />
                Get Connected
              </p>
              <br />
              <Typography variant="body2" color="text.secondary">
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <center>
                      <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        size="small"
                        style={{ width: "98.5%" }}
                        onChange={(e)=>{
                          e.preventDefault();
                          setUsername(e.target.value);
                        }}
                      />
                    </center>
                  </Grid>
                </Grid>

                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <center>
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        size="small"
                        style={{ width: "98.5%" }}
                        onChange={(e)=>{
                          e.preventDefault();
                          setPassword(e.target.value);
                        }}
                      />
                    </center>
                  </Grid>
                </Grid>
                <br />
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  href='/dashboardProctorer'
                >
                  Continue
                </Button>
                <br />
                <p style={{ marginTop: "1%" }}>
                  Don't Have an Account?{" "}
                  <a href="/" style={{ textDecoration: "none" }}>
                    Click Here
                  </a>
                </p>
              </Typography>
            </CardContent>
            {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
          </Card>
        </center>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
