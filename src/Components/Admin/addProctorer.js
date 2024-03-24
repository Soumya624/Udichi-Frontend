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
    let emailMessage = {
      to: email,
      subject: `Your Udichi Username: ${email} and Password: ${password}`,
    };

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
                  Add Proctorer
                </Typography>
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
                            onChange={(e) => {
                              e.preventDefault();
                              setZip(e.target.value);
                            }}
                          />
                        </center>
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ backgroundColor: "#193441", width: "50%" }}
                    >
                      Continue
                    </Button>
                  </Typography>
                </form>
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
