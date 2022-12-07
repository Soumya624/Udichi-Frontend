import React, { useState } from "react";


export default function Container({children}) {
	const [error, setError] = useState(null);
	console.log(error)

	const childrenWithProps = React.Children.map(children, (child, index) => {
		return React.cloneElement(child, {
			setError: () => {
				setError(null);
		  }
		});
	  });
	return (
		<div>
			{childrenWithProps}
			{/* {props.children} */}
		</div>
	);
}
