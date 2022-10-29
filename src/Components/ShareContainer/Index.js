import React, { useState, useEffect } from "react";
import Camera from "./Camera";
import Screen from "./Screen";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
}) {
	console.log(screeStatus, cameraStatus);
	const navigate = useNavigate();
	const [alloted_test, setAllotedTest] = useState(null);
	const [is_attempted, setIsAttempted] = useState(false);
	const [previous_submission, setPreviousSubmission] = useState(null);
	const [number_of_attempts, setNumberOfAttempts] = useState(0);
	const { id } = useParams();
	// const [screeShare, setScreenShare] = useState(null);
	// const [cameraShare, setCameraShare] = useState(null);
	// const [isClicked, setClicked] = useState(false);
	useEffect(() => {
		axios
			.get(`http://localhost:5000/test/${id}`)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					let data = res.data;
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
			});
	}, [id]);

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user_id"));
		console.log(user);
		axios
			.get(`http://localhost:5000/attempts/group/${user}/${id}`)
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
			await axios
				.patch(`/attempts/groups/${previous_submission._id}`, data)
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						localStorage.setItem(
							"attempted_group_id",
							JSON.stringify(res.data._id),
						);
						navigate("/testStudent/1");
						// window.location = "/testStudent/1"
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			await axios
				.post("/attempts/create-group", data)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						localStorage.setItem(
							"attempted_group_id",
							JSON.stringify(res.data._id),
						);
						// window.location = "/testStudent/1"
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		let submitted_question = JSON.parse(
			localStorage.getItem("submitted_questions_id"),
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
			await axios
				.post("http://localhost:5000/attempts", d)
				.then((res) => {
					if (res.status === 200) {
						console.log(res.data);
						navigate("/testStudent/1");
						localStorage.setItem("attempt_id", JSON.stringify(res.data._id));
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log("sdfkjsk");
			navigate("/testStudent/1");
		}
	};
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
							{"Share"}
						</Typography>
						<br />
						<p style={{ marginTop: "0", textAlign: "justify" }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur
						</p>
						<br />
						<br />
						<br />
						<div
							style={{
								display: "flex",
							}}
						>
							<Screen
								startRecording={startScreenRecording}
								setMediaBlob={setScreenShare}
								mediaBlobUrl={mediaScreenBlob}
								stopRecording={stopScreenSharing}
								isClicked={isClicked}
								enable={screeStatus === "acquiring_media"}
							/>
							<Camera
								startRecording={startCameraRecording}
								setCameraBlob={setCameraShare}
								mediaBlobUrl={mediaCameraBlob}
								stopRecording={stopCamera}
								isClicked={isClicked}
								enable={cameraStatus === "acquiring_media"}
							/>
							<Button
								variant="contained"
								onClick={() => {
									if(screeStatus === "recording" && cameraStatus === "recording"){
										console.log("Recording....")
										startExam();
									}
								}}
								// enabled={
								// 	screeStatus !== "recording" && cameraStatus !== "recording"
								// }
							>
								Continue Exam
							</Button>
						</div>
					</CardContent>
					{/* <CardActions>
<Button size="small">Share</Button>
<Button size="small">Learn More</Button>
</CardActions> */}
				</Card>
			</div>
		</>
	);
}
