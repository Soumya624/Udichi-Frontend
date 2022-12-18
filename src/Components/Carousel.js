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
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

function Home(props) {
  return (
    <CarouselProvider
      naturalSlideWidth={50}
      naturalSlideHeight={50}
      totalSlides={3}
    >
      <Slider>
        <Slide index={0}>I am the first Slide.</Slide>
        <Slide index={1}>I am the second Slide.</Slide>
        <Slide index={2}>I am the third Slide.</Slide>
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  );
}

export default Home;
