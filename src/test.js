import React, { useEffect } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { useReactMediaRecorder } from "react-media-recorder";

export default function Test() {
	const { startRecording, stopRecording, mediaBlobUrl, resumeRecording, pauseRecording } =
		useReactMediaRecorder({ screen: true, audio : true });
	useEffect(() => {}, []);
	async function zipfile() {
		const zip = new JSZip();
        let video = zip.folder("Recording");
        let blob = await fetch(mediaBlobUrl).then(r => r.blob());
        video.file("recording.mp4",blob);
		zip.file("idlist-1.txt", "PMID:29651880\r\nPMID:29303721");
		zip.file("idlist-2.txt", "PMID:29651880\r\nPMID:29303721");
		zip.generateAsync({ type: "blob" }).then(function (content) {
			FileSaver.saveAs(content, "download.zip");
		});
	}

	console.log("laknsfndfk");
	return (
		<>
			<div>
				<button onClick={startRecording}>Start Recording</button>
				<button onClick={stopRecording}>Stop Recording</button>
				<button onClick={pauseRecording}>Pause Recording</button>
				<button onClick={resumeRecording}>Resume Recording</button>
			</div>
			<button onClick={zipfile}>Click</button>
		</>
	);
}
