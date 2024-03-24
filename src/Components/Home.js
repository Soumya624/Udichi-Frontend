import React from "react";
import Navbar from "./../Common/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Footer from "./../Common/Footer";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import setCookie from "../setCookie";
import { CircularProgress, List } from "@mui/material";
import Translator from "react-auto-translate/lib/commonjs/translator";
import { Translate } from "@mui/icons-material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Home_Imgae from "./../Assets/Home.png";
import { ProctorApp, getStatistics } from "react_proctoring_library";

const style = {
  play: {
    button: {
      width: "28",
      height: "28",
      cursor: "pointer",
      pointerEvents: "none",
      outline: "none",
      backgroundColor: "yellow",
      border: "solid 1px rgba(255,255,255,1)",
      borderRadius: 6,
    },
  },
};

function Test(props) {
  return (
    <div>
      <h1>Proctoring Window</h1>
    </div>
  );
}

function Home(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 4,
    },
  };

  const testIdentifier = "unique-proctoring-identifier";
  const fullScreenMessage =
    "This test can only be completed in Full Screen Mode, do you want to start this test?";
  const getStats = (e) => {
    e.preventDefault();
    console.log(getStatistics(testIdentifier));
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2%" }}>
        <center>
          <br />
          <br />
          <br />
          <Grid
            container
            spacing={3}
            style={{
              color: "white",
              paddingBottom: "1%",
              alignItems: "center",
            }}
          >
            <Grid item sm={6}>
              <h1 style={{ color: "#193441", fontWeight: "normal" }}>
                Welcome to The Exam Portal
              </h1>
              <br />
              <br />
              <div
                style={{ color: "black", padding: "0 12%", fontSize: "15px" }}
              >
                "I recently took an exam through this portal and I was really
                impressed with the user experience. The portal was easy to
                navigate and the customization options allowed me to tailor the
                exam to my needs. The scheduling feature was also really
                helpful, as it allowed me to plan my exam around my other
                commitments. Overall, I would highly recommend this portal to
                anyone looking to take an online exam"
                <br />
                <p style={{ color: "#193441", fontSize: "20px" }}>
                  - Testimonial By a Student
                </p>
              </div>
            </Grid>
            <Grid item sm={6}>
              <img src={Home_Imgae} style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </center>
      </div>
    </div>
  );
}

export default Home;
