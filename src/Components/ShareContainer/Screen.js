import React, { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@mui/material";

export default function Screen({
  startRecording,
  setMediaBlob,
  isClicked,
  stopRecording,
  mediaBlobUrl,
}) {
  console.log(isClicked);
  // const {
  // 	startRecording,
  // 	stopRecording,
  // 	mediaBlobUrl,
  // 	resumeRecording,
  // 	pauseRecording,
  //   status
  // } = useReactMediaRecorder({ screen: true, audio: true });
  useEffect(() => {
    console.log("Clicked");
    stopRecording();
    console.log(mediaBlobUrl);
    setMediaBlob(mediaBlobUrl);
  }, [isClicked, mediaBlobUrl]);

  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={startRecording}
          style={{
            backgroundColor: "#07a8a0",
            margin: "2px",
          }}
        >
          Share Screen
        </Button>
      </div>
    </>
  );
}
