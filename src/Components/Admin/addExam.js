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

export default function AddCandidate() {
  const [group, setGroup] = useState();
  const [type, setType] = useState("");
  const [flag, setFlag] = useState(true);
  const [title, setTitle] = useState("");
  const [startdate, setStartdate] = useState("");
  const [duration, setDuration] = useState("");
  const [fullmarks, setFullmarks] = useState("");
  const [candigroup, setCandigroup] = useState([]);

  useEffect(() => {
    getCandidates();
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
    candidates_groups: group
  }
  console.log(data);
  // axios
  // .post('http://localhost:5000/test/', data)
  // .then(res=>{
  //   console.log(res);
  // })
  // .catch(err=>{
  //   console.log(err);
  // })
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
                      onChange = {(e)=>{
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
                      onChange = {(e)=>{
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
                      onChange = {(e)=>{
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
                      onChange = {(e)=>{
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
                {/* <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Assign Groups
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Assign Candidates
                    </Button>
                  </Grid>
                </Grid> */}
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
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
                </Grid>
                {/* <br />
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
                      href="#"
                    >
                      Specify & Add
                    </Button>
                  </Grid>
                </Grid>
                <br /> */}
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
      <Footer />
    </div>
  );
}
