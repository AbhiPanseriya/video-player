import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
const FilesList = ({ fileNames, currentlyPlaying, setCurrentlyPlaying, isControlsHidden }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollPos, setLastScrollPos] = useState(0);
    const ref = useRef();

    const scrollTo = useCallback((value) => {
        if (!ref) return;
        ref.current.scrollTo(0, lastScrollPos);
    }, [lastScrollPos]);

    useEffect(() => {
        if (isControlsHidden)
            setLastScrollPos(scrollPosition);
        else
            scrollTo(scrollPosition);
    }, [isControlsHidden]);


    return (
        <div
            className={`absolute top-0 right-0 overflow-auto scrollbar-hide text-white bg-gray-900
                h-[93%] z-20 backdrop-blur-lg rounded-bl opacity-90 ${isControlsHidden ? 'hidden' : ''}`}
            onScroll={(e) => setScrollPosition(e.target.scrollTop)}
            ref={ref}>
            {
                fileNames.map((name, index) => {
                    return (
                        <div
                            key={name}
                            className={`px-2 py-1 cursor-pointer w-96 z-30
                                ${currentlyPlaying === index ? 'font-extrabold text-md bg-gray-800' : 'text-sm'}`}
                            onClick={() => setCurrentlyPlaying(index)}
                        >
                            {currentlyPlaying === index && <span ref={scrollTo}></span>}
                            {name}
                        </div>
                    )
                })
            }
        </div>
    )

}

export default FilesList;
