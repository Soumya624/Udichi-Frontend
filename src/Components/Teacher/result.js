import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./../../Common/Navbar_Assessor";
import Footer from "../../Common/Footer";

function createData(name, candidates, test, submitted, action) {
  return { name, candidates, test, submitted, action };
}

const rows = [
  createData(
    "A Bose",
    159,
    "Test 001",
    "Yes",
    "Download"
  ),
  createData(
    "Sudip Nayak",
    237,
    "Test 001",
    "Yes",
    "Download"
  ),
  createData(
    "B M Kumar",
    262,
    "Test 001",
    "Yes",
    "Download"
  ),
  createData(
    "P Chetri",
    305,
    "Test 001",
    "Yes",
    "Download"
  ),
  createData(
    "P K Das",
    356,
    "Test 001",
    "No",
    "Download"
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
          View Results
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Want to View{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Your Account?
          </a>
        </p>
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Candidate Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>ID of Candidates</b>
                </TableCell>
                <TableCell align="right">
                  <b>Test Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Submitted</b>
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
                  <TableCell align="right">{row.test}</TableCell>
                  <TableCell align="right">{row.submitted}</TableCell>
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
