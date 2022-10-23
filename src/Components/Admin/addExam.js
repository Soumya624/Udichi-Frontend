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

export default function AddCandidate() {
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  // var candigrp = [];
  // var quesgrp = [];

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
    };
    console.log(data);
    axios
      .post("http://localhost:5000/test/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandigrp([]);
          setQuesgrp([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCandidates() {
    axios
      .get("http://localhost:5000/candidate_group/all/")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandigroup(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getQuestions() {
    axios
      .get("http://localhost:5000/question-group/")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setQuesgroup(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getResults(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <div>
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
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Enter Exam Information</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Exam Name"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
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
                      id="outlined-basic"
                      // label="Start Date & Time"
                      variant="outlined"
                      size="small"
                      type="datetime-local"
                      style={{ width: "98.5%" }}
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
                    <center>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          // style={{ marginBottom: "10%" }}
                        >
                          Exam Type
                        </InputLabel>
                        <center>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Exam Type"
                            onChange={handleChange}
                            size="small"
                            style={{ width: "98.5%", paddingBottom: "2%" }}
                          >
                            <MenuItem value={"written"}>Written</MenuItem>
                            <MenuItem value={"viva"}>Viva</MenuItem>
                          </Select>
                        </center>
                      </FormControl>
                    </center>
                  </Grid>
                </Grid>
                {/* <br />
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group">
                    <FormControlLabel
                      value="Always Available"
                      control={<Radio />}
                      label="Always Available"
                    />
                    <FormControlLabel
                      value="Available On Specific Time"
                      control={<Radio/>}
                      label="Available On Specific Time"
                    />
                  </RadioGroup>
                </FormControl>
                <br /> */}

                <br />
                <p
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Specify Who Can Take This Exam</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      onClick={handleOpen}
                    >
                      Assign Groups
                    </Button>
                  </Grid>
                  {/* <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Assign Candidates
                    </Button>
                  </Grid> */}
                </Grid>
                {/* <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth style={{ width: "98.5%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Candidate Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group}
                        label="Candidate Group"
                        onChange={handleChange1}
                      >
                        {candigroup.map((key) => {
                          return <MenuItem value={key._id}>{key.title}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid> */}
                <br />
                <p
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Specify Number of Questions</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      onClick={handleOpen1}
                    >
                      Specify & Add
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <br />
                {/* <br />
                <p>
                  (Specify Start & End Date/Time, If The Exam is Not Always
                  Available)
                </p> */}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  onClick={add_exam}
                >
                  Continue
                </Button>
              </Typography>
            </CardContent>
            {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* {candigroup.map((key) => {
            return (
              <Input type="checkbox" value={key._id}>
                {key.title}
              </Input>
            );
          })} */}
          {candigroup.map((key) => {
            return (
              <Grid
                container
                spacing={1}
                style={{ margin: "1px", alignItems: "center" }}
              >
                <Grid item xs={4}>
                  {key.title}
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#7882BD", width: "30%" }}
                    onClick={(e) => {
                      console.log(key._id);
                      candigrp.push(key._id);
                      alert("Added Successfully!");
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            );
          })}
          {/* <br />
          <center>
            <Button
              variant="contained"
              style={{ backgroundColor: "#7882BD", width: "50%" }}
              onClick={(e) => {
                console.log(candigrp);
              }}
            >
              Continue
            </Button>
          </center> */}
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup>
            {/* {quesgroup.map((key) => {
              return (
                <FormControlLabel
                  control={<Checkbox value={key._id} />}
                  label={key.title}
                />
              );
            })} */}
            {quesgroup.map((key) => {
              return (
                <Grid
                  container
                  spacing={1}
                  style={{ margin: "1px", alignItems: "center" }}
                >
                  <Grid item xs={4}>
                    {key.title}
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "30%" }}
                      onClick={(e) => {
                        console.log(key._id);
                        quesgrp.push(key._id);
                        alert("Added Successfully!");
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </FormGroup>
          {/* <br />
          <center>
            <Button
              variant="contained"
              style={{ backgroundColor: "#7882BD", width: "50%" }}
              onClick={(e) => {
                console.log(quesgrp);
              }}
            >
              Continue
            </Button>
          </center> */}
        </Box>
      </Modal>
      <Footer />
    </div>
  );
}
