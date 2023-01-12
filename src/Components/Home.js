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
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";

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
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 4, // optional, default to 1.
    },
  };

  // var _a = useFaceDetection({
  //     faceDetectionOptions: {
  //       model: "short",
  //     },
  //     faceDetection: new FaceDetection.FaceDetection({
  //       locateFile: function (file) {
  //         return "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/".concat(
  //           file
  //         );
  //       },
  //     }),
  //     camera: function (_a) {
  //       var mediaSrc = _a.mediaSrc,
  //         onFrame = _a.onFrame,
  //         width = _a.width,
  //         height = _a.height;
  //       return new Camera(mediaSrc, {
  //         onFrame: onFrame,
  //         width: width,
  //         height: height,
  //       });
  //     },
  //   }),
  //   webcamRef = _a.webcamRef,
  //   boundingBox = _a.boundingBox,
  //   isLoading = _a.isLoading,
  //   detected = _a.detected,
  //   facesDetected = _a.facesDetected;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "2%" }}>
        {/* <p>{`Loading: ${isLoading}`}</p>
        <p>{`Face Detected: ${detected}`}</p>
        <p>{`Number of faces detected: ${facesDetected}`}</p>
        <div style={{ width: "100%", height: "500px", position: "relative" }}>
          {boundingBox.map((box, index) => (
            <div
              key={`${index + 1}`}
              style={{
                border: "4px solid red",
                position: "absolute",
                top: `${box.yCenter * 100}%`,
                left: `${box.xCenter * 100}%`,
                width: `${box.width * 100}%`,
                height: `${box.height * 100}%`,
                zIndex: 1,
              }}
            />
          ))}
          <Webcam
            ref={webcamRef}
            forceScreenshotSourceSize
            style={{
              height: "100%",
              width: "100%",
              // objectFit: 'cover',
              position: "absolute",
            }}
          />
        </div> */}
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
              <h1 style={{ color: "#07a8a0", fontWeight: "normal" }}>
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
                <p style={{ color: "#07a8a0", fontSize: "20px" }}>
                  - Testimonial By a Student
                </p>
              </div>
              {/* <div
                style={{ color: "black", padding: "0 12%", fontSize: "15px" }}
              >
                "I have used this exam portal several times now and I am always
                impressed with the level of security and professionalism. The
                proctor was able to monitor me during the exam to ensure that I
                wasn't cheating and the authentication process was thorough and
                secure. The portal itself was easy to use and navigate and the
                scheduling feature allowed me to find a convenient time to take
                the exam. Overall, I have had a great experience using this
                portal and would definitely recommend it to other students"
                <br />
                <p style={{ color: "#07a8a0", fontSize: "20px" }}>
                  - Testimonial By a Student
                </p>
              </div> */}
            </Grid>
            <Grid item sm={6}>
              <img src={Home_Imgae} style={{ width: "100%" }} />
            </Grid>
          </Grid>
        </center>
      </div>
      {/* <ProctorApp TestComponent={Test} testIdentifier={testIdentifier} fullScreenMessage={fullScreenMessage} />
      <button  onClick={getStats}>Get Statistics</button> */}

      <Footer />
    </div>
  );
}

export default Home;
