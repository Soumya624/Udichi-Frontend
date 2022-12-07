import React from "react";
import Navbar from "./../../Common/Navbar_Admin";
import { Chart } from "react-google-charts";
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
import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import { useState } from "react";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// export const data = [
//   ["Month", "Exams"],
//   ["January", 3000],
//   ["May", 1370],
//   ["September", 570],
// ];

export const options = {
  curveType: "function",
  legend: { position: "bottom" },
};

export default function Index({ error, setError }) {
  const [assessorlist, setAssessorlist] = useState([]);
  const [proctorerlist, setProctorerlist] = useState([]);
  const [testlist, setTestlist] = useState([]);
  const [candidategrouplist, setCandidateGrouplist] = useState([]);
  const [questiongrouplist, setQuestionGrouplist] = useState([]);
  let dateobj = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
  };
  const [data, setData] = useState([
    ["Month", "Exams"],
    ["Jan", dateobj[1]],
    ["Feb", dateobj[2]],
    ["Mar", dateobj[3]],
    ["Apri", dateobj[4]],
    ["May", dateobj[5]],
    ["Jun", dateobj[6]],
    ["Jul", dateobj[7]],
    ["Aug", dateobj[8]],
    ["Sep", dateobj[9]],
    ["Oct", dateobj[10]],
    ["Nov", dateobj[11]],
    ["Dec", dateobj[12]],
  ]);
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  useEffect(() => {
    getAssessors();
    getProctorers();
    getTests();
    getCandidategroup();
    getQuestiongroup();
  }, []);

  useEffect(()=>{
    chart_preparation()
  },[testlist])

  function getAssessors() {
    axiosInstance
      .get("/assessor/all", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setAssessorlist(res.data);
          console.log(assessorlist);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }
  function getProctorers() {
    axiosInstance
      .get("/proctorer/all", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setProctorerlist(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }
  function getTests() {
    axiosInstance
      .get("/test/all", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setTestlist(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }
  function getCandidategroup() {
    axiosInstance
      .get("/candidate_group/all", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandidateGrouplist(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }
  function getQuestiongroup() {
    axiosInstance
      .get("/question-group/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setQuestionGrouplist(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }

  function chart_preparation() {
    let dateobj = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    };
    for (var i = 0; i < testlist.length; i++) {
      let momentDate = moment.utc(testlist[i].starting_date).format("M");
      dateobj[momentDate]++;
    }
    console.log(dateobj);
    // data[1][1] = dateobj[1];
    // data[2][1] = dateobj[2];
    // data[3][1] = dateobj[3];
    // data[4][1] = dateobj[4];
    // data[5][1] = dateobj[5];
    // data[6][1] = dateobj[6];
    // data[7][1] = dateobj[7];
    // data[8][1] = dateobj[8];
    // data[9][1] = dateobj[9];
    // data[10][1] = dateobj[10];
    // data[11][1] = dateobj[11];
    // data[12][1] = dateobj[12];
    let data1=[
      ["Month", "Exams"],
      ["Jan", dateobj[1]],
      ["Feb", dateobj[2]],
      ["Mar", dateobj[3]],
      ["Apr", dateobj[4]],
      ["May", dateobj[5]],
      ["Jun", dateobj[6]],
      ["Jul", dateobj[7]],
      ["Aug", dateobj[8]],
      ["Sep", dateobj[9]],
      ["Oct", dateobj[10]],
      ["Nov", dateobj[11]],
      ["Dec", dateobj[12]],
    ]
    console.log(data1);
    setData(data1);
  }

  // console.log(data[1][1]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "3%" }}>
        <br />
        <br />
        <br />
        <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Welcome User!
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
          <Grid item sm={6}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="80%"
              data={data}
              options={options}
            />
            {/* <center>
              <Button onClick={chart_preparation}>Update Chart</Button>
            </center> */}
          </Grid>
          <Grid item sm={6}>
            <Grid
              container
              spacing={2}
              style={{ color: "white", padding: "5%" }}
            >
              <Grid item xs={4} style={{ padding: "2%" }}>
                <Circle
                  animate={true}
                  animationDuration="1s"
                  responsive={true}
                  size={50}
                  lineWidth={14}
                  progress={`${testlist.length}` + " " + "Exam"}
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
              <Grid item xs={4} style={{ padding: "2%" }}>
                <Circle
                  animate={true}
                  animationDuration="1s"
                  responsive={true}
                  size={50}
                  lineWidth={14}
                  progress={
                    `${questiongrouplist.length}` + " " + "Question Group"
                  }
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
              <Grid item xs={4} style={{ padding: "2%" }}>
                <Circle
                  animate={true}
                  animationDuration="1s"
                  responsive={true}
                  size={50}
                  lineWidth={14}
                  progress={
                    `${candidategrouplist.length}` + " " + "Candidate Group"
                  }
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
              <Grid item xs={4} style={{ padding: "2%" }}>
                <Circle
                  animate={true}
                  animationDuration="1s"
                  responsive={true}
                  size={50}
                  lineWidth={14}
                  progress={`${assessorlist.length}` + " " + "Assessor"}
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
              <Grid item xs={4} style={{ padding: "2%" }}>
                <Circle
                  animate={true}
                  animationDuration="1s"
                  responsive={true}
                  size={50}
                  lineWidth={14}
                  progress={`${proctorerlist.length}` + " " + "Proctorer"}
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
          </Grid>
        </Grid>

        <br />
        <br />
        {/* <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Important Tasks
        </h4> */}
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
