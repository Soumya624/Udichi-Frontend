import React from "react";
import Navbar from "./../../Common/Navbar_Student";
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
import Footer from "../../Common/Footer";
import Fab from "@mui/material/Fab";

export default function Confirmpresence() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "1%" }}>
        <center>
          <Card
            sx={{ maxWidth: 800 }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5rem",
              padding: "2%",
            }}
          >
            <CardContent>
              <Grid container spacing={1} style={{ padding: "1%" }}>
                <Grid item xs={4} style={{ textAlign: "left" }}>
                  <p>Fill in The Blacks Question</p>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                  <p>01:59:01</p>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <p>+1 For Correct/-2 For Wrong</p>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: "1%" }}>
                <Grid item sm={9}>
                  <h4 style={{ textAlign: "center" }}>Question 01</h4>
                  <p style={{ textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                  <TextField
                    id="standard-basic"
                    label="Write Your Answer"
                    variant="standard"
                    style={{ width: "100%" }}
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Grid container spacing={1} style={{ padding: "1%" }}>
                    <Grid item sm={3}>
                      <Button
                        style={{
                          backgroundColor: "#70ff00",
                          color: "black",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          border: "1px solid black",
                        }}
                      >
                        Save & Next
                      </Button>
                    </Grid>
                    <Grid item sm={3}>
                      <Button
                        style={{
                          backgroundColor: "#7882bd",
                          color: "white",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          border: "1px solid black",
                        }}
                      >
                        Review & Next
                      </Button>
                    </Grid>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={3}>
                      <Button
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          border: "1px solid black",
                        }}
                      >
                        Clear Response
                      </Button>
                    </Grid>
                    <Grid item sm={2}>
                      <Button
                        style={{
                          backgroundColor: "#70ff00",
                          color: "black",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          border: "1px solid black",
                        }}
                        href="/submittestStudent"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={3}>
                  <Grid container spacing={1} style={{ padding: "1%" }}>
                    <Grid item sm={4}>
                      <Fab
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid black",
                          boxShadow: "none",
                        }}
                      >
                        01
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
