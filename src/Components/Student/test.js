import React, { useRef, useEffect } from "react";
import Navbar from "./../../Common/Navbar_Student";
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
import Footer from "../../Common/Footer";
import Fab from "@mui/material/Fab";
import { useScreenshot } from "use-screenshot-hook";
import { useReactMediaRecorder } from "react-media-recorder";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Box, CircularProgress, FormLabel, Modal } from "@mui/material";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import { duration } from "moment/moment";
import Countdown from "react-countdown";
import Speech from "react-speech";

const textstyle = {
	play: {
		hover: {
			backgroundColor: "black",
			color: "white",
		},
		button: {
			padding: "4",
			fontFamily: "Helvetica",
			fontSize: "1.0em",
			cursor: "pointer",
			pointerEvents: "none",
			outline: "none",
			backgroundColor: "inherit",
			border: "none",
		},
	},
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function Confirmpresence({
	screeShare,
	cameraShare,
	stopScreenSharing,
	stopCamera,
	setClicked,
	error,
	setError,
	multipleFace,
	zipfileUploadLoader,
	setZipFileUploadLoader,
	zipfile
}) {
	let token = getCookie("access_token");
	let user = JSON.parse(localStorage.getItem("user"));

	const config = {
		headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
	};

	console.log(screeShare, cameraShare);
	const navigate = useNavigate();
	let submitted_questions_id = JSON.parse(
		localStorage.getItem("submitted_questions_id"),
	);
	let questions_id = JSON.parse(localStorage.getItem("questions_id"));

	let question_stored = JSON.parse(localStorage.getItem("questions"));
	const { id } = useParams();
	const [open, setOpen] = useState(false);
	const [questions, setQuestion] = useState(question_stored);
	const [submitted_options, setSubmittedOptions] = useState([]);
	const [submission_id, setSubmissionId] = useState(null);
	const [is_attempted, setIsAttempted] = useState(false);
	const [subjective_ans, setSubjectAnswer] = useState("");
	const [timer, setTimer] = useState(null);

	let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
	// if(attempt_id===null)
	// {
	// 	window.location.reload();
	// }
	useEffect(() => {
		let questions = JSON.parse(localStorage.getItem("questions"));
		setQuestion(questions);

		let test = JSON.parse(localStorage.getItem("test_id"));
		let durations = JSON.parse(localStorage.getItem("duration"));
		console.log(durations);
		if (timer === null) {
			setTimer(durations);
		} else {
			setTimer(timer);
		}
		console.log(timer);
		let user = JSON.parse(localStorage.getItem("user_id"));
		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		console.log(attempt_id);
		// let questions = JSON.parse(localStorage.getItem("questions"));
		let qId = parseInt(id);
		const question_data = questions[qId - 1];
		// /check/:test/:question/:candidate
		axiosInstance
			.get(
				`/question_submission/check/${test}/${question_data._id}/${user}/${attempt_id}`,
				config,
			)
			.then((res) => {
				if (res.status === 200) {
					setSubjectAnswer(res.data.subjective_answer);
					setIsAttempted(true);
					setSubmissionId(res.data._id);
					setSubmittedOptions(res.data.options_marked);
				}
			})
			.catch((err) => {
				console.log(err);
				// if (err.response.status !== 404) setError("Error occurred! Please Try Again.....");
				setTimeout(() => {
					setError(null);
				}, 1000);
			});
	}, [id]);
	// timer=durations;
	console.log(timer);
	// setTimer(durations);
	// let time = timer;
	// console.log(time);
	// setTimeout(() => {
	//   localStorage.setItem("duration", JSON.stringify(timer - 1));
	// }, 1000);

	// console.log(questions)

	// const { isLoading, image, takeScreenshot, clear } = useScreenshot();
	// const { status, startRecording, stopRecording, mediaBlobUrl } =
	// 	useReactMediaRecorder({ screen: true });
	// const ref = useRef(null);

	// const getImage = () => {
	// 	clear();
	// 	takeScreenshot("jpg", {
	// 		backgroundColor: "white",
	// 	});
	// };

	// const downloadImage = () => {
	// 	let a = document.createElement("a");
	// 	a.href = image;
	// 	a.download = "Screenshot.png";
	// 	a.click();
	// };
	// useEffect(()=>{
	// 	console.log("akjfbdfk",submitted_options)
	// },[submitted_options])

	let qId = parseInt(id);
	console.log(qId);
	// if (!questions) return <h1>Loading..</h1>;
	const question_data = questions[qId - 1];
	// console.log(question_data);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const saveAndNext = () => {
		let test = JSON.parse(localStorage.getItem("test_id"));
		let user = JSON.parse(localStorage.getItem("user_id"));
		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		let data = {
			question: question_data._id,
			test: test,
			candidate: user,
			options_marked: submitted_options,
			subjective_answer: subjective_ans,
			attempt_id: attempt_id,
		};
		if (is_attempted) {
			axiosInstance
				.patch(`/question_submission/${submission_id}`, data, config)
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						setSubjectAnswer("");
						navigate(`/testStudent/${(qId % questions.length) + 1}`);
					}
				})
				.catch((err) => {
					console.log(err);
					setError("Error occurred! Please Try Again.....");
					setTimeout(() => {
						setError(null);
					}, 1000);
				});
		} else {
			axiosInstance
				.post("/question_submission", data, config)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						let submitted_qs = JSON.parse(
							localStorage.getItem("submitted_questions_id"),
						);
						let qs = JSON.parse(localStorage.getItem("questions_id"));
						if (qs) {
							localStorage.setItem(
								"questions_id",
								JSON.stringify(qs.concat([res.data.question])),
							);
						} else {
							localStorage.setItem(
								"questions_id",
								JSON.stringify([res.data.question]),
							);
						}
						if (submitted_qs) {
							localStorage.setItem(
								"submitted_questions_id",
								JSON.stringify(submitted_qs.concat([res.data._id])),
							);
						} else {
							localStorage.setItem(
								"submitted_questions_id",
								JSON.stringify([res.data._id]),
							);
						}
						setSubjectAnswer("");
						navigate(`/testStudent/${(qId % questions.length) + 1}`);
					}
				})
				.catch((err) => {
					setError("Error occurred! Please Try Again.....");
					setTimeout(() => {
						setError(null);
					}, 1000);
				});
		}
	};

	const submittedTest = async () => {
		setClicked(true);
		let submitted_question = JSON.parse(
			localStorage.getItem("submitted_questions_id"),
		);
		let test = JSON.parse(localStorage.getItem("test_id"));
		let user = JSON.parse(localStorage.getItem("user_id"));

		let data = {
			test: test,
			candidate: user,
			multipleFace: multipleFace,
			questions_submitted: submitted_question,
		};

		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		await axiosInstance
			.patch(`/attempts/${attempt_id}`, data, config)
			.then((res) => {
				if (res.status === 200) {
				}
			})
			.catch((err) => {
				setError("Error occurred! Please Try Again.....");
				setTimeout(() => {
					setError(null);
				}, 1000);
			});

		let d = {
			attempts_submitted: attempt_id,
			multipleFace: multipleFace,
		};
		let attempt_group = JSON.parse(localStorage.getItem("attempted_group_id"));
		let proctoring = JSON.parse(localStorage.getItem("proctoring"));
		await axiosInstance
			.patch(`/attempts/add/${attempt_group}`, d, config)
			.then(async (res) => {
				console.log(res);
				if (res.status === 201) {
					if (!proctoring) {
						localStorage.removeItem("submitted_questions_id");
						localStorage.removeItem("questions_id");
						localStorage.removeItem("duration");
						localStorage.removeItem("attempt_id");
						
						// navigate(`/starttestStudent/${test}`);
						window.location = "/dashboardStudent";
					}
					if(proctoring){
						stopCamera()
						stopScreenSharing()
						await zipfile(cameraShare,screeShare)
					}
				}
			})
			.catch((err) => {
				console.log(err);
				setError("Error occurred! Please Try Again.....");
				setTimeout(() => {
					setError(null);
				}, 1000);
			});
	};

	// Get the duration from local storage
	const duration = localStorage.getItem("duration");

	// Initialize state variables to keep track of the time remaining
	// and whether the timer has expired
	const [timeRemaining, setTimeRemaining] = useState(duration);
	const [isExpired, setIsExpired] = useState(false);

	// Update the time remaining every 1000ms (1 second)
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(timeRemaining - 1000);

			// If the time remaining has reached 0, the timer has expired
			if (timeRemaining === 0) {
				setIsExpired(true);
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (isExpired) {
				document.getElementById("expired-button").click();
				clearInterval(intervalId);
			}
		}, 1000);
		return () => clearInterval(intervalId);
	}, [isExpired]);

	if (zipfileUploadLoader) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100vw",
					height: "100vh",
          flexDirection : "column"
				}}
			>
				<CircularProgress />
        <p><span>Do not close the window</span></p>
			</div>
		);
	}

	return (
		<div>
			<Navbar />
			<div style={{ padding: "1%" }}>
				<center>
					<Card
						sx={{ maxWidth: 800 }}
						style={{
							alignItems: "center",
							justifyContent: "center",
							marginTop: "5rem",
							padding: "2%",
						}}
					>
						<CardContent>
							<Grid container spacing={1} style={{ padding: "1%" }}>
								<Grid item xs={4} style={{ textAlign: "left" }}>
									<p>
										{!question_data.is_objective
											? "Fill in The Blanks Question"
											: "Multiple Correct Questions"}
									</p>
								</Grid>
								{/* <Countdown
                    date={Date.now() + timer}
                    onTick={(e) => {
                      localStorage.setItem("duration", JSON.stringify(timer-1));
                    }}
                  >
                    <p>End Now</p>
                    
                  </Countdown> */}

								<Grid item xs={4}>
									{/* <Countdown
                    date={Date.now() + timer}
                    onTick={(e) => {
                      localStorage.setItem(
                        "duration",
                        JSON.stringify(timer - 1)
                      );
                    }}
                  >
                    <p>End Now</p>
                  </Countdown> */}
									<div>
										{/* Display the time remaining */}
										<p>{`${Math.floor(
											timeRemaining / 1000 / 3600,
										)}:${Math.floor(
											((timeRemaining / 1000) % 3600) / 60,
										)}:${Math.floor(((timeRemaining / 1000) % 3600) % 60)}`}</p>

										{/* If the timer has expired, show a message */}
										{isExpired && <p style={{ color: "red" }}>Time's Up</p>}
									</div>
									{/* <p>Remaining Time: {timer / 60 / 1000} mins.</p> */}
								</Grid>
								<Grid item xs={4} style={{ textAlign: "right" }}>
									<p>
										+{question_data.positive_marks} For Correct/-
										{question_data.negative_marks} For Wrong
									</p>
								</Grid>
							</Grid>
							<Grid container spacing={2} style={{ padding: "1%" }}>
								<Grid item sm={9}>
									<h4 style={{ textAlign: "center" }}>Question {qId}</h4>
									<p style={{ textAlign: "justify", alignItems: "center" }}>
										{question_data.title}{" "}
										{/* <Speech styles={textstyle} text={question_data.title} /> */}
									</p>

									{question_data.is_objective ? (
										<div>
											{question_data.options.map((op) => (
												<>
													<Checkbox
														inputProps={{ "aria-label": "controlled" }}
														onChange={(e) => {
															if (e.target.checked) {
																setSubmittedOptions(
																	submitted_options.concat([op._id]),
																);
															} else {
																setSubmittedOptions(
																	submitted_options.filter((s) => s !== op._id),
																);
															}
														}}
														checked={submitted_options.indexOf(op._id) !== -1}
													/>
													<FormLabel>{op.title}</FormLabel>
												</>
											))}
										</div>
									) : (
										<TextField
											id="standard-basic"
											label="Write Your Answer"
											variant="standard"
											style={{ width: "100%" }}
											value={subjective_ans}
											onChange={(e) => {
												setSubjectAnswer(e.target.value);
											}}
										/>
									)}
									<br />
									<br />
									<br />
									<br />
									<br />
									<br />
									<br />
									<br />
									<br />
									<br />
									<Grid container spacing={1} style={{ padding: "1%" }}>
										<Grid item sm={6}>
											<Button
												style={{
													backgroundColor: "#70ff00",
													color: "black",
													boxShadow: "none",
													fontSize: "10px",
													width: "100%",
													// border: "1px solid black",
												}}
												onClick={saveAndNext}
											>
												Save & Next
											</Button>
										</Grid>
										{/* <Grid item sm={3}>
                      <Button
												style={{
													backgroundColor: "#07a8a0",
													color: "white",
													boxShadow: "none",
													fontSize: "10px",
													width: "100%",
													border: "1px solid black",
												}}
											>
												Review & Next
											</Button>
                    </Grid>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={3}>
                      <Button
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          boxShadow: "none",
                          fontSize: "10px",
                          width: "100%",
                          border: "1px solid #bcbcbc",
                        }}
                        disabled
                      >
                        Clear Response
                      </Button>
                    </Grid> */}
										<Grid item sm={6}>
											<Button
												style={{
													backgroundColor: "rgb(120 130 189)",
													color: "white",
													boxShadow: "none",
													fontSize: "10px",
													width: "100%",
													// border: "1px solid black",
												}}
												id="expired-button"
												onClick={async () => {
													await saveAndNext();
													handleOpen();
													// await submittedTest();
												}}
												// onClick={() => {
												//   image && downloadImage();
												// }}
												// onClick={stopRecording}
												// href={mediaBlobUrl}
												// download
												target="_blank"
											>
												Submit
											</Button>
										</Grid>
									</Grid>
								</Grid>
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<Typography
											id="modal-modal-title"
											variant="h6"
											component="h2"
										>
											<center>
												{attempt_id ? "CONTINUE THE TEST" : "SUBMIT THE TEST"}
											</center>
										</Typography>
										<center>
											<Typography id="modal-modal-description" sx={{ mt: 2 }}>
												Do You Want to Submit the Test?
											</Typography>
										</center>
										<br />
										<center>
											<Button onClick={handleClose}>Cancel</Button>
											<Button onClick={submittedTest}>Confirm</Button>
										</center>
									</Box>
								</Modal>
								<Grid item sm={3}>
									<Grid container spacing={1} style={{ padding: "1%" }}>
										{questions.map((ques, ind) => (
											<Grid item xs={4}>
												<Fab
													title={ques._id}
													size="small"
													style={{
														backgroundColor:
															questions_id &&
															questions_id.indexOf(ques._id) !== -1
																? "#6bff6b"
																: "white",
														color: "black",
														border: "1px solid black",
														boxShadow: "none",
														margin: "5px",
													}}
												>
													{ind + 1}
												</Fab>
											</Grid>
										))}
									</Grid>
									{/* <video style={{width : "30em"}} src={mediaBlobUrl} controls autoPlay loop /> */}
								</Grid>
							</Grid>
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
