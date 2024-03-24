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
import { CircularProgress } from "@mui/material";
import candidate_demo_file from "./../../Common/Candidate_Udichi.xlsx";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import {
  AccessTimeOutlined,
  AddOutlined,
  ArrowDropDownOutlined,
  CampaignOutlined,
  HelpOutlineOutlined,
  HomeOutlined,
  InsertChartOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  SummarizeRounded,
  TuneOutlined,
} from "@mui/icons-material";
import Clock from "react-live-clock";

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

export default function BasicTable({ error, setError }) {
  let token = getCookie("access_token");
  let user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
  };

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [candigroup, setCandigroup] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setOpen(!open);
  };

  function handleSubmit1(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append(`files`, file);
    formdata.append(`title`, name);
    console.log(formdata);
    axiosInstance
      .post("/candidate_group/file-upload", formdata, config)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
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
        setError("Error occurred. Please try again!");
        setTimeout(() => {
          setError(null);
        }, 1000);
      });
  }

  const items1 = [
    <SidebarItem></SidebarItem>,
    <SidebarItem></SidebarItem>,
    <SidebarItem></SidebarItem>,
    <SidebarItem>
      <div
        style={{
          alignItems: "center",
          fontWeight: "normal",
        }}
      >
        <b style={{ fontSize: "12px", fontWeight: "normal" }}>March, 2024</b>
        <br />
        <Clock
          format={"h:mm:ss A"}
          ticking={true}
          timezone={"ASIA"}
          style={{ fontSize: "semibold" }}
        />
      </div>
    </SidebarItem>,
    <SidebarItem href="/dashboardAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <HomeOutlined />
        &nbsp; Dashboard
      </div>
    </SidebarItem>,
    <SidebarItem href="/examAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <AccessTimeOutlined />
        &nbsp; Exams
      </div>
    </SidebarItem>,
    <SidebarItem href="/candidateAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <PersonOutlineOutlined />
        &nbsp; Candidates
      </div>
    </SidebarItem>,
    <SidebarItem href="/questionAdmin">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <SummarizeRounded />
        &nbsp; Questions
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <InsertChartOutlined />
        &nbsp; Statistics
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <CampaignOutlined />
        &nbsp; Notifications
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <TuneOutlined />
        &nbsp; Settings
      </div>
    </SidebarItem>,
    <SidebarItem href="#">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "15px",
          fontWeight: "normal",
        }}
      >
        <HelpOutlineOutlined />
        &nbsp; Help & Support
      </div>
    </SidebarItem>,
  ];

  return (
    <div>
      <Sidebar content={items1} background="#193441">
        <Navbar />
        <div style={{ margin: "5%" }}>
          <br />
          <br />
          <br />
          <Grid container spacing={1} style={{ alignItems: "center" }}>
            <Grid item xs={6}>
              <h4
                style={{
                  textAlign: "left",
                  fontSize: "28px",
                  margin: "5px 0",
                }}
              >
                Candidates
              </h4>
              <p style={{ margin: "0", padding: "0" }}>
                <a
                  onClick={handleOpen}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#193441",
                  }}
                >
                  Upload&nbsp;
                </a>
                an Excel File
              </p>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="success"
                href="/addcandidateAdmin"
              >
                <AddOutlined />
                Add
              </Button>
            </Grid>
          </Grid>
          <br />
          <br />
          {!candigroup && (
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Candidate Name</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Group</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Phone No.</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              {candigroup &&
                candigroup.map((key) => {
                  return (
                    <TableBody>
                      {key.candidates.map((x) => (
                        <TableRow
                          key={x._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {x.firstname + " " + x.lastname}
                          </TableCell>
                          <TableCell align="right">{key.title}</TableCell>
                          <TableCell align="right">{x.email}</TableCell>
                          <TableCell align="right">{x.mobile}</TableCell>
                          <TableCell
                            align="right"
                            style={{ cursor: "pointer", color: "grey" }}
                          >
                            <SettingsOutlined />
                            <ArrowDropDownOutlined />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  );
                })}
            </Table>
          </TableContainer>
          <br />
          <br />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <Grid container spacing={1} style={{ marginTop: "0.5%" }}>
                <center>
                  <h3>General Guidelines</h3>
                  <ul>
                    <li style={{ textAlign: "justify" }}>
                      The file must contain unique candidates
                    </li>
                    <li style={{ textAlign: "justify" }}>
                      Any two files shouln't contain exactly same candidate
                      details
                    </li>
                  </ul>
                  <br />
                </center>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Specify Candidate Group"
                    variant="outlined"
                    size="small"
                    fullWidth
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
              style={{
                marginTop: "3%",
                marginLeft: "21%",
                marginBottom: "3%",
              }}
            />
            <br />
            <br />
            <center>
              <Button
                variant="contained"
                style={{ backgroundColor: "#193441", width: "50%" }}
                onClick={handleSubmit1}
              >
                Continue
              </Button>
              <br />
              <p style={{ fontSize: "10px" }}>
                Click
                <a
                  style={{
                    textDecoration: "none",
                    color: "#193441",
                    fontSize: "10px",
                    cursor: "pointer",
                  }}
                  href={candidate_demo_file}
                  download
                >
                  &nbsp;here&nbsp;
                </a>
                to download sample file
              </p>
            </center>
          </Box>
        </Modal>
      </Sidebar>
    </div>
  );
}
