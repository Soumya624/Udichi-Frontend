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
import { Box, FormLabel, Modal } from "@mui/material";
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
  };
export default function Confirmpresence({screeShare,cameraShare,stopScreenSharing,stopCamera,setClicked}) {
	console.log(screeShare,cameraShare)
	const navigate = useNavigate();
	let submitted_questions_id = JSON.parse(localStorage.getItem("submitted_questions_id"))
	let questions_id = JSON.parse(localStorage.getItem("questions_id"))

	let question_stored = JSON.parse(localStorage.getItem("questions"));
	const { id } = useParams();
	const [open, setOpen ] = useState(false)
	const [questions, setQuestion] = useState(question_stored);
	const [submitted_options, setSubmittedOptions] = useState([]);
	const [submission_id, setSubmissionId] = useState(null);
	const [is_attempted, setIsAttempted] = useState(false);
	const [subjective_ans, setSubjectAnswer] = useState("");

	let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
	useEffect(() => {
		let questions = JSON.parse(localStorage.getItem("questions"));
		setQuestion(questions);

		let test = JSON.parse(localStorage.getItem("test_id"));
		let user = JSON.parse(localStorage.getItem("user_id"));
		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		// let questions = JSON.parse(localStorage.getItem("questions"));
		let qId = parseInt(id);
		const question_data = questions[qId - 1];
		// /check/:test/:question/:candidate
		axios
			.get(
				`http://localhost:5000/question_submission/check/${test}/${question_data._id}/${user}/${attempt_id}`,
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
			});
	}, [id]);

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
			axios
				.patch(
					`http://localhost:5000/question_submission/${submission_id}`,
					data,
				)
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						setSubjectAnswer("");
						navigate(`/testStudent/${(qId % questions.length) + 1}`);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.post("http://localhost:5000/question_submission", data)
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						let submitted_qs = JSON.parse(
							localStorage.getItem("submitted_questions_id"),
						);
						let qs = JSON.parse(localStorage.getItem("questions_id"))
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
				});
		}
	};

	const submittedTest = async () => {
		setClicked(true)
		let submitted_question = JSON.parse(
			localStorage.getItem("submitted_questions_id"),
		);
		let test = JSON.parse(localStorage.getItem("test_id"));
		let user = JSON.parse(localStorage.getItem("user_id"));

		let data = {
			test: test,
			candidate: user,
			questions_submitted: submitted_question,
		};

		let attempt_id = JSON.parse(localStorage.getItem("attempt_id"));
		await axios
			.patch(`http://localhost:5000/attempts/${attempt_id}`, data)
			.then((res) => {
				if (res.status === 200) {
				}
			})
			.catch((err) => {
			});

		let d = {
			attempts_submitted: attempt_id,
		};
		let attempt_group = JSON.parse(localStorage.getItem("attempted_group_id"));
		await axios
			.patch(`http://localhost:5000/attempts/add/${attempt_group}`, d)
			.then((res) => {
				console.log(res);
				if (res.status === 201) {
					localStorage.removeItem("submitted_questions_id");
					localStorage.removeItem("questions_id")
					navigate(`/starttestStudent/${test}`);
				}
			})
			.catch((err) => {
				console.log(err);
			});

		};

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
											? "Fill in The Blacks Question"
											: "Multiple Correct Questions"}
									</p>
								</Grid>
								<Grid item xs={4} style={{ textAlign: "center" }}>
									<p>01:59:01</p>
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
									<p style={{ textAlign: "justify" }}>{question_data.title}</p>
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
										<Grid item sm={3}>
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
										<Grid item sm={3}>
											{/* <Button
												style={{
													backgroundColor: "#7882bd",
													color: "white",
													boxShadow: "none",
													fontSize: "10px",
													width: "100%",
													border: "1px solid black",
												}}
											>
												Review & Next
											</Button> */}
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
											>
												Clear Response
											</Button>
										</Grid>
										<Grid item sm={2}>
											<Button
												style={{
													backgroundColor: "rgb(120 130 189)",
													color: "white",
													boxShadow: "none",
													fontSize: "10px",
													width: "100%",
													// border: "1px solid black",
												}}
												onClick={async () => {
													await saveAndNext();
													handleOpen()
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
									<Box sx={style} >
										<Typography
											id="modal-modal-title"
											variant="h6"
											component="h2"
										>
											{attempt_id ? "CONTINUE THE TEST" : "SUBMIT THE TEST"}
										</Typography>
										<Typography id="modal-modal-description" sx={{ mt: 2 }}>
											Do you want to submit the test?
										</Typography>
										<Button onClick={handleClose} >Cancel</Button>
										<Button onClick={submittedTest}>Confirm</Button>
									</Box>
								</Modal>
								<Grid item sm={3}>
									<Grid container spacing={3} style={{ padding: "1%" }}>
										<Grid item sx={4}>
											{questions.map((ques, ind) => (
												<Fab
													// color = {}
													title ={ques._id}
													size = "small"
													style={{
														backgroundColor: (questions_id && questions_id.indexOf(ques._id) !== -1) ? "#6bff6b" : "white",
														color: "black",
														border: "1px solid black",
														boxShadow: "none",
														margin : "5px"
													}}
													// onClick={getImage}
													// onClick={startRecording}
												>
													{ind + 1}
												</Fab>
											))}
										</Grid>
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
