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
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

var arrayOption = [];

const Input = () => {
  const [opt, setOpt] = useState("");
  const [iscorrect, setIscorrect] = useState(false);

  async function add_option(e) {
    e.preventDefault();
    let data = {
      title: opt,
      is_correct: iscorrect,
    };
    axios
      .post("http://localhost:5000/options/", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          arrayOption.push(res.data.data._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
      <Grid item xs={5}>
        <TextField
          id="outlined-basic"
          label="Type Option"
          variant="outlined"
          size="small"
          style={{ width: "98.5%" }}
          onChange={(e) => {
            e.preventDefault();
            setOpt(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox />}
          label="Is Correct"
          onClick={(e) => {
            setIscorrect(!iscorrect);
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#7882BD", width: "50%" }}
          onClick={add_option}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default function AddCandidate() {
  const [group, setGroup] = useState("");
  const [type, setType] = useState("");
  const [section, setSection] = useState("");
  const [inputList, setInputList] = useState([]);
  const [title, setTitle] = useState("");
  const [positive, setPositive] = useState("");
  const [negetive, setNegetive] = useState("");
  const [qstype, setQstype] = useState("");
  const [option, setOption] = useState([]);
  const [assign, setAssign] = useState(false);
  const [create, setCreate] = useState(false);
  const [grptitle, setGrptitle] = useState("");
  const [questionid, setQuestionid] = useState("");
  const [quesgroup, setQuesgroup] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onAddBtnClick = (event) => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleChange1 = (event) => {
    setSection(event.target.value);
  };

  const handleChange2 = (event) => {
    setGroup(event.target.value);
  };

  async function create_ques(e) {
    e.preventDefault();
    if (type == "Des") {
      let data = {
        title: title,
        is_objective: false,
        positive_marks: positive,
        negative_marks: negetive,
      };
      axios
        .post("http://localhost:5000/questions/", data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            handleOpen();
            setQuestionid(res.data.data._id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let data = {
        title: title,
        is_objective: true,
        positive_marks: positive,
        negative_marks: negetive,
        options: arrayOption,
      };
      axios
        .post("http://localhost:5000/questions/", data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            handleOpen();
            setQuestionid(res.data.data._id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function create_questiongroup(e) {
    e.preventDefault();
    let data = {
      title: grptitle,
      questions: questionid,
    };
    axios
      .post("http://localhost:5000/question-group/", data)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assign_group() {
    setAssign(true);
    setCreate(false);
    getQuestions();
  }

  function create_group() {
    setCreate(true);
    setAssign(false);
  }

  function getQuestions() {
    axios
      .get("http://localhost:5000/question-group/")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setQuesgroup(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function assign_questiongroup(e) {
    e.preventDefault();
    let data = {
      title: group,
      questions: questionid,
    };
    axios
      .post("http://localhost:5000/question-group/", data)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                      onChange={(e) => {
                        e.preventDefault();
                        setTitle(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Positive Marks"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setPositive(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-basic"
                      label="Negetive Marks"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setNegetive(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <center>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          // style={{ marginBottom: "10%" }}
                        >
                          Question Type
                        </InputLabel>
                        <center>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Question Type"
                            onChange={handleChange}
                            size="small"
                            style={{ width: "98.5%", paddingBottom: "2%" }}
                          >
                            <MenuItem value={"Obj"}>Single/Miltiple Correct</MenuItem>
                            <MenuItem value={"Des"}>
                              Fill in The Blanks
                            </MenuItem>
                          </Select>
                        </center>
                      </FormControl>
                    </center>
                  </Grid>
                  {/* <Grid item xs={6}>
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
                  </Grid> */}
                </Grid>
                {/* <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Add Explanation"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                    />
                  </Grid>
                </Grid> */}
                <br />
                {type === "Obj" ? (
                  <Grid container spacing={1} style={{ marginLeft: "1%" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7882BD", margin: "1%" }}
                      onClick={onAddBtnClick}
                    >
                      Add Option
                    </Button>
                  </Grid>
                ) : (
                  <center></center>
                )}
                <br />
                <div>{inputList}</div>
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  onClick={create_ques}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <p>
              You Can Assign This Question To a Group{" "}
              <a
                onClick={assign_group}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                From Here
              </a>{" "}
              Or You Can{" "}
              <a
                onClick={create_group}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Create New
              </a>{" "}
              Group
            </p>
            {assign === true ? (
              <div>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth style={{ width: "98.5%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Question Group
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={group}
                        label="Question Group"
                        onChange={handleChange2}
                      >
                        {quesgroup.map((key) => {
                          return (
                            <MenuItem value={key._id}>{key.title}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  onClick={assign_questiongroup}
                >
                  Continue
                </Button>{" "}
              </div>
            ) : (
              <center></center>
            )}
            {create === true ? (
              <div>
                <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Specify Question Group"
                      variant="outlined"
                      size="small"
                      style={{ width: "98.5%" }}
                      onChange={(e) => {
                        e.preventDefault();
                        setGrptitle(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  onClick={create_questiongroup}
                >
                  Continue
                </Button>
              </div>
            ) : (
              <center></center>
            )}
          </center>
        </Box>
      </Modal>
    </div>
  );
}
