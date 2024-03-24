import React, { useRef, useEffect } from "react";
import Navbar_Admin from "./Navbar_Admin";
import Navbar_Assessor from "./Navbar_Assessor";
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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Confirmpresence({}) {
  const [questionarray, setQuestionarray] = useState([]);
  const [submitted_ans, setSubmittedAns] = useState(null);
  const [marks, setMarks] = useState(0);
  const [totalmarks, setTotalmarks] = useState(0);
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));
  let total_marks_obj = JSON.parse(localStorage.getItem("marks_obj"));
  if (total_marks_obj === null) total_marks_obj = {};

  let navigate = useNavigate();

  const { attempt_id, submission_id } = useParams();

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  useEffect(() => {
    axiosInstance
      .get(`/question_submission/${submission_id}`, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSubmittedAns(res.data);
          setMarks(res.data.marks_obtained);
          total_marks_obj[`${submission_id}`] = res.data.marks_obtained;
          localStorage.setItem("marks_obj", JSON.stringify(total_marks_obj));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(
    () => {
      setQuestionarray(JSON.parse(localStorage.getItem("question_submitted")));
      setTotalmarks(JSON.parse(localStorage.getItem("total_marks_obtained")));
    },
    questionarray,
    totalmarks
  );

  const saveMarks = () => {
    let data = {
      marks_obtained: marks,
    };
    axiosInstance
      .patch(`/question_submission/${submission_id}`, data, config)
      .then((res) => {
        if (res.status === 201) {
          total_marks_obj[`${submission_id}`] = res.data.marks_obtained;
          localStorage.setItem("marks_obj", JSON.stringify(total_marks_obj));
          let total_marks = 0;
          Object.keys(total_marks_obj).map((x) => {
            total_marks += total_marks_obj[x];
          });

          localStorage.setItem(
            "total_marks_obtained",
            JSON.stringify(total_marks)
          );

          let ind = questionarray.indexOf(submission_id);
          let l = questionarray.length;
          console.log(
            `/testMarks/${attempt_id}/${questionarray[(ind + 1) % l]}`
          );
          window.location = `/testMarks/${attempt_id}/${
            questionarray[(ind + 1) % l]
          }`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateTotalMarks = () => {
    let total_marks = JSON.parse(localStorage.getItem("total_marks_obtained"));
    let data = {
      marks_obtained: total_marks,
    };
    axiosInstance
      .patch(`/attempts/${attempt_id}`, data, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.removeItem("marks_obj");
          {
            user.usertype === "admin"
              ? (window.location = "/dashboardAdmin")
              : (window.location = "/dashboardAssessor");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!submitted_ans) return <h1>Loading...</h1>;

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
        <b style={{ fontSize: "12px", fontWeight: "normal" }}>March, 2023</b>
        <br />
        <Clock
          format={"h:mm:ss A"}
          ticking={true}
          timezone={"ASIA"}
          style={{ fontSize: "semibold" }}
        />
      </div>
    </SidebarItem>,
    <SidebarItem href="/dashboardStudent">
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
        {user.usertype === "admin" ? <Navbar_Admin /> : <Navbar_Assessor />}
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
                      {!submitted_ans.question.is_objective
                        ? "Fill in The Blacks Question"
                        : "Multiple Correct Questions"}
                    </p>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4} style={{ textAlign: "right" }}>
                    <p>
                      +{submitted_ans.question.positive_marks} For Correct/-
                      {submitted_ans.question.negative_marks} For Wrong
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ padding: "1%" }}>
                  <Grid item sm={9}>
                    <h4 style={{ textAlign: "center" }}>
                      {submitted_ans.question.title}
                    </h4>
                    {submitted_ans.question.is_objective ? (
                      <div>
                        {submitted_ans.question.options.map((op) => (
                          <>
                            <Checkbox
                              disabled
                              checked={
                                submitted_ans.options_marked.indexOf(op._id) !==
                                -1
                              }
                            />
                            <FormLabel>{op.title}</FormLabel>
                          </>
                        ))}
                      </div>
                    ) : (
                      <TextField
                        id="standard-basic"
                        value={submitted_ans.subjective_answer}
                        disabled
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
                      value={marks}
                      onChange={(e) => {
                        setMarks(e.target.value);
                      }}
                      style={{ width: "30%" }}
                    />
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
                          onClick={saveMarks}
                          style={{
                            backgroundColor: "#70ff00",
                            color: "black",
                            boxShadow: "none",
                            fontSize: "10px",
                            width: "100%",
                          }}
                        >
                          Save & Next
                        </Button>
                      </Grid>

                      <Grid item sm={6}>
                        <Button
                          onClick={UpdateTotalMarks}
                          style={{
                            backgroundColor: "rgb(120 130 189)",
                            color: "white",
                            boxShadow: "none",
                            fontSize: "10px",
                            width: "100%",
                          }}
                          target="_blank"
                        >
                          Close
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} style={{ padding: "1%" }}>
                      <Grid item sm={12}>
                        <center>
                          <b style={{ fontSize: "10px", textAlign: "center" }}>
                            (Please Click "Save & Next" Before "Close")
                          </b>
                        </center>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={3}>
                    <Grid container spacing={1} style={{ padding: "1%" }}>
                      {questionarray.map((ques, ind) => (
                        <Grid item xs={4}>
                          <Fab
                            title={ques}
                            size="small"
                            style={{
                              color: "black",
                              border: "1px solid black",
                              boxShadow: "none",
                              margin: "5px",
                            }}
                          >
                            {ind + 1}
                          </Fab>
                        </Grid>
                      ))}
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
      </Sidebar>
    </div>
  );
}
