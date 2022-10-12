import React, { useRef } from "react";
import Navbar from "./../../Common/Navbar_Student";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../../Common/Footer";
import { useScreenshot } from "use-screenshot-hook";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Confirmpresence() {
	const { isLoading, image, takeScreenshot, clear } = useScreenshot();
	const { status, startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({ screen : true});
	const ref = useRef(null);

	const getImage = () => {
		clear();
		takeScreenshot("jpg", {
			backgroundColor: "white",
		});
	};

	const downloadImage = () => {
		let a = document.createElement("a");
		a.href = image;
		a.download = "Screenshot.png";
		a.click();
	};

	return (
		<div>
			<Navbar />
			<div style={{ padding: "2%" }}>
				<center>
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
								Test 001
							</Typography>
							<br />
							<p style={{ marginTop: "0", textAlign: "justify" }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
								in reprehenderit in voluptate velit esse cillum dolore eu fugiat
								nulla pariatur
							</p>
							<br />
							<br />
							<br />
							<Typography variant="body2" color="text.secondary">
								{isLoading ? (
									<div>Loading...</div>
								) : (
									<div>
										{/* {isError && <p>Error</p>} */}
										<div ref={ref} />
										{image && (
											<img
												style={{ width: "30em" }}
												src={image}
												alt={"Screenshot"}
											/>
										)}
										<br />
										<Button
											variant="contained"
											style={{ backgroundColor: "#7882BD", margin: "1em" }}
											onClick={getImage}
										>
											Start Exam
										</Button>
										<Button
											variant="contained"
											style={{ backgroundColor: "#7882BD", margin: "1em" }}
											onClick={() => {
												image && downloadImage();
											}}
										>
											Download Image
										</Button>
									</div>
								)}
								<br />
								<div>
									<p>{status}</p>
									<button onClick={startRecording}>Start Recording</button>
									<button onClick={stopRecording}>Stop Recording</button>
									<video style={{width : "30em"}} src={mediaBlobUrl} controls autoPlay loop />
								</div>
							</Typography>
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
