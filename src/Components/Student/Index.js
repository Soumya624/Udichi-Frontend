import React, { useEffect } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";
import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import moment from "moment";
// 6352ac7eee578c61f13ec293

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function Index() {
	let token = getCookie("access_token");
	let user_id = JSON.parse(localStorage.getItem("user"))._id;

	const config = {
		headers: { Authorization: `Bearer ${token} ${user_id}` },
	};
	const [alloted_tests, setAllotedTest] = useState([]);

	useEffect(() => {
		axiosInstance
			.get("/candidate/alloted_test/", config)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					localStorage.setItem("user_id", JSON.stringify(res.data._id));
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
					let momentDate =  moment.utc(altst.starting_date).format('MM/DD/YY, h:mm:ss a')
					return (
						<Box
							display="grid"
							gridTemplateColumns="repeat(12, 1fr)"
							gap={2}
							style={{
								alignItems: "center",
								justifyContent: "center",
								margin: "10px 0",
							}}
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
											Duration: {altst.available_window} mins
										</Box>
										<Box gridColumn="span 6">{momentDate}</Box>
										{/* <Box
											gridColumn="span 3"
											style={{ color: "red", cursor: "pointer" }}
										>
											View Results
										</Box> */}
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
