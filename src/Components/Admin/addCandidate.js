import React, { useState } from "react";
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

export default function AddCandidate() {
  const [group, setGroup] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  async function add_candidate(e) {
    e.preventDefault();
    let data = {
      firstname:fname,
      lastname:lname,
      aadharnumber:aadhar,
      email:email,
      username:username,
      password:password,
      mobile:mobile,
      telephone:telephone,
      candidate_group:group,
    }

    console.log(data);
    axios
    .post("http://localhost:5000/candidate/", data)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
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
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        size="small"
                        style={{ width: "98.5%" }}
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
                      id="outlined-basic"
                      label="Mobile Number"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
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
                    <center>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ marginBottom: "10%" }}
                        >
                          Candidate Group
                        </InputLabel>
                        <center>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={group}
                            label="Candidate Group"
                            onChange={handleChange}
                            size="small"
                            style={{ width: "98.5%", padding: "1.2%" }}
                          >
                          </Select>
                        </center>
                      </FormControl>
                    </center>
                  </Grid>
                </Grid>
                <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Enable Special Needs"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Save as Inactive"
                />
                <br />
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  onClick={add_candidate}
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
