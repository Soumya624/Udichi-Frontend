import React from "react";
import Navbar from "./../../Common/Navbar_Assessor";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Footer from "../../Common/Footer";

function createData(name, candidates, terminate, action) {
  return { name, candidates, terminate, action };
}

const rows = [
  createData("A Bose", 159, "Yes", "Download"),
  createData("Sudip Nayak", 237, "Yes", "Download"),
  createData("B M Kumar", 262, "Yes", "Download"),
  createData("P Chetri", 305, "Yes", "Download"),
  createData("P K Das", 356, "Yes", "Download"),
];

export default function Confirmpresence() {
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
              <br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Student Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>ID of Student</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Terminate</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Screen Recording/Audio</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.candidates}</TableCell>
                        <TableCell align="right">{row.terminate}</TableCell>
                        <TableCell align="right">{row.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <br />
              <br />
              <Typography variant="body2" color="text.secondary">
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                  href="#"
                >
                  Close
                </Button>
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
