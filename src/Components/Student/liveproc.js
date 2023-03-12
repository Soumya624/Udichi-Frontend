import React from "react";
import { useEffect } from "react";
import * as faceapi from "face-api.js";
import { useState } from "react";
import { useRef } from "react";
import { Sidebar, SidebarItem } from "react-responsive-sidebar";
import {
  AccessTimeOutlined,
  CampaignOutlined,
  HelpOutlineOutlined,
  HomeOutlined,
  InsertChartOutlined,
  PersonOutlineOutlined,
  SummarizeRounded,
  TuneOutlined,
} from "@mui/icons-material";
import Clock from "react-live-clock";

export default function Liveproc({ camera, setMultipleFace, multipleFace }) {
  const [initialise, setInitialise] = useState(false);
  // const [multipleFace, setMultipleFace] = useState(false);
  const videoRef = useRef();

  useEffect(()=>{
    if(videoRef && videoRef.current !== undefined){
      videoRef.current.srcObject = camera.previewStream
    }
  },[camera])

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initialise) {
        setInitialise(false);
      }

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      console.log(detections);
      setMultipleFace(detections.length > 1);
    }, 500);
  };

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
        <b style={{ fontSize: "12px", fontWeight: "normal" }}>March, 2023</b>
        <br />
        <Clock
          format={"h:mm:ss A"}
          ticking={true}
          timezone={"ASIA"}
          style={{ fontSize: "semibold" }}
        />
      </div>
    </SidebarItem>,
    <SidebarItem href="/dashboardStudent">
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

  // console.log(camera.previewStream)
  
  return (
    <div>
      {camera.previewStream && (
        <video
          ref={videoRef}
          autoPlay
          muted
          width={200}
          height={200}
          onPlay={handleVideoOnPlay}
        />
      )}
    </div>
  );
}
