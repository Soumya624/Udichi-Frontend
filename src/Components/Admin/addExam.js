import React, { useState } from "react";
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
import Navbar from "./../../Common/Navbar_Admin";
import Footer from "../../Common/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

export default function AddCandidate() {
  const [age, setAge] = useState("");
  const [flag, setFlag] = useState(true);

  const handleChange = (event) => {
    setAge(event.target.value);
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
                Add Exam
              </Typography>
              <br />

              <Typography variant="body2" color="text.secondary">
                <br />
                <p
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Enter Exam Information</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Exam Name"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Duration"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Negetive Marks"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <br />
                <FormControl>
                  <RadioGroup row name="row-radio-buttons-group">
                    <FormControlLabel
                      value="Always Available"
                      control={<Radio />}
                      label="Always Available"
                    />
                    <FormControlLabel
                      value="Available On Specific Time"
                      control={<Radio/>}
                      label="Available On Specific Time"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Grid
                  container
                  spacing={1}
                  style={{ marginTop: "0.5%", display: flag ? "" : "none" }}
                >
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Start Date & Time"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="End Date & Time"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
                <br />
                <p
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Specify Who Can Take This Exam</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Assign Groups
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Assign Candidates
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <p
                  style={{ borderBottom: "1px solid grey", textAlign: "left" }}
                >
                  <b>Specify Number of Questions</b>
                </p>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", width: "100%" }}
                      href="#"
                    >
                      Specify & Add
                    </Button>
                  </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <p>(Specify Start & End Date/Time, If The Exam is Not Always Available)</p>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  href="/examAdmin"
                >
                  Continue
                </Button>
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
