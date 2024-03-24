import React, { useEffect } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Test({ setMediaBlob, isClicked }) {
  console.log(isClicked);
  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    resumeRecording,
    pauseRecording,
  } = useReactMediaRecorder({ screen: true, audio: true });
  useEffect(() => {
    console.log("clicked");
    stopRecording();
    setMediaBlob(mediaBlobUrl);
  }, [isClicked, mediaBlobUrl]);

  console.log("Media Blob", mediaBlobUrl);
  return (
    <>
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={pauseRecording}>Pause Recording</button>
        <button onClick={resumeRecording}>Resume Recording</button>
      </div>
    </>
  );
}
