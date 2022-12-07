import React from "react";
import Navbar from "./../../Common/Navbar_Proctorer";
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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookie";

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

// function createData(name, candidates, terminate, action) {
//   return { name, candidates, terminate, action };
// }

// const rows = [
//   createData("A Bose", 159, "Yes", "Download"),
//   createData("Sudip Nayak", 237, "Yes", "Download"),
//   createData("B M Kumar", 262, "Yes", "Download"),
//   createData("P Chetri", 305, "Yes", "Download"),
//   createData("P K Das", 356, "Yes", "Download"),
// ];

export default function Confirmpresence({error,setError}) {
  let token = getCookie("access_token");
	let user = JSON.parse(localStorage.getItem("user"));

	const config = {
		headers: { Authorization: `Bearer ${token}`, "user-type": user.usertype },
	};
  const [open, setOpen] = useState(false);

  const [list, setList] = useState([]);
  const [attemplist, setAttemptlist] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/attempts/attempts_group/${id}`,config)
      .then((res) => {
        if (res.status === 200) {
          setList(res.data);
          // setAttemptlist(res.data.attempts_submitted);
        }
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status !== 404)setError("Error occurred! Please Try Again.....");
        
				setTimeout(() => {
					setError(null);
				}, 1000);
      });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setAttemptlist([])
    setOpen(false);
  }

  function downloadReportFrontend(blob, name) {
		if (window.navigator && window.navigator.msSaveOrOpenBlob)
			return window.navigator.msSaveOrOpenBlob(blob);

		var binaryData = [];
		binaryData.push(blob);
		const data = window.URL.createObjectURL(
			new Blob(binaryData, { type: "application/pdf" }),
		);

		const link = document.createElement("a");
		link.href = data;
		link.download = name;

		link.dispatchEvent(
			new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				view: window,
			}),
		);
	}

  const downloadZip = (id) =>{
    console.log(id)

    axiosInstance.get(`/attempts/download/${id}`,{
      responseType : "blob",
      ...config
    })
    .then((res)=>{
      console.log(res)
      if(res.status === 200){
        downloadReportFrontend(res.data,`${Date.now()}_Udichi.zip`)
      }
    })
    .catch((err)=>{
      
      if(err.response.status === 404) setError("File is not Present")
      setTimeout(() => {
        setError(null);
      }, 1000);
    })
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
              {/* <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ marginBottom: "0", fontWeight: "bold" }}
              >
                Test 001
              </Typography> */}
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
                    {list.map((altst) => {
                      return (
                        <TableRow
                          // key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {altst.candidate.firstname +
                              " " +
                              altst.candidate.lastname}
                          </TableCell>
                          <TableCell align="right">
                            {altst.candidate._id}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ cursor: "pointer" }}
                          >
                            Yes
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{ cursor: "pointer", color:"red" }}
                            onClick={()=>{
                              setAttemptlist(altst.attempts_submitted)
                              handleOpen()
                            }}
                          >
                            Download
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                  href="/dashboardProctorer"
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <center>
                {attemplist.map((altst) => {
                  return (
                    <Grid
                      container
                      spacing={1}
                      style={{ marginTop: "0.5%", alignItems: "center" }}
                    >
                      <Grid item xs={6}>
                        <p>{altst}</p>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#7882BD", width: "50%" }}
                          onClick={()=>{
                            console.log(altst)
                            downloadZip(altst)
                          }}
                        >
                          Download
                        </Button>
                      </Grid>
                    </Grid>
                  );
                })}
                <br />
                <br />
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#7882BD", width: "50%" }}
                >
                  Close
                </Button>
              </center>
            </Box>
          </Modal>
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
