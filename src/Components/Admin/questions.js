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

export default function BasicTable() {
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
          Want to Add{" "}
          <a href="/addquestionAdmin" style={{ textDecoration: "none" }}>
            New Questions?
          </a>
        </p>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Question Text</b>
                </TableCell>
                <TableCell align="right">
                  <b>ID of Question</b>
                </TableCell>
                <TableCell align="right">
                  <b>Section</b>
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.identity}</TableCell>
                  <TableCell align="right">{row.section}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right" style={{cursor:"pointer"}}>{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
