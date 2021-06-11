import { useState } from "react";
import { useEffect } from "react";

const DisplaySubtitle = ({ played, subtitleText, isControlsHidden, subtitleOffset }) => {
    const [trigger, setTrigger] = useState(0);
    const [index, setIndex] = useState(0);
    const [sub, setSub] = useState('');

    useEffect(() => {
        if (!subtitleText) return;

        const currentDuration = 1000 * (played - subtitleOffset);
        if (currentDuration < trigger) return;

        const subtitles = JSON.parse(subtitleText);
        if (!subtitles[index + 1]) return;

        if (subtitles[index + 1].data.start < currentDuration && subtitles[index + 1].data.end > currentDuration) {
            setSub(subtitles[index + 1].data.text);
            setIndex(index + 1);
            setTrigger(subtitles[index + 1].data.end);
        }
        else if (subtitles[index].data.end < currentDuration && subtitles[index + 1].data.start > currentDuration) {
            setTrigger(subtitles[index + 1].data.start);

        }
        else {
            subtitles.forEach((e, index) => {
                if (e.data.start < currentDuration && e.data.end > currentDuration) {
                    setSub(e.data.text);
                    setTrigger(e.data.end);
                    setIndex(index);
                    return
                }
            });
        }

    }, [played, index, subtitleText, trigger, subtitleOffset])

    return (
        <div className={`absolute text-white w-full flex justify-center transition-all duration-200 ease-in-out ${isControlsHidden ? 'bottom-10' : 'bottom-20'}`}>
            <div className='bg-black rounded py-1 px-2 text-2xl'>{sub}</div>
        </div>
    )
}

export default DisplaySubtitle;
