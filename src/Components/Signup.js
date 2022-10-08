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
import Footer from "./../Common/Footer";
import { useState } from "react";

export default function Signup() {
  const [fname, setFname]=useState("");
  
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
                Signup Here
              </Typography>
              <p style={{ marginTop: "0" }}>
                Please Fill The Requirements Below to
                <br />
                Get Connected
              </p>
              <br />
              <Typography variant="body2" color="text.secondary">
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Father's Name"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Aadhar Number"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      size="small"
                    />
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
                      />
                    </center>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Mobile Number"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Telephone"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Street"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="State"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Country"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <center>
                      <TextField
                        id="outlined-basic"
                        label="Zip Code"
                        variant="outlined"
                        size="small"
                        style={{ width: "98.5%" }}
                      />
                    </center>
                  </Grid>
                </Grid>
                <br />
                <FormControlLabel control={<Checkbox />} label="Admin" />
                <FormControlLabel control={<Checkbox />} label="Assessor" />
                <FormControlLabel control={<Checkbox />} label="Student" />
                <FormControlLabel control={<Checkbox />} label="Proctorer" />
                <br />
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                >
                  Continue
                </Button>
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
