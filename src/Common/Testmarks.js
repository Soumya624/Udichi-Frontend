import React, { useRef, useEffect } from "react";
import Navbar from "./Navbar_Admin";
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
import Footer from "./Footer";
import Fab from "@mui/material/Fab";
import { useScreenshot } from "use-screenshot-hook";
import { useReactMediaRecorder } from "react-media-recorder";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Box, FormLabel, Modal } from "@mui/material";
import axiosInstance from "../axiosInstance";
import getCookie from "../getCookie";
import { duration } from "moment/moment";
import Countdown from "react-countdown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Confirmpresence({}) {
  const [questionarray, setQuestionarray] = useState([]);
  const [totalmarks, setTotalmarks] = useState([]);
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  useEffect(
    () => {
      setQuestionarray(JSON.parse(localStorage.getItem("question_submitted")));
      setTotalmarks(JSON.parse(localStorage.getItem("total_marks_obtained")));
    },
    questionarray,
    totalmarks
  );

  console.log(questionarray, totalmarks);

  useEffect(() => {
    questionarray.map((altst) => {
      axiosInstance
        .patch(`/questions/${altst}`, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });

  return (
    <div>
      {/* <Navbar /> */}
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
                  <p>
                    {!true
                      ? "Fill in The Blacks Question"
                      : "Multiple Correct Questions"}
                  </p>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                  <p>+2 For Correct/- 2 For Wrong</p>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ padding: "1%" }}>
                <Grid item sm={9}>
                  <h4 style={{ textAlign: "center" }}>Question</h4>
                  <p style={{ textAlign: "justify" }}>Title</p>
                  {!true ? (
                    <div>
                      <>
                        <Checkbox />
                        <FormLabel>Title 1</FormLabel>
                      </>
                    </div>
                  ) : (
                    <TextField
                      id="standard-basic"
                      label="Write Your Answer"
                      variant="standard"
                      style={{ width: "100%" }}
                    />
                  )}
                  <br />
                  <br />
                  <br />
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    label="Obtained Marks"
                    style={{ width: "30%" }}
                  />
                  {/* <Grid
                    container
                    spacing={1}
                    style={{ padding: "1%", display: "flex" }}
                  >
                    <Grid item sm={3}></Grid>
                    <Grid item sm={3}>
                      Obtained Marks
                    </Grid>
                    <Grid item sm={3}>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        style={{ width: "30%" }}
                      />
                    </Grid>
                    <Grid item sm={3}></Grid>
                  </Grid> */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Grid container spacing={1} style={{ padding: "1%" }}>
                    <Grid item sm={6}>
                      <Button
                        style={{
                          backgroundColor: "#70ff00",
                          color: "black",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          // border: "1px solid black",
                        }}
                      >
                        Save & Next
                      </Button>
                    </Grid>

                    <Grid item sm={6}>
                      <Button
                        style={{
                          backgroundColor: "rgb(120 130 189)",
                          color: "white",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          // border: "1px solid black",
                        }}
                        target="_blank"
                      >
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={3}>
                  <Grid container spacing={1} style={{ padding: "1%" }}>
                    <Grid item xs={4}>
                      <Fab
                        title="1"
                        size="small"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "1px solid black",
                          boxShadow: "none",
                          margin: "5px",
                        }}
                      >
                        1
                      </Fab>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </center>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
