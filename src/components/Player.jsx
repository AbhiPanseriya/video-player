import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import PlayerControl from './PlayerControl'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

const Player = ({ src, setIsPlayerVisible, title, isLocalFile }) => {
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(JSON.parse(localStorage.getItem('muted')) || false);
    const [volume, setVolume] = useState(JSON.parse(localStorage.getItem('vol')) || 50);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [played, setPlayed] = useState(0);
    const [pip, setPip] = useState(false);
    const [isControlsHidden, setIsControlsHidden] = useState(true);

    const playerRef = useRef(null);

    const fullScreenHandle = useFullScreenHandle();

    const handleMouseMove = (e) => {
        if (!isControlsHidden) return;

        setIsControlsHidden(false);
        setTimeout(() => {
            setIsControlsHidden(true);
        }, 10000);
    }

    useEffect(() => {
        const cb = (e) => {
            switch (e.code) {
                case 'Space':
                case 'KeyK':
                    setPlaying(!playing);
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

    return (
        <FullScreen handle={fullScreenHandle}>
            <div className={`bg-black w-screen h-screen relative ${isControlsHidden ? 'cursor-none' : 'cursor-auto'}`} onMouseMove={handleMouseMove}>
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
                    onEnded={e => setIsPlayerVisible(false)}
                    onProgress={(e) => { setPlayed(e.playedSeconds); }}
                />
                {isLocalFile &&
                    <PlayerControl
                        isControlsHidden={isControlsHidden}
                        title={title}
                        playing={playing}
                        togglePlaying={setPlaying}
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
                />
                }
            </div>
        </FullScreen>
    )
}

export default Player
