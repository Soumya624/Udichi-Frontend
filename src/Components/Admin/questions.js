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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

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

function createData(name, identity, section, type, action) {
  return { name, identity, section, type, action };
}

const rows = [
  createData(
    "What is Solid Mechanics?",
    159,
    "Mechatronics",
    "MCQ (Radio)",
    "View Details"
  ),
  createData(
    "What is Soft Computing?",
    237,
    "Mechatronics",
    "MCQ (Radio)",
    "View Details"
  ),
  createData(
    "What is OS?",
    262,
    "Operating System",
    "MCQ (Radio)",
    "View Details"
  ),
  createData(
    "What is the decimal of 100?",
    305,
    "Operating System",
    "MCQ (Radio)",
    "View Details"
  ),
  createData(
    "What is Octave Band?",
    356,
    "Sound and Vibration",
    "MCQ (Radio)",
    "View Details"
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

export default function BasicTable({ error, setError }) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [quesgroup, setQuesgroup] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmit1(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append(`files`, file);
    formdata.append(`title`, name);
    console.log(formdata);
    axiosInstance
      .post("/questions/file-upload", formdata, config)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          Manually Add a{" "}
          <a
            href="/addquestionAdmin"
            style={{ textDecoration: "none", color: "#7882bd" }}
          >
            Question
          </a>
          &nbsp;Or{" "}
          <a
            onClick={handleOpen}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "#7882bd",
            }}
          >
            Upload File
          </a>
        </p>
        <br />
        <br />
        {!quesgroup && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {quesgroup &&
          quesgroup.map((key) => {
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
                            style={{ cursor: "pointer", color: "grey" }}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
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
                    setName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </center>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ margin: "3%" }}
          />
          <br />
          <br />
          <center>
            <Button
              variant="contained"
              style={{ backgroundColor: "#7882BD", width: "50%" }}
              onClick={handleSubmit1}
            >
              Continue
            </Button>
          </center>
        </Box>
      </Modal>
    </div>
  );
}
