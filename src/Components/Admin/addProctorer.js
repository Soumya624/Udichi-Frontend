import React from "react";
import Navbar from "../../Common/Navbar_Admin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Footer from "../../Common/Footer";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import emailjs from "@emailjs/browser";

export default function Signup() {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [fathername, setFathername] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [telephone, setTelephone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

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

  async function register_user(e) {
    e.preventDefault();
    let data = {
      firstname: fname,
      lastname: lname,
      fathername: fathername,
      aadharnumber: aadhar,
      email: email,
      username: email,
      password: password,
      mobile: mobile,
      telephone: telephone,
      street: street,
      city: city,
      state: state,
      country: country,
      zip: zip,
      usertype: "proctorer",
    };
    console.log(data);
    axiosInstance
      .post("/proctorer/", data, config)
      .then((res) => {
        console.log(res.data);
        sendEmail();
        window.location = "/proctorerAdmin";
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
                Add Proctorer
              </Typography>
              {/* <p style={{ marginTop: "0" }}>
								Please Fill The Requirements Below to
								<br />
								Get Connected
							</p> */}
              <br />
              <form onSubmit={register_user}>
                <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <TextField
                        required
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
                        required
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
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Father's Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setFathername(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
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
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <TextField
                        required
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
                        required
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
                          required
                          fullWidth
                          id="outlined-basic"
                          label="Password"
                          type="password"
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
                    <Grid item xs={6}>
                      <TextField
                        required
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
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Telephone"
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
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Street"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setStreet(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setCity(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setState(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        label="Country"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                          setCountry(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <center>
                        <TextField
                          required
                          fullWidth
                          id="outlined-basic"
                          label="Zip Code"
                          variant="outlined"
                          size="small"
                          // style={{ width: "98.5%" }}
                          onChange={(e) => {
                            e.preventDefault();
                            setZip(e.target.value);
                          }}
                        />
                      </center>
                    </Grid>
                  </Grid>
                  <br />
                  {/* <FormControlLabel
										control={<Checkbox />}
										label="Admin"
										value="admin"
										onChange={(e) => {
											e.preventDefault();
											setUser(e.target.value);
										}}
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="Assessor"
										value="teacher"
										onChange={(e) => {
											e.preventDefault();
											setUser(e.target.value);
										}}
									/>
									<FormControlLabel
										control={<Checkbox />}
										label="Proctorer"
										value="proctorer"
										onChange={(e) => {
											e.preventDefault();
											setUser(e.target.value);
										}}
									/>
									<br />
									<br /> */}
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#07a8a0", width: "50%" }}
                    // onClick={register_user}
                  >
                    Continue
                  </Button>
                </Typography>
              </form>
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
