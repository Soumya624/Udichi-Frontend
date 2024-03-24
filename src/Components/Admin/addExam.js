import React, { useState, useEffect } from "react";
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
import Navbar from "./../../Common/Navbar_Admin";
import Footer from "../../Common/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import { isDisabled } from "@testing-library/user-event/dist/utils";
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

export default function AddCandidate({ error, setError }) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };
  const [group, setGroup] = useState();
  const [type, setType] = useState("");
  const [flag, setFlag] = useState(true);
  const [title, setTitle] = useState("");
  const [startdate, setStartdate] = useState("");
  const [duration, setDuration] = useState("");
  const [fullmarks, setFullmarks] = useState("");
  const [candigroup, setCandigroup] = useState([]);
  const [quesgroup, setQuesgroup] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [checked, setChecked] = useState(false);
  const [candigrp, setCandigrp] = useState([]);
  const [quesgrp, setQuesgrp] = useState([]);
  const [enableproctoring, setEnableproctoring] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [disablestate1, setDisablestate1] = useState(false);
  const [disablestate2, setDisablestate2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setCandigrp([]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
    setQuesgrp([]);
  };
  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    getCandidates();
  }, []);

  useEffect(() => {
    getQuestions();
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChange1 = (event) => {
    setGroup(event.target.value);
  };

  async function add_exam(e) {
    e.preventDefault();
    let data = {
      title: title,
      type_of_test: type,
      starting_date: startdate,
      total_number: fullmarks,
      available_window: duration,
      candidates_groups: candigrp,
      question_groups: quesgrp,
      proctoring: enableproctoring,
    };
    console.log(data);
    axiosInstance
      .post("/test/", data, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandigrp([]);
          setQuesgrp([]);
          setTitle("");
          setType("");
          setStartdate("");
          setFullmarks("");
          setDuration("");
          window.location = "/examAdmin";
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

  function getCandidates() {
    axiosInstance
      .get("/candidate_group/all/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandigroup(res.data);
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

  function getQuestions() {
    axiosInstance
      .get("/question-group/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setQuesgroup(res.data);
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

  function getResults(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  function submitfunction1() {
    console.log(data1);
    setCandigrp(data1);
    setData1([]);
    handleClose();
  }

  function submitfunction2() {
    console.log(data2);
    setQuesgrp(data2);
    setData2([]);
    handleClose1();
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
        <div style={{ padding: "2%" }}>
          <center>
            <Card
              sx={{ maxWidth: 500 }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5rem",
                padding: "2%",
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ marginBottom: "0", fontWeight: "bold" }}
                >
                  Add Exam
                </Typography>
                <br />

                <Typography variant="body2" color="text.secondary">
                  <br />
                  <p
                    style={{
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                    }}
                  >
                    <b>Enter Exam Information</b>
                  </p>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        value={title}
                        id="outlined-basic"
                        label="Exam Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setTitle(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    style={{ marginTop: "0.5%", display: flag ? "" : "none" }}
                  >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        value={startdate}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        type="datetime-local"
                        onChange={(e) => {
                          e.preventDefault();
                          setStartdate(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={duration}
                        id="outlined-basic"
                        label="Duration"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setDuration(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={fullmarks}
                        id="outlined-basic"
                        label="Full Marks"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setFullmarks(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Exam Type
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Exam Type"
                          onChange={handleChange}
                        >
                          <MenuItem value={"written"}>Written</MenuItem>
                          <MenuItem value={"viva"}>Viva</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <br />
                  <p
                    style={{
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                    }}
                  >
                    <b>Specify Candidate Groups</b>
                  </p>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#193441", width: "100%" }}
                        onClick={handleOpen}
                      >
                        Assign Groups
                      </Button>
                    </Grid>
                  </Grid>
                  <br />
                  <p
                    style={{
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                    }}
                  >
                    <b>Specify Question Sections</b>
                  </p>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#193441", width: "100%" }}
                        onClick={handleOpen1}
                      >
                        Assign Sections
                      </Button>
                    </Grid>
                  </Grid>
                  <br />
                  <p
                    style={{
                      borderBottom: "1px solid grey",
                      textAlign: "left",
                    }}
                  >
                    <b>Additional Informations</b>
                  </p>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="radio"
                        value="true"
                        name="Proctoring"
                        onChange={(e) => {
                          setEnableproctoring(e.target.value);
                        }}
                      />
                      Enable Audio & Video Capturing
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="radio"
                        value="false"
                        name="Proctoring"
                        onChange={(e) => {
                          setEnableproctoring(e.target.value);
                        }}
                      />
                      Disable Audio & Video Capturing
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#193441", width: "50%" }}
                    onClick={add_exam}
                  >
                    Continue
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </center>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              {candigroup.map((key) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    style={{ margin: "1px", alignItems: "center" }}
                  >
                    <Grid item xs={1}>
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        value={key._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            console.log(e.target.value);
                            data1.push(e.target.value);
                            setData1(data1);
                          } else {
                            let random1 = data1.filter((d) => {
                              return d !== key._id;
                            });
                            setData1(random1);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={4} style={{ alignItems: "center" }}>
                      {key.title}
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                );
              })}

              <br />
              <br />
              <center>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#193441", width: "50%" }}
                  onClick={(e) => {
                    submitfunction1();
                  }}
                >
                  Continue
                </Button>
              </center>
            </form>
          </Box>
        </Modal>
        <Modal
          open={open1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormGroup>
              {quesgroup.map((key) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    style={{ margin: "1px", alignItems: "center" }}
                  >
                    <Grid item xs={1}>
                      <input
                        type="checkbox"
                        id={key}
                        name={key}
                        value={key._id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            console.log(e.target.value);
                            data2.push(e.target.value);
                            setData2(data2);
                          } else {
                            let random2 = data2.filter((d) => {
                              return d !== key._id;
                            });
                            setData2(random2);
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {key.title}
                    </Grid>
                    <Grid item xs={8}></Grid>
                  </Grid>
                );
              })}
            </FormGroup>
            <br />
            <br />
            <center>
              <Button
                variant="contained"
                style={{ backgroundColor: "#193441", width: "50%" }}
                onClick={(e) => {
                  submitfunction2();
                }}
              >
                Continue
              </Button>
            </center>
          </Box>
        </Modal>
      </Sidebar>
    </div>
  );
}
