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
// import FileSaver from "file-saver";
import axiosInstance from "./axiosInstance";
import getCookie from "./getCookie";
import ProtectedRoute from "./ProtectedRoute";
function App() {
	let token = getCookie("access_token");
	let user = JSON.parse(localStorage.getItem("user"));

	let config = null;
	if (user && token)
		config = {
			headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
		};
	const [isClicked, setClicked] = useState(false);
	const [screeShare, setScreenShare] = useState(null);
	const [cameraShare, setCameraShare] = useState(null);
	const screen = useReactMediaRecorder({ screen: true, audio: true });

	const camera = useReactMediaRecorder({ video: true, audio: true });
	useEffect(() => {
		console.log("Hk");
		if (isClicked) {
			console.log("nk");
			camera.stopRecording();
			screen.stopRecording();
			console.log(camera, screen);
			if (
				camera.mediaBlobUrl !== undefined &&
				screen.mediaBlobUrl !== undefined
			)
				zipfile(camera.mediaBlobUrl, screen.mediaBlobUrl);
		}
	}, [camera, screen, cameraShare, screeShare]);

	async function zipfile(cameraShare, screeShare) {
		console.log("Stopped....");
		console.log(screeShare, cameraShare);
		console.log("Stopped....");
		const zip = new JSZip();
		let video = zip.folder("Recording");
		let blob_screen = await fetch(screeShare).then((r) => r.blob());
		let blob_camera = await fetch(cameraShare).then((r) => r.blob());
		camera.clearBlobUrl();
		screen.clearBlobUrl();
		console.log(blob_camera, blob_screen);
		video.file("screen.mp4", blob_screen);
		video.file("camera.mp4", blob_camera);
		await zip.generateAsync({ type: "blob" }).then(async function (content) {
			console.log(content);
			const file = new File([content], "upload_zip.zip");
			console.log(file);
			let form = new FormData();
			form.append("zip_files", file);
			// blob to file with extension zip
			let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
			await axiosInstance
				.patch(`/attempts/${attempt_id}`, form, config)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						localStorage.removeItem("attempt_id");
					}
				})
				.catch((err) => {
					console.log(err);
				});

			// FileSaver.saveAs(content, "download.zip");
			setCameraShare(null);
			setScreenShare(null);
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
						<Route path="/dashboardAdmin" element={<ProtectedRoute />} exact>
							<Route
								path="/dashboardAdmin"
								element={<DashboardAdmin />}
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
								element={<DashboardProctorer />}
								exact
							/>
						</Route>
						<Route path="/dashboardAssessor" element={<ProtectedRoute />} exact>
							<Route
								path="/dashboardAssessor"
								element={<DashboardAssessor />}
								exact
							/>
						</Route>
						<Route path="/dashboardStudent" element={<ProtectedRoute />} exact>
							<Route
								path="/dashboardStudent"
								element={<DashboardStudent />}
								exact
							/>
						</Route>
						<Route path="/examAdmin" element={<ProtectedRoute />} exact>
							<Route path="/examAdmin" element={<ExamAdmin />} exact />
						</Route>

						<Route path="/candidateAdmin" element={<ProtectedRoute />} exact>
							<Route
								path="/candidateAdmin"
								element={<CandidateAdmin />}
								exact
							/>
						</Route>

						<Route path="/questionAdmin" element={<ProtectedRoute />} exact>
							<Route path="/questionAdmin" element={<QuestionAdmin />} exact />
						</Route>
						<Route path="/statisticsAdmin" element={<ProtectedRoute />} exact>
							<Route
								path="/statisticsAdmin"
								element={<StatisticsAdmin />}
								exact
							/>
						</Route>
						<Route path="/resultAssessor" element={<ProtectedRoute />} exact>
							<Route
								path="/resultAssessor"
								element={<ResultAssessor />}
								exact
							/>
						</Route>
						<Route path="/presenceAssessor" element={<ProtectedRoute />} exact>
							<Route
								path="/presenceAssessor"
								element={<PresenceAssessor />}
								exact
							/>
						</Route>
						<Route path="/vivaAssessor" element={<ProtectedRoute />} exact>
							<Route path="/vivaAssessor" element={<VivaAssessor />} exact />
						</Route>

						<Route path="/vivalinkAssessor" element={<ProtectedRoute />} exact>
							<Route
								path="/vivalinkAssessor"
								element={<VivalinkAssessor />}
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
								element={<MonitorProctorer />}
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
								element={<StarttestStudent />}
								exact
							/>
						</Route>
						<Route path="/submittestStudent" element={<ProtectedRoute />} exact>
							<Route
								path="/submittestStudent"
								element={<SubmittestStudent />}
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
									/>
								}
								exact
							/>
						</Route>

						<Route path="/addcandidateAdmin" element={<ProtectedRoute />} exact>
							<Route
								path="/addcandidateAdmin"
								element={<AddcandidateAdmin />}
								exact
							/>
						</Route>
						<Route path="/addexamAdmin" element={<ProtectedRoute />} exact>
							<Route path="/addexamAdmin" element={<AddexamAdmin />} exact />
						</Route>

						<Route path="/addquestionAdmin" element={<ProtectedRoute />} exact>
							<Route
								path="/addquestionAdmin"
								element={<AddquestionAdmin />}
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
