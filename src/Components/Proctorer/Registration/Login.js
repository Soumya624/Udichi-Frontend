import React from "react";
import Navbar from "./../../../Common/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Footer from "./../../../Common/Footer";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../axiosInstance";
import { CircularProgress } from "@mui/material";
import logo from "./../../../Assets/Index.png";

export default function Signup({ error, setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function submit(e) {
    setLoading(true);
    e.preventDefault();
    let data = {
      email: username,
      password: password,
    };
    axiosInstance
      .post("/proctorer/login", data)
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          let token = res.data.access_token;
          let user_data = res.data.proctorer;

          localStorage.setItem("user", JSON.stringify(user_data));

          setCookie(`access_token`, `${token}`, 1);
          window.location = "/dashboardProctorer";
        }
        setLoading(false);
        //setCookie(`refresh`, `${token.refresh}`, 1);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }

  return (
    <div>
      {/* <Navbar /> */}
      <center>
        <div
          style={{
            padding: "7% 2%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img src={logo} style={{ width: "4%" }} />
            <h3 style={{ margin: "0 0 0 10px" }}>
              Udichi Online Assessment Portal
            </h3>
          </div>
          <br />
          <Card
            sx={{
              maxWidth: 500,
              boxShadow:
                "0px 0px 10px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h4
              style={{
                fontWeight: "normal",
                textAlign: "center",
                backgroundColor: "#f0f0f0",
                padding: "3%",
                margin: "0",
                color: "#b0b1ab",
              }}
            >
              Proctorer Signin
            </h4>
            <CardContent style={{ padding: "4%" }}>
              <br />
              <form onSubmit={submit}>
                <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <label style={{ display: "block", textAlign: "left" }}>
                        Username / Email
                      </label>
                      <TextField
                        required
                        id="outlined-basic"
                        placeholder="Enter Email"
                        variant="outlined"
                        size="small"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setUsername(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>

                  <br />
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <label style={{ display: "block", textAlign: "left" }}>
                        Password
                      </label>
                      <TextField
                        required
                        id="outlined-basic"
                        placeholder="Enter Password"
                        variant="outlined"
                        type="password"
                        size="small"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setPassword(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#4ba4d2", width: "100%" }}
                    // onClick={submit}
                  >
                    {loading && <CircularProgress color="inherit" />}
                    {!loading && `SIGN IN`}
                  </Button>
                  <br />
                  {/* <p style={{ marginTop: "1%" }}>
										Don't Have an Account?{" "}
										<a href="/" style={{ textDecoration: "none" }}>
											Click Here
										</a>
									</p> */}
                </Typography>
              </form>
              <p style={{ fontSize: "12px", textAlign: "center" }}>
                Please contact udichiportal@gmail.com in case of any query
              </p>
            </CardContent>
            {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> 
            */}
          </Card>
        </div>
      </center>
      {/* <Footer /> */}
    </div>
  );
}
