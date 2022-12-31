import React, { useState, useEffect } from "react";
import Camera from "./Camera";
import Screen from "./Screen";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import Navbar from "./../../Common/Navbar_Student";
import Footer from "./../../Common/Footer";

export default function Index({
  startScreenRecording,
  startCameraRecording,
  mediaScreenBlob,
  mediaCameraBlob,
  stopScreenSharing,
  stopCamera,
  setScreenShare,
  setCameraShare,
  cameraStatus,
  screeStatus,
  isClicked,
  error,
  setError,
}) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const navigate = useNavigate();
  const [alloted_test, setAllotedTest] = useState(null);
  const [is_attempted, setIsAttempted] = useState(false);
  const [previous_submission, setPreviousSubmission] = useState(null);
  const [number_of_attempts, setNumberOfAttempts] = useState(0);
  const [is_proctoring, setIsProctoring] = useState(true);
  console.log("Asdnkajndkjsnk");
  const { id } = useParams();
  // const [screeShare, setScreenShare] = useState(null);
  // const [cameraShare, setCameraShare] = useState(null);
  // const [isClicked, setClicked] = useState(false);
  useEffect(() => {
    axiosInstance
      .get(`/test/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let data = res.data;
          console.log(data.proctoring);
          setIsProctoring(data.proctoring);
          let question_groups = data.question_groups;
          let questions = [];
          for (let ques of question_groups) {
            console.log(ques.questions);
            questions = questions.concat(ques.questions);
          }
          localStorage.setItem("questions", JSON.stringify(questions));
          localStorage.setItem("test_id", JSON.stringify(id));
          setAllotedTest(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status !== 404)
          setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }, [id]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_id"));
    console.log(user);
    axiosInstance
      .get(`/attempts/group/${user}/${id}`, config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsAttempted(true);
          setPreviousSubmission(res.data);
          setNumberOfAttempts(res.data.attempts_submitted.length);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status !== 404)
          setError("Error occurred! Please Try Again.....");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }, []);

  const startExam = async () => {
    let data = {
      test: id,
      candidate: JSON.parse(localStorage.getItem("user_id")),
      number_of_attempts_left: alloted_test.number_of_attempts,
    };

    // console.log(previous_submission._id)

    // check whether there is any
    if (is_attempted) {
      await axiosInstance
        .patch(`/attempts/groups/${previous_submission._id}`, data, config)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            localStorage.setItem(
              "attempted_group_id",
              JSON.stringify(res.data._id)
            );
            setTimeout(() => {
              navigate("/testStudent/1");
            }, 10);
            // navigate("/testStudent/1");
            // window.location = "/testStudent/1";
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status !== 404)
            setError("Error occurred! Please Try Again.....");
          setTimeout(() => {
            setError(null);
          }, 1000);
        });
    } else {
      await axiosInstance
        .post("/attempts/create-group", data, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem(
              "attempted_group_id",
              JSON.stringify(res.data._id)
            );
            window.location = "/testStudent/1";
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status !== 404)
            setError("Error occurred! Please Try Again.....");
          setTimeout(() => {
            setError(null);
          }, 1000);
        });
    }
    let submitted_question = JSON.parse(
      localStorage.getItem("submitted_questions_id")
    );
    let test = JSON.parse(localStorage.getItem("test_id"));
    let user = JSON.parse(localStorage.getItem("user_id"));
    let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));

    let d = {
      test: test,
      candidate: user,
      questions_submitted: submitted_question,
    };

    if (attempt_id === null) {
      await axiosInstance
        .post("/attempts", d, config)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);

            localStorage.setItem("attempt_id", JSON.stringify(res.data._id));
            navigate("/testStudent/1");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status !== 404)
            setError("Error occurred! Please Try Again.....");
          setTimeout(() => {
            setError(null);
          }, 1000);
        });
    } else {
      console.log("sdfkjsk");
      navigate("/testStudent/1");
    }
  };

  useState(() => {
    console.log(is_proctoring);
  }, [is_proctoring]);

  if (alloted_test === null) {
    return <h1>Loading...</h1>;
  }

  const left_attempts = alloted_test.number_of_attempts - number_of_attempts;
  if (left_attempts <= 0) {
    window.location = "/dashboardStudent";
  }

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Navbar />
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
              <center>Share Access</center>
            </Typography>
            <br />
            <ul style={{ textAlign: "justify" }}>
              <li style={{ textAlign: "justify" }}>
                {" "}
                Students are requested to share the screen and the camera,
                before starting the exam (if requested)
              </li>
              <br />
              <li style={{ textAlign: "justify" }}>
                {" "}
                If any student faces any network issue during this time, he/she
                can call the pre-announced phone number, to get the assistance
              </li>
            </ul>
            <br />
            <br />
            <br />
            <div
              style={{
                display: "flex",
              }}
            >
              <center>
                {is_proctoring && (
                  <Screen
                    startRecording={startScreenRecording}
                    setMediaBlob={setScreenShare}
                    mediaBlobUrl={mediaScreenBlob}
                    stopRecording={stopScreenSharing}
                    isClicked={isClicked}
                    enable={screeStatus === "acquiring_media"}
                  />
                )}
                {is_proctoring && (
                  <Camera
                    startRecording={startCameraRecording}
                    setCameraBlob={setCameraShare}
                    mediaBlobUrl={mediaCameraBlob}
                    stopRecording={stopCamera}
                    isClicked={isClicked}
                    enable={cameraStatus === "acquiring_media"}
                  />
                )}
                {is_proctoring && (
                  <Button
                    disabled={
                      !(
                        screeStatus === "recording" &&
                        cameraStatus === "recording"
                      )
                    }
                    variant="contained"
                    onClick={() => {
                      if (
                        screeStatus === "recording" &&
                        cameraStatus === "recording"
                      ) {
                        console.log("Recording....");
                        startExam();
                      }
                    }}
                    style={{
                      backgroundColor: !(
                        screeStatus === "recording" &&
                        cameraStatus === "recording"
                      )
                        ? "#aaaaaa"
                        : "#07a8a0",
                      margin: "2px",
                    }}
                    // enabled={
                    // 	screeStatus !== "recording" && cameraStatus !== "recording"
                    // }
                  >
                    Continue Exam
                  </Button>
                )}
                {!is_proctoring && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      startExam();
                    }}
                    style={{
                      backgroundColor: !(
                        screeStatus === "recording" &&
                        cameraStatus === "recording"
                      )
                        ? "#aaaaaa"
                        : "#07a8a0",
                      margin: "2px",
                    }}
                    // enabled={
                    // 	screeStatus !== "recording" && cameraStatus !== "recording"
                    // }
                  >
                    Continue Exam
                  </Button>
                )}
              </center>
            </div>
          </CardContent>
          {/* <CardActions>
<Button size="small">Share</Button>
<Button size="small">Learn More</Button>
</CardActions> */}
        </Card>
      </div>
      <Footer />
    </>
  );
}
