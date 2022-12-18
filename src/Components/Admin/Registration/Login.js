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
import setCookie from "../../../setCookie";
import { CircularProgress } from "@mui/material";
import Translator from "react-auto-translate/lib/commonjs/translator";
import { Translate } from "@mui/icons-material";

export default function LoginAdmin({ error, setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e) {
    setLoading(true);
    e.preventDefault();
    let data = {
      email: username,
      password: password,
    };
    axiosInstance
      .post("/login/", data)
      .then((res) => {
        if (res.status === 200) {
          let token = res.data.access_token;
          let user_data = res.data.user;

          localStorage.setItem("user", JSON.stringify(user_data));

          setCookie(`access_token`, `${token}`, 1);
          setCookie(`user_type`, `${user_data.usertype}`, 1);

          let user_type = user_data.usertype;
          if (user_type === "admin") {
            window.location = "/dashboardAdmin";
          }
          setLoading(false);
          // setCookie(`refresh`, `${token.refresh}`, 1);
        }
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

  const cacheProvider = {
    get: (language, key) =>
      ((JSON.parse(localStorage.getItem("translations")) || {})[key] || {})[
        language
      ],
    set: (language, key, value) => {
      const existing = JSON.parse(localStorage.getItem("translations")) || {
        [key]: {},
      };
      existing[key] = { ...existing[key], [language]: value };
      localStorage.setItem("translations", JSON.stringify(existing));
    },
  };

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
                Login Admin
              </Typography>
              <p style={{ marginTop: "0" }}>
                Please Fill The Requirements Below to
                <br />
                Get Connected
              </p>
              <br />
              <form onSubmit={submit}>
                <Typography variant="body2" color="text.secondary">
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <center>
                        <TextField
                          required
                          id="outlined-basic"
                          label="Username"
                          variant="outlined"
                          size="small"
                          style={{ width: "98.5%" }}
                          onChange={(e) => {
                            e.preventDefault();
                            setUsername(e.target.value);
                          }}
                        />
                      </center>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                    <Grid item xs={12}>
                      <center>
                        <TextField
                          required
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          type="password"
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
                  <br />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#07a8a0", width: "50%" }}
                    // onClick={submit}
                  >
                    {loading && <CircularProgress color="inherit" />}
                    {!loading && `Continue`}
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
            </CardContent>
            {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> 
            */}
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
