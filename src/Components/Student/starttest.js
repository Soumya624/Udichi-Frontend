import React, { useEffect, useRef, useState } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../../Common/Footer";
import { useScreenshot } from "use-screenshot-hook";
import { useReactMediaRecorder } from "react-media-recorder";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import Countdown from "react-countdown";
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

export default function Confirmpresence({ error, setError }) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };
  const { id } = useParams();
  const [alloted_test, setAllotedTest] = useState(null);
  const [is_attempted, setIsAttempted] = useState(false);
  const [previous_submission, setPreviousSubmission] = useState(null);
  const [number_of_attempts, setNumberOfAttempts] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/test/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let data = res.data;
          let question_groups = data.question_groups;
          let duration = data.available_window;
          let questions = [];
          for (let ques of question_groups) {
            console.log(ques.questions);
            questions = questions.concat(ques.questions);
          }
          localStorage.setItem("questions", JSON.stringify(questions));
          localStorage.setItem("test_id", JSON.stringify(id));
          localStorage.setItem(
            "duration",
            JSON.stringify(duration * 60 * 1000)
          );
          localStorage.setItem("proctoring", JSON.stringify(data.proctoring));
          setAllotedTest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred. Please try again!");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }, [id]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_id"));
    axiosInstance
      .get(`/attempts/group/${user}/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setNumberOfAttempts(res.data.attempts_submitted.length);
          setIsAttempted(true);
          setPreviousSubmission(res.data);
        }
      })
      .catch((err) => {
        if (err.response.status !== 404)
          setError("Error occurred. Please try again!");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_id"));
    let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
    if (attempt_id && user) {
      axiosInstance
        .get(`/attempts/attempt/${attempt_id}/${user}`, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setError("Error occurred. Please try again!");
          setTimeout(() => {
            setError(null);
          }, 1000);
        });
    } else {
      console.log("Not possible");
    }
  }, []);

  const { isLoading, image, takeScreenshot, clear } = useScreenshot();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });
  const ref = useRef(null);

  const getImage = () => {
    clear();
    takeScreenshot("jpg", {
      backgroundColor: "white",
    });
  };

  const downloadImage = () => {
    let a = document.createElement("a");
    a.href = image;
    a.download = "Screenshot.png";
    a.click();
  };

  if (alloted_test === null) {
    return <h1>Loading...</h1>;
  }

  let left_attempts = alloted_test.number_of_attempts - number_of_attempts;
  const Completionist = () => <span>Number of Attempts: {left_attempts}</span>;

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
    <SidebarItem href="/dashboardStudent">
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
                  {alloted_test.title}
                </Typography>
                <br />
                <ul style={{ textAlign: "justify" }}>
                  <br />
                  <li style={{ textAlign: "justify" }}>
                    {" "}
                    You can take the examination on a Laptop or Desktop.
                  </li>
                  <br />
                  <li style={{ textAlign: "justify" }}>
                    {" "}
                    The answers can be changed at any time during the test and
                    are saved automatically.
                  </li>
                  <br />
                  <li style={{ textAlign: "justify" }}>
                    {" "}
                    The system automatically shuts down when the time limit is
                    over.
                  </li>
                  <br />
                  <li style={{ textAlign: "justify" }}>
                    {" "}
                    If you want to finish the exam before time, then you can
                    quit by pressing the Submit button.
                  </li>
                </ul>
                <br />
                <br />
                <br />

                <Typography variant="body2" color="text.secondary">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <div>
                      <div ref={ref} />
                      {image && (
                        <img
                          style={{ width: "30em" }}
                          src={image}
                          alt={"Screenshot"}
                        />
                      )}
                      <b>
                        <div>
                          <Completionist />
                          <br />
                          <p style={{ fontSize: "10px" }}>
                            Due to slow server, please wait for 2 minutes before
                            taking any action.
                          </p>
                          <br />
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor:
                                left_attempts <= 0 ? "#aaaaaa" : "#193441",
                              margin: "1em",
                            }}
                            href={`/shareScreen/${id}`}
                            disabled={left_attempts <= 0}
                          >
                            Start Exam
                          </Button>
                        </div>
                      </b>
                    </div>
                  )}
                  <br />
                  <div></div>
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
      </Sidebar>
    </div>
  );
}
