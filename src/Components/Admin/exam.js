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

export default function BasicTable() {
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
          Want to Create{" "}
          <a href="/addexamAdmin" style={{ textDecoration: "none" }}>
            New Exams?
          </a>
          &nbsp;Or <input type="file" />
        </p>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Exam Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>No. of Candidates</b>
                </TableCell>
                <TableCell align="right">
                  <b>Duration</b>
                </TableCell>
                <TableCell align="right">
                  <b>Questions</b>
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
                  <TableCell align="right">{row.candidates}</TableCell>
                  <TableCell align="right">{row.duration}</TableCell>
                  <TableCell align="right">{row.questions}</TableCell>
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
