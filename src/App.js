import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import LoginAdmin from "./Components/Admin/Registration/Login";
import LoginAssessor from "./Components/Teacher/Registration/Login";
import LoginStudent from "./Components/Student/Registration/Login";
import LoginProctorer from "./Components/Proctorer/Registration/Login";
import DashboardAdmin from "./Components/Admin/Index";
import DashboardProctorer from "./Components/Proctorer/Index";
import DashboardAssessor from "./Components/Teacher/Index";
import DashboardStudent from "./Components/Student/Index";
import ExamAdmin from "./Components/Admin/exam";
import CandidateAdmin from "./Components/Admin/candidates";
import AssessorAdmin from "./Components/Admin/assessors";
import ProctorerAdmin from "./Components/Admin/proctorers";
import QuestionAdmin from "./Components/Admin/questions";
import StatisticsAdmin from "./Components/Admin/statistics";
import ResultAssessor from "./Components/Teacher/result";
import PresenceAssessor from "./Components/Teacher/presence";
import VivaAssessor from "./Components/Teacher/viva";
import VivalinkAssessor from "./Components/Teacher/vivalink";
import MonitorProctorer from "./Components/Proctorer/monitor";
import StarttestStudent from "./Components/Student/starttest";
import SubmittestStudent from "./Components/Student/submittest";
import TestStudent from "./Components/Student/test";
import AddcandidateAdmin from "./Components/Admin/addCandidate";
import AddassessorAdmin from "./Components/Admin/addAssessor";
import AddproctorerAdmin from "./Components/Admin/addProctorer";
import AddexamAdmin from "./Components/Admin/addExam";
import AddquestionAdmin from "./Components/Admin/addQuestion";
import Test from "./testCont";
import Testmarks from "./Common/Testmarks";
import ShareContainer from "./Components/ShareContainer/Index";
import Container from "./Components/ShareContainer/Container";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import Alert from "@mui/material/Alert";
// import FileSaver from "file-saver";
import axiosInstance from "./axiosInstance";
import getCookie from "./getCookie";
import ProtectedRoute from "./ProtectedRoute";
import { Translator, Translate } from "react-auto-translate/lib/commonjs";
import Home from "./Components/Home";
import * as faceapi from "face-api.js";
import { useRef } from "react";
import Liveproc from "./Components/Student/liveproc";

