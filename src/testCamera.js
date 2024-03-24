import React, { useEffect, useRef } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Test({ setCameraBlob, isClicked }) {
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    resumeRecording,
    pauseRecording,
    previewStream,
  } = useReactMediaRecorder({ video: true, audio: true });
  useEffect(() => {
    stopRecording();
    console.log(mediaBlobUrl);
    setCameraBlob(mediaBlobUrl);
  }, [isClicked, mediaBlobUrl]);

  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);
  return (
    <>
      <div>
        <button onClick={startRecording}>Start Camera</button>
        <button onClick={stopRecording}>Stop Camera</button>
        <button onClick={pauseRecording}>Pause Camera</button>
        <button onClick={resumeRecording}>Resume Camera</button>
        <video ref={videoRef} width={500} height={500} autoPlay />
      </div>
    </>
  );
}
