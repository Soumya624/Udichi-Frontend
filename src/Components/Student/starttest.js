import React, { useRef, useState } from "react";
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
import { useScreenshot, createFileName } from "usescreenshot-react";
import { saveAs } from "file-saver";

export default function Confirmpresence() {
  const { image, takeScreenshot, isLoading, isError } = useScreenshot();
  const ref = useRef(null);

  const getImage = () => {
    if (!ref.current) {
      return;
    }
    takeScreenshot(ref.current, {
      backgroundColor: null,
      logging: false,
    }).catch(console.log);
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
                    {isError && <p>Error</p>}
                    <div ref={ref} />
                    {image && <img src={image} alt={"Screenshot"} />}
                    <br />
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "50%" }}
                      onClick={getImage}
                    >
                      Start Exam
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "50%" }}
                      onClick={() =>
                        saveAs(image, createFileName("png", "example"))
                      }
                    >
                      Download Hidden Files
                    </Button>
                  </div>
                )}

                <br />
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
