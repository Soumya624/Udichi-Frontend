import React from "react";
import Test from "./test";
import TestCamera from "./testCamera";
import { useState } from "react";
export default function TestCont() {
	const [screenBlob, setMediaBlob] = useState(null);
	const [cameraBlobUrl, setCameraBlob] = useState(null);
    const [isClicked, setClicked] = useState(false)


    useState(()=>{
    },[])

    // console.log(screenBlob,cameraBlobUrl)

	return (
		<div>
			<Test setMediaBlob={setMediaBlob} isClicked={isClicked} />
			<TestCamera setCameraBlob={setCameraBlob} isClicked={isClicked} />
            <button onClick={()=>{
                setClicked(true)
                
            }}>Download</button>
		</div>
	);
}
