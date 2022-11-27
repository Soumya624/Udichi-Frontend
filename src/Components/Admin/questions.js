import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./../../Common/Navbar_Admin";
import Footer from "../../Common/Footer";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useEffect } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import "./style.css";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";

function createData(name, identity, section, type, action) {
	return { name, identity, section, type, action };
}

const rows = [
	createData(
		"What is Solid Mechanics?",
		159,
		"Mechatronics",
		"MCQ (Radio)",
		"View Details",
	),
	createData(
		"What is Soft Computing?",
		237,
		"Mechatronics",
		"MCQ (Radio)",
		"View Details",
	),
	createData(
		"What is OS?",
		262,
		"Operating System",
		"MCQ (Radio)",
		"View Details",
	),
	createData(
		"What is the decimal of 100?",
		305,
		"Operating System",
		"MCQ (Radio)",
		"View Details",
	),
	createData(
		"What is Octave Band?",
		356,
		"Sound and Vibration",
		"MCQ (Radio)",
		"View Details",
	),
];

// let token = getCookie("access_token")
// // let user = JSON.parse(localStorage.getItem("user"))

// let user = {
//   usertype : "teacher"
// }

// const config = {
// 	headers: { Authorization: `Bearer ${token}`, "user-type" : user.usertype },
// };

export default function BasicTable({error, setError}) {
	let token = getCookie("access_token");
	let user = JSON.parse(localStorage.getItem("user"));

	const config = {
		headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
	};
	const [quesgroup, setQuesgroup] = useState([]);

	useEffect(() => {
		getQuestions();
	}, []);

	function getQuestions() {
		axiosInstance
			.get("/question-group/", config)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					setQuesgroup(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				setError("Error occurred! Please Try Again.....");
				setTimeout(() => {
					setError(null);
				}, 1000);
			});
	}

	return (
		<div>
			<Navbar />
			<div style={{ margin: "5%" }}>
				<br />
				<br />
				<br />
				<h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
					Total Questions
				</h4>
				<p style={{ lineHeight: "1px" }}>
					Want to Add{" "}
					<a href="/addquestionAdmin" style={{ textDecoration: "none" }}>
						New Questions?
					</a>
					&nbsp;Or <a href="#" style={{ textDecoration: "none" }}>
						Upload File
					</a>
				</p>
				<br />
				<br />
				{quesgroup.map((key) => {
					return (
						<Collapsible trigger={key.title} style={{ padding: "2px" }}>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>
												<b>Title</b>
											</TableCell>
											<TableCell align="right">
												<b>ID of Question</b>
											</TableCell>

											<TableCell align="right">
												<b>Type</b>
											</TableCell>
											<TableCell align="right">
												<b>Action</b>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{key.questions.map((x) => (
											<TableRow
												key={x._id}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{x.title}
												</TableCell>
												<TableCell align="right">{x._id}</TableCell>

												<TableCell align="right">
													{x.is_objective === false
														? "Fill in the Blanks"
														: "MCQ"}
												</TableCell>
												<TableCell
													align="right"
													style={{ cursor: "pointer", color: "red" }}
												>
													Delete
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Collapsible>
					);
				})}
				<br />
				<br />
			</div>
			<Footer />
		</div>
	);
}
