import React, { useEffect } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";
// 6352ac7eee578c61f13ec293

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGUiOnsiX2lkIjoiNjM1NTQwZGI2YTcxOGZmYmUzOTQwNjdhIiwiZmlyc3RuYW1lIjoiamhmc2RqZmhqIiwibGFzdG5hbWUiOiJhbmRiZndlIiwiYWFkaGFybnVtYmVyIjoiJDJiJDEwJGN6TW9PZGNrNC44QkFSSWNTWFM5MWVJMUs3THlzWnRBS0d3R2VOV01sTWpUZERUTC9JZFpXIiwiZW1haWwiOiIxMjM0QGcuY29tIiwidXNlcm5hbWUiOiIxMjM0QGcuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkY3pNb09kY2s0LjhCQVJJY1NYUzkxZWtCTllHMnlEQ3dhaVluR3Z2ay9vVGlnbkRWcll4QWUiLCJtb2JpbGUiOiIxNzM3Njk3MzY5IiwidGVsZXBob25lIjoiNjQ3MTQ5MTc0NjkxNCIsInVzZXJ0eXBlIjoiQ2FuZGlkYXRlIiwiY2FuZGlkYXRlX2dyb3VwIjoiNjM1MDM2MjFmY2RkMzBmNWVmYTA5ZTliIiwiYWxsb3RlZF90ZXN0IjpbIjYzNTU0MjdmNmE3MThmZmJlMzk0MDY4MiIsIjYzNTU0NWIxNmE3MThmZmJlMzk0MDcyZSIsIjYzNTU4YThmNmE3MThmZmJlMzk0MGE2ZiJdLCJhdHRlbXB0ZWRfdGVzdCI6W10sIl9fdiI6MH0sImlhdCI6MTY2NzAzNTg1NywiZXhwIjoxNjY3MDM5NDU3fQ.w6E2AIoV8YuRYUCDCQHGZy9y0nlVgmaBWKpoehBgL8c"
let user_id = "635540db6a718ffbe394067a";

const config = {
	headers: { Authorization: `Bearer ${token} ${user_id}` },
};

export default function Index() {
	const [alloted_tests, setAllotedTest] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/candidate/alloted_test/", config)
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
										<Box gridColumn="span 3">{altst.starting_date}</Box>
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
