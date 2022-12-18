import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { InputBase } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import emailjs from "@emailjs/browser";

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

  const [group, setGroup] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [candigroup, setCandigroup] = useState([]);
  const [grptitle, setGrptitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getCandidates();
  }, []);

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  async function sendEmail() {
    // Construct the email message
    let emailMessage = {
      to: email,
      subject: `Your Username: ${username} and Password: ${password}`,
    };

    // Send the email
    let result = await emailjs.send(
      "service_saoe924",
      "template_9vghbes",
      emailMessage,
      "PDBciQ1IxtBzQDf28"
    );
    console.log(result);
  }

  async function add_candidate(e) {
    e.preventDefault();
    let data = {
      firstname: fname,
      lastname: lname,
      aadharnumber: aadhar,
      email: email,
      username: username,
      password: password,
      mobile: mobile,
      telephone: telephone,
      candidate_group: group,
    };

    console.log(data);
    axiosInstance
      .post("/candidate/", data, config)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          sendEmail();
          window.location = "/candidateAdmin";
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

  async function add_candidategroup(e) {
    e.preventDefault();
    let data = {
      title: grptitle,
    };
    axiosInstance
      .post("/candidate_group/", data, config)
      .then((res) => {
        console.log(res);
        alert("Candidate Group Created!");
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }

  // get Candidates Group
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
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
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
                Add Candidate
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setFname(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setLname(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setUsername(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <center>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setPassword(e.target.value);
                        }}
                      />
                    </center>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Mobile Number"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setMobile(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Aadhar Number"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setAadhar(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Telephone Number"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                        setTelephone(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Candidate Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group}
                        label="Candidate Group"
                        onChange={handleChange}
                      >
                        {candigroup.map((key) => {
                          return (
                            <MenuItem value={key._id}>{key.title}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#07a8a0", width: "50%" }}
                  onClick={add_candidate}
                >
                  Continue
                </Button>
                <br />
                <p>
                  Create a{" "}
                  <a
                    onClick={handleOpen}
                    style={{ textDecoration: "none", cursor: "pointer" }}
                  >
                    Candidate Group
                  </a>
                </p>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Specify Candidate Group"
                  variant="outlined"
                  size="small"
                  style={{ width: "98.5%" }}
                  onChange={(e) => {
                    e.preventDefault();
                    setGrptitle(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "#07a8a0", width: "50%" }}
              onClick={add_candidategroup}
            >
              Continue
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