function App() {
  let token = getCookie("access_token");
  const [error, setError] = useState(null);
  let user = JSON.parse(localStorage.getItem("user"));

  let config = null;
  if (user && token)
    config = {
      headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
    };
  const [isClicked, setClicked] = useState(false);
  const [screeShare, setScreenShare] = useState(null);
  const [cameraShare, setCameraShare] = useState(null);
  const [initialise, setInitialise] = useState(false);
  const [multipleFace, setMultipleFace] = useState(false);
  const [ zipfileUploadError, setZipFileUploadError ] = useState(false)
  const [ zipfileUploadLoader, setZipFileUploadLoader ] = useState(false)

  const screen = useReactMediaRecorder({ screen: true, audio: true });

  const camera = useReactMediaRecorder({ video: true, audio: true });
  useEffect(() => {
    console.log(isClicked);
    if (isClicked) {
      camera.stopRecording();
      screen.stopRecording();
      if (
        camera.mediaBlobUrl !== undefined &&
        screen.mediaBlobUrl !== undefined
      )
        zipfile(camera.mediaBlobUrl, screen.mediaBlobUrl);
    }
  }, [camera, screen, cameraShare, screeShare]);

  async function zipfile(cameraShare, screeShare) {
    setZipFileUploadLoader(true)
    console.log("Stopped....");
    console.log("Stopped....");
    const zip = new JSZip();
    let video = zip.folder("Recording");
    let blob_screen = await fetch(screeShare).then((r) => r.blob());
    let blob_camera = await fetch(cameraShare).then((r) => r.blob());
    camera.clearBlobUrl();
    screen.clearBlobUrl();
    video.file("screen.mp4", blob_screen);
    video.file("camera.mp4", blob_camera);
    await zip.generateAsync({ type: "blob" }).then(async function (content) {
      const file = new File([content], "upload_zip.zip");
      let form = new FormData();
      form.append("zip_files", file);
      // blob to file with extension zip
      let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
      console.log("Submitting the file....");
      await axiosInstance
        .patch(`/attempts/${attempt_id}`, form, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.removeItem("attempt_id");
            localStorage.removeItem("submitted_questions_id");
            localStorage.removeItem("questions_id");
            localStorage.removeItem("duration");
            window.location = "/dashboardStudent";
            setZipFileUploadLoader(false)
          }
        })
        .catch((err) => {
          setZipFileUploadLoader(false)
        });

      setCameraShare(null);
      setScreenShare(null);
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
      <Container>
        <div
          style={{
            position: "absolute",
            top: "6em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "70vh",
          }}
        >
          {/* {camera.previewStream && <video ref={videoRef} autoPlay muted width={200} height={200} onPlay={handleVideoOnPlay}/>} */}
          {/* <Liveproc camera={camera} /> */}
        </div>
        <Router>
          <Routes>
            <Route path="/testing-page" element={<Test />} exact />
            {/* <Route path="/" element={<Signup setError={setError} />} exact /> */}
            <Route path="/" element={<Home setError={setError} />} exact />
            <Route
              path="/loginAdmin"
              element={<LoginAdmin setError={setError} />}
              exact
            />
            <Route
              path="/loginAssessor"
              element={<LoginAssessor setError={setError} />}
              exact
            />
            <Route
              path="/loginStudent"
              element={<LoginStudent setError={setError} />}
              exact
            />
            <Route
              path="/loginProctorer"
              element={<LoginProctorer setError={setError} />}
              exact
            />
            <Route path="/testMarks" element={<ProtectedRoute />} exact>
              <Route
                path="/testMarks/:attempt_id/:submission_id"
                element={<Testmarks setError={setError} />}
                exact
              />
            </Route>
            <Route path="/dashboardAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/dashboardAdmin"
                element={<DashboardAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route
              path="/dashboardProctorer"
              element={<ProtectedRoute />}
              exact
            >
              <Route
                path="/dashboardProctorer"
                element={<DashboardProctorer setError={setError} />}
                exact
              />
            </Route>
            <Route path="/dashboardAssessor" element={<ProtectedRoute />} exact>
              <Route
                path="/dashboardAssessor"
                element={<DashboardAssessor setError={setError} />}
                exact
              />
            </Route>
            <Route path="/dashboardStudent" element={<ProtectedRoute />} exact>
              <Route
                path="/dashboardStudent"
                element={<DashboardStudent setError={setError} />}
                exact
              />
            </Route>
            <Route path="/examAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/examAdmin"
                element={<ExamAdmin setError={setError} />}
                exact
              />
            </Route>

            <Route path="/candidateAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/candidateAdmin"
                element={<CandidateAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/assessorAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/assessorAdmin"
                element={<AssessorAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/proctorerAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/proctorerAdmin"
                element={<ProctorerAdmin setError={setError} />}
                exact
              />
            </Route>

            <Route path="/questionAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/questionAdmin"
                element={<QuestionAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/statisticsAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/statisticsAdmin"
                element={<StatisticsAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/resultAssessor" element={<ProtectedRoute />} exact>
              <Route
                path="/resultAssessor"
                element={<ResultAssessor setError={setError} />}
                exact
              />
            </Route>
            <Route path="/presenceAssessor" element={<ProtectedRoute />} exact>
              <Route
                path="/presenceAssessor"
                element={<PresenceAssessor setError={setError} />}
                exact
              />
            </Route>
            <Route path="/vivaAssessor" element={<ProtectedRoute />} exact>
              <Route
                path="/vivaAssessor"
                element={<VivaAssessor setError={setError} />}
                exact
              />
            </Route>

            <Route path="/vivalinkAssessor" element={<ProtectedRoute />} exact>
              <Route
                path="/vivalinkAssessor"
                element={<VivalinkAssessor setError={setError} />}
                exact
              />
            </Route>
            <Route
              path="/monitorProctorer/:id"
              element={<ProtectedRoute />}
              exact
            >
              <Route
                path="/monitorProctorer/:id"
                element={<MonitorProctorer setError={setError} />}
                exact
              />
            </Route>

            <Route
              path="/starttestStudent/:id"
              element={<ProtectedRoute />}
              exact
            >
              <Route
                path="/starttestStudent/:id"
                element={<StarttestStudent setError={setError} />}
                exact
              />
            </Route>
            <Route path="/submittestStudent" element={<ProtectedRoute />} exact>
              <Route
                path="/submittestStudent"
                element={<SubmittestStudent setError={setError} />}
                exact
              />
            </Route>
            <Route path="/testStudent/:id" element={<ProtectedRoute />} exact>
              <Route
                path="/testStudent/:id"
                element={
                  <TestStudent
                    cameraShare={cameraShare}
                    screeShare={screeShare}
                    stopScreenSharing={screen.stopRecording}
                    stopCamera={camera.stopRecording}
                    setClicked={setClicked}
                    setError={setError}
                    multipleFace={multipleFace}
                    setZipFileUploadLoader = {setZipFileUploadLoader}
                    zipfileUploadLoader = {zipfileUploadLoader}
                  />
                }
                exact
              />
            </Route>

            <Route path="/addcandidateAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/addcandidateAdmin"
                element={<AddcandidateAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/addassessorAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/addassessorAdmin"
                element={<AddassessorAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/addproctorerAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/addproctorerAdmin"
                element={<AddproctorerAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/addexamAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/addexamAdmin"
                element={<AddexamAdmin setError={setError} />}
                exact
              />
            </Route>

            <Route path="/addquestionAdmin" element={<ProtectedRoute />} exact>
              <Route
                path="/addquestionAdmin"
                element={<AddquestionAdmin setError={setError} />}
                exact
              />
            </Route>
            <Route path="/shareScreen/:id" element={<ProtectedRoute />} exact>
              <Route
                path="/shareScreen/:id"
                element={
                  <ShareContainer
                    startScreenRecording={screen.startRecording}
                    startCameraRecording={camera.startRecording}
                    mediaCameraBlob={camera.mediaBlobUrl}
                    mediaScreenBlob={screen.mediaBlobUrl}
                    stopScreenSharing={screen.stopRecording}
                    stopCamera={camera.stopRecording}
                    setScreenShare={setScreenShare}
                    setCameraShare={setCameraShare}
                    cameraStatus={camera.status}
                    screeStatus={screen.status}
                    isClicked={isClicked}
                    setError={setError}
                    camera={camera}
                  />
                }
                exact
              />
            </Route>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
