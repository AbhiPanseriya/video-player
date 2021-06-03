import { useState } from "react";
import Player from "./Player";
import SetSrc from "./SetSrc";

function App() {
	const [src, setSrc] = useState();

	return (
		<div>
			{ src ? (
				<Player src={src} />
			) : (
				<SetSrc setSrc={setSrc} />
			)}
		</div>
	);
}

export default App;
