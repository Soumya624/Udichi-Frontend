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
          localStorage.setItem("duration", JSON.stringify(duration*60*1000));
          setAllotedTest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error occurred! Please Try Again.....");
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
          setError("Error occurred! Please Try Again.....");
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
          setError("Error occurred! Please Try Again.....");
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
                {alloted_test.title}
              </Typography>
              <br />
              <ul style={{ textAlign: "justify" }}>
                <li style={{ textAlign: "justify" }}>
                  {" "}
                  The examination does not require any paper, pen, pencil and
                  calculator
                </li>
                <br />
                <li style={{ textAlign: "justify" }}>
                  {" "}
                  Any student can take the examination on a Laptop/Desktop/Smart
                  Phone
                </li>
                <br />
                <li style={{ textAlign: "justify" }}>
                  {" "}
                  The answers can be changed at any time during the test and are
                  saved automatically
                </li>
                <br />
                <li style={{ textAlign: "justify" }}>
                  {" "}
                  The system automatically shuts down when the time limit is
                  over. Alternatively if examinee finishes the exam before time
                  he can quit by pressing the 'Submit' button
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
                    {/* {isError && <p>Error</p>} */}
                    <div ref={ref} />
                    {image && (
                      <img
                        style={{ width: "30em" }}
                        src={image}
                        alt={"Screenshot"}
                      />
                    )}
                    <b>
                      {/* <Countdown date={Date.now() + 35000}> */}
                        <div>
                          <Completionist />
                          <br />
                          Slow Server: Please Wait 1-2 Minutes Before Any Action
                          <br/>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor:
                                left_attempts <= 0 ? "#aaaaaa" : "#07a8a0",
                              margin: "1em",
                            }}
                            // onClick={getImage}
                            // onClick={startRecording}
                            href={`/shareScreen/${id}`}
                            disabled={left_attempts <= 0}
                          >
                            Start Exam
                          </Button>
                        </div>
                      {/* </Countdown> */}
                    </b>
                    {/* <Button
											variant="contained"
											style={{ backgroundColor: "#07a8a0", margin: "1em" }}
											onClick={() => {
												image && downloadImage();
											}}
										>
											Download Image
										</Button> */}
                  </div>
                )}
                <br />
                <div>
                  {/* <p>{status}</p> */}
                  {/* <button onClick={startRecording}>Start Recording</button> */}
                  {/* <button onClick={stopRecording}>Stop Recording</button>
									<video style={{width : "30em"}} src={mediaBlobUrl} controls autoPlay loop /> */}
                </div>
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
