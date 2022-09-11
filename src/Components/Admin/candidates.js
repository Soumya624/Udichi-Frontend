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

function createData(name, candidates, group, username, action) {
  return { name, candidates, group, username, action };
}

const rows = [
  createData(
    "A Bose",
    159,
    "JBL Tailoring@04.08.2022",
    "user@001",
    "View Details"
  ),
  createData(
    "Sudip Nayak",
    237,
    "JBL Tailoring@04.08.2022",
    "user@002",
    "View Details"
  ),
  createData(
    "B M Kumar",
    262,
    "JBL Tailoring@04.08.2022",
    "user@003",
    "View Details"
  ),
  createData(
    "P Chetri",
    305,
    "JBL Tailoring@04.08.2022",
    "user@004",
    "View Details"
  ),
  createData(
    "P K Das",
    356,
    "JBL Tailoring@04.08.2022",
    "user@005",
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
          Total Candidates
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
                  <b>Group</b>
                </TableCell>
                <TableCell align="right">
                  <b>Username</b>
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
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.action}</TableCell>
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
