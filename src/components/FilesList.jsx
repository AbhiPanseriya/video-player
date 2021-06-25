import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
const FilesList = ({ fileNames, currentlyPlaying, setCurrentlyPlaying, isControlsHidden }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollPos, setLastScrollPos] = useState(0);
    const [hidden, setHidden] = useState(false);
    const ref = useRef();

    const scrollTo = useCallback((value) => {
        if (!ref?.current) return;
        ref.current.scrollTo(0, lastScrollPos);
    }, [lastScrollPos]);

    useEffect(() => {
        if (isControlsHidden)
            setLastScrollPos(scrollPosition);
        else
            scrollTo(scrollPosition);
    }, [isControlsHidden]);


    return (
        <div className='absolute top-0 right-0 flex items-center h-[93%] transition-all duration-500'>
            <FontAwesomeIcon
                icon={faArrowRight}
                className={`cursor-pointer transform translate-x-3 text-white z-50 fa-2x bg-gray-700 hover:bg-gray-600 p-2 rounded 
                    ${(hidden || isControlsHidden || fileNames.length <= 1) ? 'hide' : ''}`}
                onClick={() => setHidden(true)}
            />
            <FontAwesomeIcon
                icon={faArrowLeft}
                className={`cursor-pointer text-white z-50 fa-2x bg-gray-700 hover:bg-gray-600 p-2 rounded 
                    ${(!hidden || isControlsHidden || fileNames.length <= 1) ? 'hide' : ''}`}
                onClick={() => setHidden(false)}
            />
            <div
                className={`overflow-auto scrollbar-hide text-white bg-gray-900 transition-width duration-500 ease
                    h-full z-20 backdrop-blur-lg rounded-bl opacity-90 ${(isControlsHidden || fileNames.length <= 1 || hidden) ? 'w-0' : 'w-96'}`}
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
        </div>
    )

}

export default FilesList;
