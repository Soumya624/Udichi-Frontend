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

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjE3ZjNhZDI4NDdhMjVhYjc3ODNjNSIsImZpcnN0bmFtZSI6IlNvdW15YSIsImxhc3RuYW1lIjoiVGFyYWZkZXIiLCJmYXRoZXJuYW1lIjoiTm9uZSIsImFhZGhhcm51bWJlciI6IiQyYiQxMCRpazVZbGlra3NQRFV2Y2t0Ykh5bGpPejJ4R3NSLmxpaXBGNHNwbG16UTBiSUkyMDBLLnVQTyIsImVtYWlsIjoic291bXlhdGFyYWZkZXI2MjRAZ21haWwuY29tIiwidXNlcm5hbWUiOiJzb3VteWF0YXJhZmRlcjYyNEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRpazVZbGlra3NQRFV2Y2t0Ykh5bGpPWk1yM3VxWWUzZVhYYlpGMDRLVUFHQlNNRFhLMHd6dSIsIm1vYmlsZSI6IjYyOTA4MTkzNjciLCJ0ZWxlcGhvbmUiOiIxMjM0NTY3OCIsInN0cmVldCI6IjIvMSBSSyBQYWwgTGFuZSwgS29sa2F0YSIsImNpdHkiOiJLb2xrYXRhIiwic3RhdGUiOiJXZXN0IEJlbmdhbCIsImNvdW50cnkiOiJJbmRpYSIsInppcCI6IjcwMDA3NSIsInVzZXJ0eXBlIjoic3R1ZGVudCIsIl9fdiI6MH0sImlhdCI6MTY2NzMzMzk4NCwiZXhwIjoxNjY3MzM3NTg0fQ.7vlC59XHjIkXoLnEokW21O1KkaJG-evHaiUAMuJ2y4c";
let user_id = "63617f3ad2847a25ab7783c5";

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
