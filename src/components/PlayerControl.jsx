import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faPlay,
    faPause,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faVolumeUp,
    faVolumeMute,
    faVolumeDown,
    faVolumeOff,
    faExpand,
    faClone
} from '@fortawesome/free-solid-svg-icons'
import { Slider } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const ValueLabelComponent = (props) => {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={convertTimeString(value)}>
            {children}
        </Tooltip>
    );
}

const convertTimeString = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const PlayerControl = ({
    isControlsHidden,
    title,
    playing,
    togglePlaying,
    setIsPlayerVisible,
    muted,
    setMuted,
    volume,
    setVolume,
    seekTo,
    fullScreenToggle,
    playbackRate,
    setPlaybackRate,
    played,
    setPlayed,
    totalDuration,
    pip,
    setPip

}) => {
    const [playbackRateOptionEl, setPlaybackRateOptionEl] = useState(null);

    const onPlaybackRateChange = (event) => {
        setPlaybackRateOptionEl(event.currentTarget);
    };
    const onPlaybackRateClose = () => {
        setPlaybackRateOptionEl(null);
    };
    const plabackRateOptionsOpen = Boolean(playbackRateOptionEl);
    const playbackRateId = plabackRateOptionsOpen ? 'simple-popover' : undefined;

    return (
        <div className={`absolute top-0 z-10 w-[100%] h-[100%] text-white p-2 flex flex-col justify-between ${isControlsHidden ? 'hidden' : 'visible'}`} >
            <div className='flex items-center h-8'>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className='cursor-pointer mr-4 h-8 w-8'
                    onClick={e => {
                        setIsPlayerVisible(false);
                        togglePlaying(false)
                    }}
                />
                <span>{title}</span>
            </div>
            <div className='flex-grow' onClick={e => togglePlaying(!playing)}></div>
            <div className='text-center flex items-center mx-auto'>
                <FontAwesomeIcon icon={faAngleDoubleLeft} className='cursor-pointer h-8 w-8 fa-2x' onClick={() => seekTo(-10)} />
                <div className='mx-20'>
                    {playing
                        ? <FontAwesomeIcon icon={faPause} onClick={(e) => togglePlaying(false)} className='cursor-pointer h-8 w-8 fa-3x' />
                        : <FontAwesomeIcon icon={faPlay} onClick={(e) => togglePlaying(true)} className='cursor-pointer h-8 w-8 fa-3x' />
                    }
                </div>
                <FontAwesomeIcon icon={faAngleDoubleRight} className='cursor-pointer h-8 w-8 fa-2x' onClick={() => seekTo(10)} />
            </div>
            <div className='flex-grow' onClick={e => togglePlaying(!playing)}></div>
            <div className='w-[95%] flex flex-col mx-auto'>
                <div>
                    <Slider
                        ValueLabelComponent={ValueLabelComponent}
                        value={played}
                        max={totalDuration}
                        onChange={(e, value) => {
                            seekTo(value - played);
                            setPlayed(value);
                        }}
                    />
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <div className='w-8'>
                            {muted
                                ? <FontAwesomeIcon
                                    icon={faVolumeMute}
                                    onClick={() => {
                                        setMuted(false);
                                        localStorage.setItem('muted', false);
                                        setVolume(JSON.parse(localStorage.getItem('vol')));
                                    }}
                                />
                                : (
                                    (volume < 10)
                                        ? (
                                            <FontAwesomeIcon
                                                icon={faVolumeOff}
                                                onClick={() => {
                                                    setMuted(true);
                                                    localStorage.setItem('muted', true);
                                                    setVolume(0);
                                                }}
                                            />
                                        )
                                        : (volume >= 10 && volume < 75)
                                            ? (
                                                <FontAwesomeIcon
                                                    icon={faVolumeDown}
                                                    onClick={() => {
                                                        setMuted(true);
                                                        localStorage.setItem('muted', true);
                                                        setVolume(0);
                                                    }}
                                                />
                                            )
                                            : (volume >= 75) && (
                                                <FontAwesomeIcon
                                                    icon={faVolumeUp}
                                                    onClick={() => {
                                                        setMuted(true);
                                                        localStorage.setItem('muted', true);
                                                        setVolume(0);
                                                    }}
                                                />
                                            )
                                )
                            }
                        </div>
                        <div className='w-32 flex items-center'>
                            <Slider
                                value={volume}
                                onChange={(e, value) => {
                                    setVolume(value);
                                    localStorage.setItem('vol', value);
                                    if (value === 0) {
                                        setMuted(true);
                                        localStorage.setItem('muted', true);
                                    } else {
                                        setMuted(false);
                                        localStorage.setItem('muted', false);
                                    }
                                }}
                            />
                        </div>
                        <div className='ml-4'>{`${convertTimeString(played) || ''}/${convertTimeString(totalDuration) || ''}`}</div>
                    </div>
                    <div className='flex items-center'>
                        <div className='mr-4 cursor-pointer' aria-describedby={playbackRateId} onClick={onPlaybackRateChange}>{playbackRate}x</div>
                        <Popover
                            id={playbackRateId}
                            open={plabackRateOptionsOpen}
                            anchorEl={playbackRateOptionEl}
                            onClose={onPlaybackRateClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <div className='flex flex-col-reverse rounded-lg'>
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                    <button
                                        key={rate}
                                        className='hover:bg-gray-800 bg-black text-white p-2 focus:outline-none'
                                        onClick={() => {
                                            setPlaybackRate(rate);
                                            onPlaybackRateClose();
                                        }}
                                    >
                                        {rate}x
                                    </button>
                                ))}

                            </div>
                        </Popover>
                        <FontAwesomeIcon
                            icon={faClone}
                            className='cursor-pointer mr-4'
                            onClick={() => {
                                if (pip)
                                    setPip(false)
                                setTimeout(() => {
                                    setPip(true)
                                }, 10);
                            }}
                        />
                        <FontAwesomeIcon
                            icon={faExpand}
                            className='cursor-pointer'
                            onClick={fullScreenToggle.active ? fullScreenToggle.exit : fullScreenToggle.enter}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerControl
