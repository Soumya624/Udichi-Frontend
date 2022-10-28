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
import AddexamAdmin from "./Components/Admin/addExam";
import AddquestionAdmin from "./Components/Admin/addQuestion";
import Test from "./testCont";
import ShareContainer from "./Components/ShareContainer/Index";
import Container from "./Components/ShareContainer/Container";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
function App() {
	const [isClicked, setClicked] = useState(false);
	const [screeShare, setScreenShare] = useState(null);
	const [cameraShare, setCameraShare] = useState(null);
	const screen = useReactMediaRecorder({ screen: true, audio: true });

	const camera = useReactMediaRecorder({ video: true, audio: true });
  useEffect(()=>{
    console.log("Hk")
    if(isClicked){
      console.log("nk")
      camera.stopRecording()
      screen.stopRecording()
      console.log(camera,screen)
      if( camera.mediaBlobUrl !== undefined && screen.mediaBlobUrl !== undefined ) zipfile(camera.mediaBlobUrl,screen.mediaBlobUrl)
    }
  },[camera,screen,cameraShare,screeShare])

	async function zipfile(cameraShare,screeShare) {
		console.log("Stopped....");
		console.log(screeShare, cameraShare);
		console.log("Stopped....");
		const zip = new JSZip();
		let video = zip.folder("Recording");
		let blob_screen = await fetch(screeShare).then((r) => r.blob());
		let blob_camera = await fetch(cameraShare).then((r) => r.blob());
    camera.clearBlobUrl()
    screen.clearBlobUrl()
		console.log(blob_camera, blob_screen);
		video.file("screen.mp4", blob_screen);
		video.file("camera.mp4", blob_camera);
		await zip.generateAsync({ type: "blob" }).then(function (content) {
      console.log(content)
      // blob to file with extension zip
      // path request let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
      //await axios
			// .patch(`http://localhost:5000/attempts/${attempt_id}`, data)

			// FileSaver.saveAs(content, "download.zip");
      setCameraShare(null)
      setScreenShare(null)
		});
	} 
	console.log(screeShare, cameraShare);
	return (
		<div>
			<Container>
				<Router>
					<Routes>
						<Route path="/testing-page" element={<Test />} exact />
						<Route path="/" element={<Signup />} exact />
						<Route path="/loginAdmin" element={<LoginAdmin />} exact />
						<Route path="/loginAssessor" element={<LoginAssessor />} exact />
						<Route path="/loginStudent" element={<LoginStudent />} exact />
						<Route path="/loginProctorer" element={<LoginProctorer />} exact />
						<Route path="/dashboardAdmin" element={<DashboardAdmin />} exact />
						<Route
							path="/dashboardProctorer"
							element={<DashboardProctorer />}
							exact
						/>
						<Route
							path="/dashboardAssessor"
							element={<DashboardAssessor />}
							exact
						/>
						<Route
							path="/dashboardStudent"
							element={<DashboardStudent />}
							exact
						/>
						<Route path="/examAdmin" element={<ExamAdmin />} exact />
						<Route path="/candidateAdmin" element={<CandidateAdmin />} exact />
						<Route path="/questionAdmin" element={<QuestionAdmin />} exact />
						<Route
							path="/statisticsAdmin"
							element={<StatisticsAdmin />}
							exact
						/>
						<Route path="/resultAssessor" element={<ResultAssessor />} exact />
						<Route
							path="/presenceAssessor"
							element={<PresenceAssessor />}
							exact
						/>
						<Route path="/vivaAssessor" element={<VivaAssessor />} exact />
						<Route
							path="/vivalinkAssessor"
							element={<VivalinkAssessor />}
							exact
						/>
						<Route
							path="/monitorProctorer"
							element={<MonitorProctorer />}
							exact
						/>
						<Route
							path="/starttestStudent/:id"
							element={<StarttestStudent />}
							exact
						/>
						<Route
							path="/submittestStudent"
							element={<SubmittestStudent />}
							exact
						/>
						<Route
							path="/testStudent/:id"
							element={
								<TestStudent
									cameraShare={cameraShare}
									screeShare={screeShare}
									stopScreenSharing={screen.stopRecording}
									stopCamera={camera.stopRecording}
									setClicked={setClicked}
								/>
							}
							exact
						/>
						<Route
							path="/addcandidateAdmin"
							element={<AddcandidateAdmin />}
							exact
						/>
						<Route path="/addexamAdmin" element={<AddexamAdmin />} exact />
						<Route
							path="/addquestionAdmin"
							element={<AddquestionAdmin />}
							exact
						/>
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
								/>
							}
							exact
						/>
					</Routes>
				</Router>
			</Container>
		</div>
	);
}

export default App;
