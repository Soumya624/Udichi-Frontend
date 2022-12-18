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
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
  legend: { position: "top" },
  backgroundColor: { fill: "transparent" },
};

export default function Index({ error, setError }) {
  const [assessorlist, setAssessorlist] = useState([]);
  const [proctorerlist, setProctorerlist] = useState([]);
  const [testlist, setTestlist] = useState([]);
  const [candidategrouplist, setCandidateGrouplist] = useState([]);
  const [questiongrouplist, setQuestionGrouplist] = useState([]);
  const [open, setOpen] = useState(false);
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
  console.log(user);

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAssessors();
    getProctorers();
    getTests();
    getCandidategroup();
    getQuestiongroup();
  }, []);

  useEffect(() => {
    chart_preparation();
  }, [testlist]);

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
    let data1 = [
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
    ];
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
          Welcome!
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Check Out{" "}
          <a
            onClick={handleOpen}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "#07a8a0",
            }}
          >
            Your Account
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
        <br />
        <br />
        <br />
        {window.innerWidth < 968 ? (
          <Grid
            container
            spacing={3}
            style={{
              color: "white",
              paddingBottom: "10%",
              alignItems: "center",
            }}
          >
            <Grid item sm={6}>
              <Chart
                chartType="LineChart"
                width="100%"
                height="100%"
                data={data}
                options={options}
                style={{ backgroundColor: "transparent" }}
              />
              <br />
              <center>
                <p
                  style={{
                    color: "black",
                    padding: window.innerWidth < 968 ? "3%" : "2% 15%",
                  }}
                >
                  The chart will be updated if there is an increment or
                  decrement of exams
                </p>
              </center>
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
                    lineWidth={6}
                    progress={`${testlist.length}` + " " + "Exam"}
                    progressColor="#07a8a0"
                    bgColor="#07a8a0"
                    textColor="#07a8a0"
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
                    lineWidth={6}
                    progress={
                      `${questiongrouplist.length}` + " " + "Question Group"
                    }
                    progressColor="#07a8a0"
                    bgColor="#07a8a0"
                    textColor="#07a8a0"
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
                    lineWidth={6}
                    progress={
                      `${candidategrouplist.length}` + " " + "Candidate Group"
                    }
                    progressColor="#07a8a0"
                    bgColor="#07a8a0"
                    textColor="#07a8a0"
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
                    lineWidth={6}
                    progress={`${assessorlist.length}` + " " + "Assessor"}
                    progressColor="#07a8a0"
                    bgColor="#07a8a0"
                    textColor="#07a8a0"
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
                    lineWidth={6}
                    progress={`${proctorerlist.length}` + " " + "Proctorer"}
                    progressColor="#07a8a0"
                    bgColor="#07a8a0"
                    textColor="#07a8a0"
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
        ) : (
          <Grid
            container
            spacing={3}
            style={{
              color: "white",
              paddingBottom: "10%",
              alignItems: "center",
            }}
          >
            <Grid item sm={6}>
              <Card
                style={{
                  alignItems: "center",
                  padding: "2%",
                  borderLeft: "3px solid #07a8a0",
                }}
              >
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="100%"
                  data={data}
                  options={options}
                  style={{ backgroundColor: "transparent" }}
                />
                <br />
                <center>
                  <p
                    style={{
                      color: "black",
                      padding: window.innerWidth < 968 ? "3%" : "2% 15%",
                    }}
                  >
                    The chart will be updated if there is an increment or
                    decrement of exams
                  </p>
                </center>
              </Card>
            </Grid>

            <Grid item sm={6}>
              <Grid
                container
                spacing={0}
                style={{ color: "white", padding: "0%" }}
              >
                <Grid item xs={4} style={{ padding: "2%" }}>
                  <Card
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "29% 10%",
                      margin: "0%",
                      textAlign: "center",
                      borderLeft: "3px solid #07a8a0",
                    }}
                  >
                    {testlist.length}
                    <br />
                    Exams
                  </Card>
                </Grid>

                <Grid item xs={4} style={{ padding: "2%" }}>
                  <Card
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "29% 10%",
                      margin: "0%",
                      textAlign: "center",
                      borderLeft: "3px solid #07a8a0",
                    }}
                  >
                    {questiongrouplist.length}
                    <br />
                    Question Groups
                  </Card>
                </Grid>

                <Grid item xs={4} style={{ padding: "2%" }}>
                  <Card
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "29% 10%",
                      margin: "0%",
                      textAlign: "center",
                      borderLeft: "3px solid #07a8a0",
                    }}
                  >
                    {candidategrouplist.length}
                    <br />
                    Candidate Groups
                  </Card>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                style={{ color: "white", padding: "0%" }}
              >
                <Grid item xs={4} style={{ padding: "2%" }}>
                  <Card
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "29% 10%",
                      margin: "0%",
                      textAlign: "center",
                      borderLeft: "3px solid #07a8a0",
                    }}
                  >
                    {assessorlist.length}
                    <br />
                    Assessors
                  </Card>
                </Grid>

                <Grid item xs={4} style={{ padding: "2%" }}>
                  <Card
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "29% 10%",
                      margin: "0%",
                      textAlign: "center",
                      borderLeft: "3px solid #07a8a0",
                    }}
                  >
                    {proctorerlist.length}
                    <br />
                    Proctorers
                  </Card>
                </Grid>
                <Grid item xs={4} style={{ padding: "2%" }}></Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <br />
      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <img
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?b=1&s=170667a&w=0&k=20&c=Z5bM_O61NdvOVMAV91l_K_xVAsgPxayDrlVxvi19jqE="
              style={{ width: "60%" }}
            />
          </center>
          <p>
            <b>First Name:</b> {user.firstname}
          </p>
          <p>
            <b>Last Name:</b> {user.lastname}
          </p>
          <p>
            <b>Email ID:</b> {user.email}
          </p>
          <p>
            <b>Mobile No:</b> {user.mobile}
          </p>
          <p>
            <b>Username:</b> {user.username}
          </p>
        </Box>
      </Modal>
    </div>
  );
}
