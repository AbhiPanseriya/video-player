import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import PlayerControl from './PlayerControl'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import DisplaySubtitle from './DisplaySubtitle'
import FilesList from './FilesList';

const Player = ({ src, title, isLocalFile, currentlyPlaying, setCurrentlyPlaying, setIsPlayerVisible, filesList }) => {
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(JSON.parse(localStorage.getItem('muted')) || false);
    const [volume, setVolume] = useState(JSON.parse(localStorage.getItem('vol')) || 50);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [played, setPlayed] = useState(0);
    const [pip, setPip] = useState(false);
    const [isControlsHidden, setIsControlsHidden] = useState(true);
    const [subtitle, setSubtitle] = useState('');
    const [subtitleOffset, setSubtitleOffset] = useState(0);
    const [fileNames, setFileNames] = useState([]);

    const playerRef = useRef(null);

    const fullScreenHandle = useFullScreenHandle();

    const handleMouseMove = (e) => {
        if (!isControlsHidden) return;

        setIsControlsHidden(false);
        setTimeout(() => {
            if (playing)
                setIsControlsHidden(true);
        }, 8000);
    }

    const togglePlaying = (value) => {
        setPlaying(value);
        if (!value) {
            setIsControlsHidden(false);
        }
        else {
            setTimeout(() => {
                setIsControlsHidden(true);
            }, 5000);
        }
    }

    useEffect(() => {
        togglePlaying(true);
        handleMouseMove();
    }, [src]);

    useEffect(() => {
        const cb = (e) => {
            switch (e.code) {
                case 'Space':
                case 'KeyK':
                    togglePlaying(!playing);
                    break;
                case 'KeyJ':
                case 'ArrowLeft':
                    playerRef?.current?.seekTo(playerRef.current.getCurrentTime() - 10, 'seconds');
                    break;
                case 'KeyL':
                case 'ArrowRight':
                    playerRef?.current?.seekTo(playerRef.current.getCurrentTime() + 10, 'seconds');
                    break;
                case 'KeyP':
                    if (pip)
                        setPip(false)
                    setTimeout(() => {
                        setPip(true)
                    }, 10);
                    break;
                case 'KeyF':
                    fullScreenHandle.active ? fullScreenHandle.exit() : fullScreenHandle.enter()
                    break;
                case 'Equal':
                    if (volume + 3 > 100) break;
                    setVolume(volume + 3);
                    localStorage.setItem('vol', volume + 3);
                    if (volume + 3 === 0) {
                        setMuted(true);
                        localStorage.setItem('muted', true);
                    } else {
                        setMuted(false);
                        localStorage.setItem('muted', false);
                    }
                    break;
                case 'Minus':
                    if (volume - 2 < 0) break;
                    setVolume(volume - 2);
                    localStorage.setItem('vol', volume - 2);
                    if (volume - 2 === 0) {
                        setMuted(true);
                        localStorage.setItem('muted', true);
                    } else {
                        setMuted(false);
                        localStorage.setItem('muted', false);
                    }
                    break;
                case 'KeyM':
                    setMuted(!muted);
                    localStorage.setItem('muted', !muted);
                    if (!muted)
                        setVolume(0);
                    else
                        setVolume(JSON.parse(localStorage.getItem('vol')));
                    break;

                default:
                    break;
            }
        }
        window.addEventListener('keyup', cb);

        return () => window.removeEventListener('keyup', cb);
    }, [pip, playing, fullScreenHandle, volume, muted])

    useEffect(() => {
        const fileNames = [];
        for (let index = 0; index < filesList.length; index++) {
            fileNames.push(filesList[index].name);
        }
        setFileNames(fileNames);
    }, [filesList]);

    return (
        <FullScreen handle={fullScreenHandle}>
            <div className={`relative bg-black ${isControlsHidden ? 'cursor-none' : 'cursor-auto'}`} onMouseMove={handleMouseMove}>
                <div className={`w-screen h-screen ${isControlsHidden ? '' : 'opacity-75'}`}>
                    <ReactPlayer
                        ref={playerRef}
                        className='object-contain'
                        url={src}
                        width='100%'
                        height='100%'
                        controls={!isLocalFile}
                        pip={pip}
                        stopOnUnmount={false}
                        playing={playing}
                        muted={muted}
                        volume={volume / 100}
                        playbackRate={playbackRate}
                        onEnded={() => setCurrentlyPlaying(currentlyPlaying + 1)}
                        onProgress={(e) => { setPlayed(e.playedSeconds); }}
                        onDisablePIP={() => setPip(false)}
                        onPause={() => setPlaying(false)}
                    />
                </div>
                {isLocalFile &&
                    <PlayerControl
                        isControlsHidden={isControlsHidden}
                        title={title}
                        playing={playing}
                    togglePlaying={togglePlaying}
                    setIsPlayerVisible={setIsPlayerVisible}
                        seekTo={(amount) => {
                            playerRef.current.seekTo(playerRef.current.getCurrentTime() + amount, 'seconds');
                        }}
                        muted={muted}
                        setMuted={setMuted}
                        volume={volume}
                        setVolume={setVolume}
                        playbackRate={playbackRate}
                    setPlaybackRate={setPlaybackRate}
                    fullScreenToggle={fullScreenHandle}
                    played={played}
                    setPlayed={setPlayed}
                    totalDuration={playerRef?.current?.getDuration() || 0}
                    pip={pip}
                    setPip={setPip}
                    subtitle={subtitle}
                    setSubtitle={setSubtitle}
                    subtitleOffset={subtitleOffset}
                    setSubtitleOffset={setSubtitleOffset}
                />
                }
                <DisplaySubtitle
                    played={played}
                    subtitleText={subtitle}
                    subtitleOffset={subtitleOffset}
                    isControlsHidden={isControlsHidden}
                />
                <FilesList
                    fileNames={fileNames}
                    currentlyPlaying={currentlyPlaying}
                    setCurrentlyPlaying={setCurrentlyPlaying}
                    isControlsHidden={isControlsHidden}
                />
            </div>
        </FullScreen>
    )
}

export default Player
