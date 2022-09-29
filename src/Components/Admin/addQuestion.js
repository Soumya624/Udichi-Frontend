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

const Input = () => {
  return (
    <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
      <Grid item xs={8}>
        <TextField
          id="outlined-basic"
          label="Type Option"
          variant="outlined"
          size="small"
          style={{ width: "98.5%" }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel control={<Checkbox />} label="Is Correct" />
      </Grid>
    </Grid>
  );
};

export default function AddCandidate() {
  const [type, setType] = useState("");
  const [section, setSection] = useState("");
  const [inputList, setInputList] = useState([]);

  const onAddBtnClick = (event) => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleChange1 = (event) => {
    setSection(event.target.value);
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
                Add Question
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Type Your Question"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Marks"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <center>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ marginBottom: "10%" }}
                        >
                          Question Type
                        </InputLabel>
                        <center>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Candidate Group"
                            onChange={handleChange}
                            size="small"
                            style={{ width: "98.5%", padding: "2.5%" }}
                          ></Select>
                        </center>
                      </FormControl>
                    </center>
                  </Grid>
                  <Grid item xs={6}>
                    <center>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          style={{ marginBottom: "15%" }}
                        >
                          Select Section
                        </InputLabel>
                        <center>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={section}
                            label="Candidate Group"
                            onChange={handleChange1}
                            size="small"
                            style={{ width: "98.5%", padding: "2.5%" }}
                          ></Select>
                        </center>
                      </FormControl>
                    </center>
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Add Explanation"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={1} style={{ marginLeft: "1%" }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#7882BD" }}
                    onClick={onAddBtnClick}
                  >
                    Add Option
                  </Button>
                </Grid>
                <br/>
                <div>{inputList}</div>
                <br />
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  href="/questionAdmin"
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
