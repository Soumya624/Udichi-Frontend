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
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import {
  AccessTimeOutlined,
  CampaignOutlined,
  HelpOutlineOutlined,
  HomeOutlined,
  InsertChartOutlined,
  PersonOutlineOutlined,
  SummarizeRounded,
  TuneOutlined,
} from "@mui/icons-material";
import Clock from "react-live-clock";

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
  const [candidatenum, setCandidatenum] = useState(0);
  const [questionnum, setQuestionnum] = useState(0);
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
        setError("Error occurred. Please try again!");
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
        setError("Error occurred. Please try again!");
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
        setError("Error occurred. Please try again!");
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
          var size = res.data.length;
          var count1 = 0;
          for (var i = 0; i < size; i++) {
            count1 = count1 + res.data[i].candidates.length;
          }
          console.log(count1);
          setCandidatenum(count1);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred. Please try again!");
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
          var size = res.data.length;
          var count2 = 0;
          for (var i = 0; i < size; i++) {
            count2 = count2 + res.data[i].questions.length;
          }
          console.log(count2);
          setQuestionnum(count2);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred. Please try again!");
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

  const items1 = [
    <SidebarItem></SidebarItem>,
    <SidebarItem></SidebarItem>,
    <SidebarItem></SidebarItem>,
    <SidebarItem>
      <div
        style={{
          alignItems: "center",
          fontWeight: "normal",
        }}
      >
        <b style={{ fontSize: "12px", fontWeight: "normal" }}>March, 2024</b>
        <br />
        <Clock
          format={"h:mm:ss A"}
          ticking={true}
          timezone={"ASIA"}
          style={{ fontSize: "semibold" }}
        />
      </div>
    </SidebarItem>,
    <SidebarItem href="/dashboardAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <HomeOutlined />
        &nbsp; Dashboard
      </div>
    </SidebarItem>,
    <SidebarItem href="/examAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <AccessTimeOutlined />
        &nbsp; Exams
      </div>
    </SidebarItem>,
    <SidebarItem href="/candidateAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <PersonOutlineOutlined />
        &nbsp; Candidates
      </div>
    </SidebarItem>,
    <SidebarItem href="/questionAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <SummarizeRounded />
        &nbsp; Questions
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <InsertChartOutlined />
        &nbsp; Statistics
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <CampaignOutlined />
        &nbsp; Notifications
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <TuneOutlined />
        &nbsp; Settings
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <HelpOutlineOutlined />
        &nbsp; Help & Support
      </div>
    </SidebarItem>,
  ];

  return (
    <div>
      <Sidebar content={items1} background="#193441">
        <Navbar />
        <div style={{ padding: "3%" }}>
          <br />
          <br />
          <br />
          <h4
            style={{ textAlign: "left", fontSize: "22px", lineHeight: "1px" }}
          >
            Dashboard
          </h4>
          <p style={{ lineHeight: "1px" }}>Welcome to Udichi </p>
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
                      progress={`${testlist.length}` + " " + "Exams"}
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                      progress={"0" + " " + "Notifications"}
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                      progress={`${candidategrouplist.length}` + " " + "Groups"}
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                      progress={`${candidatenum}` + " " + "Candidates"}
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                        `${questiongrouplist.length}` + " " + "Sections"
                      }
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                      progress={`${questionnum}` + " " + "Questions"}
                      progressColor="#27a5f9"
                      bgColor="#27a5f9"
                      textColor="#27a5f9"
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
                justifyContent: "center",
              }}
            >
              <Grid item sm={8}>
                <Card
                  style={{
                    alignItems: "center",
                  }}
                >
                  <div style={{ padding: "1.5%", backgroundColor: "#e5e5e5" }}>
                    <b>Exams Taken</b>
                  </div>
                  <br />
                  <div style={{ padding: "2%" }}>
                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="100%"
                      data={data}
                      options={options}
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                  <br />
                </Card>
              </Grid>

              <Grid item sm={4}>
                <Grid
                  container
                  spacing={0}
                  style={{ color: "white", padding: "0%" }}
                >
                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      {testlist.length}
                      <br />
                      Exams
                    </Card>
                  </Grid>

                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      0
                      <br />
                      Notifications
                    </Card>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={0}
                  style={{ color: "white", padding: "0%" }}
                >
                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      {candidategrouplist.length}
                      <br />
                      Groups
                    </Card>
                  </Grid>

                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      {candidatenum}
                      <br />
                      Candidates
                    </Card>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={0}
                  style={{ color: "white", padding: "0%" }}
                >
                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      {questiongrouplist.length}
                      <br />
                      Sections
                    </Card>
                  </Grid>

                  <Grid item xs={6} style={{ padding: "2%" }}>
                    <Card
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15% 10%",
                        margin: "0%",
                        textAlign: "left",
                        borderLeft: "3px solid #27a5f9",
                      }}
                    >
                      {questionnum}
                      <br />
                      Questions
                    </Card>
                  </Grid>
                  <Grid item xs={6} style={{ padding: "2%" }}></Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
        <br />
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
      </Sidebar>
    </div>
  );
}
