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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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

export default function BasicTable({ error, setError }) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [candigroup, setCandigroup] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function handleSubmit1(e) {
	e.preventDefault();
	let formdata = new FormData();
	formdata.append(`files`,file);
	formdata.append(`title`,name);
	console.log(formdata);
	axiosInstance
	.post("/candidate_group/file-upload", formdata)
	.then((res)=>{
		console.log(res.data);
		if(res.status===200)
		{
			window.location.reload();
		}
	})
	.catch((err)=>{
		console.log(err);
	})
  }

  useEffect(() => {
    getCandidates();
  }, []);

  function getCandidates() {
    axiosInstance
      .get("/candidate_group/all/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setCandigroup(res.data);
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
          Total Candidates
        </h4>
        <p style={{ lineHeight: "1px" }}>
          Want to Add a{" "}
          <a href="/addcandidateAdmin" style={{ textDecoration: "none" }}>
            New Candidate?
          </a>
          &nbsp;Or{" "}
          <a onClick={handleOpen} style={{ textDecoration: "none", cursor:"pointer" }}>
            Upload File
          </a>
        </p>
        <br />
        <br />
        {candigroup.map((key) => {
          return (
            // <List
            //   sx={{ width: "100%", bgcolor: "background.paper" }}
            //   component="nav"
            //   aria-labelledby="nested-list-subheader"
            // >
            //   <ListItemButton onClick={handleClick}>
            //     <ListItemIcon>
            //       <InboxIcon />
            //     </ListItemIcon>
            //     <ListItemText primary={key.title} />
            //     {open ? <ExpandLess /> : <ExpandMore />}
            //   </ListItemButton>
            //   <Collapse in={open} timeout="auto" unmountOnExit>
            //     <TableContainer component={Paper}>
            //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
            //         <TableHead>
            //           <TableRow>
            //             <TableCell>
            //               <b>Candidate Name</b>
            //             </TableCell>
            //             <TableCell align="right">
            //               <b>ID of Candidates</b>
            //             </TableCell>

            //             <TableCell align="right">
            //               <b>Username</b>
            //             </TableCell>
            //             <TableCell align="right">
            //               <b>Action</b>
            //             </TableCell>
            //           </TableRow>
            //         </TableHead>
            //         <TableBody>
            //           {rows.map((row) => (
            //             <TableRow
            //               key={row.name}
            //               sx={{
            //                 "&:last-child td, &:last-child th": { border: 0 },
            //               }}
            //             >
            //               <TableCell component="th" scope="row">
            //                 {row.name}
            //               </TableCell>
            //               <TableCell align="right">{row.candidates}</TableCell>

            //               <TableCell align="right">{row.username}</TableCell>
            //               <TableCell
            //                 align="right"
            //                 style={{ cursor: "pointer" }}
            //               >
            //                 {row.action}
            //               </TableCell>
            //             </TableRow>
            //           ))}
            //         </TableBody>
            //       </Table>
            //     </TableContainer>
            //   </Collapse>
            // </List>
            <Collapsible trigger={key.title} style={{ padding: "2px" }}>
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
                        <b>Username</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {key.candidates.map((x) => (
                      <TableRow
                        key={x._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {x.firstname + x.lastname}
                        </TableCell>
                        <TableCell align="right">{x._id}</TableCell>

                        <TableCell align="right">{x.username}</TableCell>
                        <TableCell
                          align="right"
                          style={{ cursor: "pointer", color: "red" }}
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
                  label="Specify Candidate Group"
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
