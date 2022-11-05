import React from "react";
import Navbar from "./../../Common/Navbar_Assessor";
import Chart from "./../../Common/Chart";
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
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";
import { useState } from "react";
import { useEffect } from "react";
import getCookie from "../../getCookie";
import axiosInstance from "../../axiosInstance";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Index() {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };
  const [alltest, setAlltest] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/test/all", config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setAlltest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function confirmation() {
    alert("Presence Confirmed!");
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "5%" }}>
        <br />
        <br />
        <br />
        <h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
          Welcome!
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Want to View{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Your Account?
          </a>
        </p>
        <br />
        <br />
        <br />
        {alltest.map((altst) => {
          let momentDate =  moment.utc(altst.starting_date).format('MM/DD/YY, h:mm:ss a')
          return (
            <div>
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Box gridColumn="span 12">
                  <Item
                    style={{
                      padding: "1.5%",
                      borderLeft: "2rem solid #7882bd",
                    }}
                  >
                    <h3 style={{ textAlign: "left" }}>{altst.title}</h3>
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={1}
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Box gridColumn="span 3" style={{ textAlign: "left" }}>
                        Duration: {altst.available_window} mins
                      </Box>
                      <Box gridColumn="span 3">{momentDate}</Box>
                      <Box
                        gridColumn="span 3"
                        style={{ color: "red", cursor: "pointer" }}
                      >
                        View Results
                      </Box>
                      <Box
                        gridColumn="span 3"
                        style={{
                          textAlign: "right",
                          color: "#7882bd",
                          cursor: "pointer",
                        }}
                      >
                        <a
                          style={{ textDecoration: "none" }}
                          onClick={confirmation}
                        >
                          Confirm Presence
                        </a>
                      </Box>
                    </Box>
                  </Item>
                </Box>
              </Box>
              <br />
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
