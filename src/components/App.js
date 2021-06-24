import { useEffect, useState } from "react";
import Player from "./Player";
import SetSrc from "./SetSrc";

function App() {
	const [src, setSrc] = useState('');
	const [isMultiple, setIsMultiple] = useState(false);
	const [filesList, setFilesList] = useState([]);
	const [isPlayerVisible, setIsPlayerVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [isLocalFile, setIsLocalFile] = useState(true);
	const [currentlyPlaying, setCurrentlyPlaying] = useState(0);

	useEffect(() => {
		if (currentlyPlaying >= filesList.length) {
			setIsPlayerVisible(false);
		} else {
			const file = filesList[currentlyPlaying];
			setTitle(file.name);
			const URL = window.URL || window.webkitURL;
			setSrc(URL.createObjectURL(file));
			setIsPlayerVisible(true);
		}
	}, [currentlyPlaying, filesList])
	return (
		<div>
			{ isPlayerVisible
				? <Player
					src={src}
					title={title}
					isLocalFile={isLocalFile}
					isMultiple={isMultiple}
					filesList={filesList}
					setIsPlayerVisible={setIsPlayerVisible}
					currentlyPlaying={currentlyPlaying}
					setCurrentlyPlaying={setCurrentlyPlaying}
				/>
				: <SetSrc
					src={src}
					setSrc={setSrc}
					setIsPlayerVisible={setIsPlayerVisible}
					setTitle={setTitle}
					setIsLocalFile={setIsLocalFile}
					setIsMultiple={setIsMultiple}
					setFilesList={setFilesList}
				/>
			}
		</div>
	);
}

export default App;
