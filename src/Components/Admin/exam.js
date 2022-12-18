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
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import "./style.css";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import moment from "moment";
import { Modal as Modal1 } from "react-responsive-modal";

function createData(name, candidates, duration, questions, action) {
  return { name, candidates, duration, questions, action };
}

const rows = [
  createData("Mechanics of Solids", 159, 6.0, 24, "View Details"),
  createData("Thermodynamics", 237, 9.0, 37, "View Details"),
  createData("Structural Analysis", 262, 16.0, 24, "View Details"),
  createData("Mathematics II", 305, 3.7, 67, "View Details"),
  createData("Algorithms III", 356, 16.0, 49, "View Details"),
];

let token = getCookie("access_token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export default function BasicTable({ error, setError }) {
  const [examgroup, setExamgroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [allexamcandidates, setAllexamcandidates] = useState([]);
  const [demodata, setDemodata] = useState("");

  useEffect(() => {
    getExams();
  }, []);

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  function getExams() {
    setLoading(true);
    axiosInstance
      .get("/test/all", config)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setExamgroup(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
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
          Upcoming Exams
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Manually Create an{" "}
          <a
            href="/addexamAdmin"
            style={{ textDecoration: "none", color: "#296d98" }}
          >
            Exam
          </a>
          {/* &nbsp;Or <input type="file" /> */}
        </p>
        <br />
        <br />
        {!examgroup && (
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
        {examgroup && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Exam Name</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Start Date/Time</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Full Marks</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Question Groups</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.candidates}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">{row.questions}</TableCell>
                      <TableCell align="right" style={{ cursor: "pointer", color:"red" }}>
                        Delete
                      </TableCell>
                    </TableRow>
                  ))} */}
                {examgroup.map((key) => {
                  let momentDate = moment
                    .utc(key.starting_date)
                    .format("MM/DD/YY, h:mm:ss a");
                  return (
                    <TableRow
                      key={key._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key.title}
                      </TableCell>
                      <TableCell align="right">{momentDate}</TableCell>
                      <TableCell align="right">{key.total_number}</TableCell>
                      <TableCell align="right">
                        {key.question_groups.map((x) => {
                          return x.title + " ";
                        })}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ cursor: "pointer", color: "grey" }}
                        onClick={() => {
                          // handleOpen1();
                          setDemodata(key._id);
                          // axiosInstance
                          //   .get(`/result/${altst._id}/`, config)
                          //   .then((res) => {
                          //     if (res.status === 200) {
                          //       console.log(res);
                          //     }
                          //   })
                          //   .catch((err)=>{
                          //     console.log(err);
                          //   })
                        }}
                      >
                        View Results
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <br />
        <br />
      </div>
      <Footer />
      <Modal1 open={open1} onClose={handleClose1} center>
        <Box style={{ padding: "3%" }}>
          <center>
            <h3>View Results</h3>
            <p>Get the Results of the Students Who Have Attempted the Exam</p>
            <br />
            <Grid
              container
              spacing={1}
              style={{
                marginTop: "0.5%",
                alignItems: "center",
                overFlowY: "scroll",
              }}
            >
              <Grid item xs={5}>
                <p style={{ textAlign: "left", fontWeight: "bold" }}>Name</p>
              </Grid>
              <Grid item xs={3}>
                <p style={{ textAlign: "center", fontWeight: "bold" }}>Marks</p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ textAlign: "right", fontWeight: "bold" }}>
                  View Paper
                </p>
              </Grid>
            </Grid>
            {allexamcandidates.map((altst) => {
              return (
                <Grid
                  container
                  spacing={1}
                  style={{
                    marginTop: "0.5%",
                    alignItems: "center",
                    overFlowY: "scroll",
                  }}
                >
                  <Grid item xs={5}>
                    <p style={{ textAlign: "left" }}>Name</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p style={{ textAlign: "center" }}>Marks</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p style={{ textAlign: "right", color: "red" }}>View</p>
                  </Grid>
                </Grid>
              );
            })}
            <br />
            <br />
            <br />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#296d98",
                width: "50%",
              }}
              onClick={handleClose1}
            >
              Close
            </Button>
          </center>
        </Box>
      </Modal1>
    </div>
  );
}
