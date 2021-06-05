import { useState } from "react";
import Player from "./Player";
import SetSrc from "./SetSrc";

function App() {
	const [src, setSrc] = useState('');
	const [isPlayerVisible, setIsPlayerVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [isLocalFile, setIsLocalFile] = useState(true);

	return (
		<div>
			{ isPlayerVisible
				? <Player src={src} setIsPlayerVisible={setIsPlayerVisible} title={title} isLocalFile={isLocalFile} />
				: <SetSrc src={src} setSrc={setSrc} setIsPlayerVisible={setIsPlayerVisible} setTitle={setTitle} setIsLocalFile={setIsLocalFile} />
			}
		</div>
	);
}

export default App;
