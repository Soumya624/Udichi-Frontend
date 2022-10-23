import React, { useEffect } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";
import axios from "axios";
import { useState } from "react";
// 6352ac7eee578c61f13ec293

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

let token = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGUiOnsiX2lkIjoiNjM1MmFjN2VlZTU3OGM2MWYxM2VjMjkzIiwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiYWFkaGFybnVtYmVyIjoiJDJiJDEwJGNNQ0pER2IwU0toQ3A0d2tZa1lLdU9ja1hLRVhvL0NJY1RpNHh4V0k5NXJBbklVUU41anNlIiwiZW1haWwiOiJ0QGFiYy5jby5pbiIsInVzZXJuYW1lIjoiYW9mamFmIiwicGFzc3dvcmQiOiIkMmIkMTAkY01DSkRHYjBTS2hDcDR3a1lrWUt1TzNYb3g5L3RVTjhjSHZFZ1NSeXFma1EyRy5VQktGOS4iLCJtb2JpbGUiOiI5ODc2NTQzMjEwIiwidGVsZXBob25lIjoiMTIzNDU2NzgiLCJ1c2VydHlwZSI6IkNhbmRpZGF0ZSIsImNhbmRpZGF0ZV9ncm91cCI6IjYzNTJhYzYzZWU1NzhjNjFmMTNlYzI5MCIsImFsbG90ZWRfdGVzdCI6WyI2MzUyYWNjMWVlNTc4YzYxZjEzZWMyOWMiLCI2MzUyYWQxZDliNjBlOTZjZDk4YTEyMTEiLCI2MzUyYWQyNTliNjBlOTZjZDk4YTEyMTgiLCI2MzUyYWQ1NmVjMTkzZjg0MWNiZGRhODAiLCI2MzUyYWQ2MWNhYmE5MGUzM2YwMDhlNzUiLCI2MzUyYjU3MzFmZmJkNDlkYTY4M2E0ZDEiLCI2MzUzNzdlOTViZWNiZGE2NDhmMmQzNWMiXSwiYXR0ZW1wdGVkX3Rlc3QiOltdLCJfX3YiOjB9LCJpYXQiOjE2NjY1MzgzNTQsImV4cCI6MTY2NjU0MTk1NH0.7Rxj5cRRa3AawUIbB8PmntA1zC3bLqmyuCeF-FFhTOs"
let user_id = "6352ac7eee578c61f13ec293";

const config = {
	headers: { Authorization: `Bearer ${token} ${user_id}` },
};

export default function Index() {
	const [alloted_tests, setAllotedTest] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/candidate/alloted_test/", config)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data)
					localStorage.setItem("user_id",JSON.stringify(res.data._id))
					setAllotedTest(res.data.alloted_test);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<Navbar />
			<div style={{ padding: "5%" }}>
				<br />
				<br />
				<br />
				<h4 style={{ textAlign: "left", fontSize: "28px", lineHeight: "1px" }}>
					Welcome!
				</h4>
				<p style={{ lineHeight: "1px" }}>
					Want to View{" "}
					<a href="#" style={{ textDecoration: "none" }}>
						Your Account?
					</a>
				</p>
				<br />
				<br />
				<br />
				{alloted_tests.map((altst) => {
					return (
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							gap={2}
							style={{ alignItems: "center", justifyContent: "center", margin : "10px 0" }}
						>
							<Box gridColumn="span 12">
								<Item
									style={{ padding: "1.5%", borderLeft: "2rem solid #7882bd" }}
								>
									<h3 style={{ textAlign: "left" }}>{altst.title}</h3>
									<Box
										display="grid"
										gridTemplateColumns="repeat(12, 1fr)"
										gap={1}
										style={{ alignItems: "center", justifyContent: "center" }}
									>
										<Box gridColumn="span 3" style={{ textAlign: "left" }}>
											{altst.available_window}
										</Box>
										<Box gridColumn="span 3">June'21 to July'21</Box>
										<Box
											gridColumn="span 3"
											style={{ color: "red", cursor: "pointer" }}
										>
											View Results
										</Box>
										<Box
											gridColumn="span 3"
											style={{
												textAlign: "right",
												color: "#7882bd",
												cursor: "pointer",
											}}
										>
											<a
												href={`/starttestStudent/${altst._id}`}
												style={{ textDecoration: "none" }}
											>
												Attempt Now
											</a>
										</Box>
									</Box>
								</Item>
							</Box>
						</Box>
					);
				})}
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<Footer />
		</div>
	);
}
