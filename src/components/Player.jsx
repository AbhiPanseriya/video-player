import { useState } from "react"
import ReactPlayer from "react-player"

const Player = ({src}) => {
    const [playbackRate, setPlaybackRate] = useState();
    return (
        <div className='bg-black w-screen h-screen relative'>
            <ReactPlayer 
                className='object-contain'
                url={src}
                width='100%'
                height='100%'
                playing={true}
                controls={true}
                playbackRate={playbackRate}
            />
            <div className='bg-transparent absolute bottom-[4%] right-[11%]'>
            <input 
                className="rounded-lg overflow-hidden appearance-none hidden hover:block bg-gray-400 h-3 w-128"
                type="range"
                min="1"
                max="64"
                step="1"
                value="4"
                onChange={(e) => setPlaybackRate(e.target.value/4)} />
            </div>
        </div>
    )
}

export default Player
