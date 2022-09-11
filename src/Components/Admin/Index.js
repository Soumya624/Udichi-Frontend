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
import Circle from "react-circle";

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
      <div style={{ padding: "3%" }}>
        <br />
        <br />
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
        {/* {window.innerWidth < 968 ? (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Box gridColumn="span 12">
              <Item>
                <Chart />
              </Item>
            </Box>
            <Box gridColumn="span 12">
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Exams
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>0</b>
                      <br />
                      Notifications
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Groups
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Candidates
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Sections
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Questions
                    </p>
                  </Item>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Box gridColumn="span 8">
              <Item>
                <br />
                <br />
                <Chart />
                <br />
              </Item>
            </Box>
            <Box gridColumn="span 4">
              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Exams
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>0</b>
                      <br />
                      Notifications
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Groups
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Candidates
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Sections
                    </p>
                  </Item>
                </Box>
                <Box gridColumn="span 6">
                  <Item>
                    <p>
                      <b>68</b>
                      <br />
                      Questions
                    </p>
                  </Item>
                </Box>
              </Box>
            </Box>
          </Box>
        )} */}
        <Grid container spacing={2} style={{ color: "white", padding: "5%" }}>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"24 Exams"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"0 Notifications"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"68 Groups"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"54 Candidates"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"21 Sections"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
          <Grid item sm={2} style={{ padding: "2%" }}>
            <Circle
              animate={true}
              animationDuration="1s"
              responsive={true}
              size={50}
              lineWidth={14}
              progress={"89 Questions"}
              progressColor="#7882bd"
              bgColor="whitesmoke"
              textColor="#7882bd"
              textStyle={{
                font: "normal 2rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              roundedStroke={true}
              showPercentage={true}
              showPercentageSymbol={false}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Important Tasks
        </h4>
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
