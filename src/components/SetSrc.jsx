import FileUploadIcon from "./file-upload-svg-icon";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const SetSrc = ({ src, setSrc, setIsPlayerVisible, setTitle, setIsLocalFile, setIsMultiple, setFilesList }) => {
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')) || false);
    const [link, setLink] = useState('');

    const onSelectFile = (e) => {
        setIsLocalFile(true);
        if (e.target.files.length > 1) setIsMultiple(true);
        setFilesList(e.target.files);
        const file = e.target.files[0];
        setTitle(file.name);
        const URL = window.URL || window.webkitURL;
        setSrc(URL.createObjectURL(file));
        setIsPlayerVisible(true);
    }

    const onSelectLink = (e) => {
        e.preventDefault();
        setSrc(link);
        setFilesList([src]);
        setIsMultiple(false);
        setIsLocalFile(false);
        setIsPlayerVisible(true);
    }

    const toggledarkMode = (value) => {
        setDark(value);
        localStorage.setItem('dark', value);
    }

    return (
        <div className={dark ? 'dark' : ''}>
            <div className='w-screen h-screen flex flex-col justify-center items-center relative dark:bg-gray-900 transition-all duration-500' >
                <button className='absolute top-5 right-5 focus:outline-none'>
                    {dark
                        ? (
                            <FontAwesomeIcon
                                icon={faSun}
                                className='fa-2x text-yellow-400 bg-gray-100 hover:bg-gray-200 rounded-full p-2'
                                onClick={() => toggledarkMode(false)}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faMoon}
                                className='fa-2x text-white bg-gray-800 hover:bg-gray-900 rounded-full p-2'
                                onClick={() => toggledarkMode(true)}
                            />
                        )
                    }
                </button>
                <label
                    className='w-10/12 sm:w-96 flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-md tracking-wide 
                    uppercase border cursor-pointer hover:bg-blue-400 hover:text-white 
                    dark:text-white dark:bg-gray-700 dark:border-black dark:hover:bg-blue-400 dark:shadow-none
                    transition-all hover:duration-150 duration-500'
                >
                    <FileUploadIcon />
                    <span className='mt-2 text-base leading-normal'>Select files</span>
                    <input type='file' accept='.MP4, .MKV, .WEBM, .OGG, .MP3, .H.264' multiple className='hide' onChange={onSelectFile} />
                </label>
                <div className='flex my-5 items-center'>
                    <span className='w-full sm:w-44 border-b'></span>
                    <span className='italic text-sm mx-2 dark:text-white'>OR</span>
                    <span className='w-full sm:w-44 border-b'></span>
                </div>
                <form onSubmit={onSelectLink} className='w-10/12 sm:w-96'>
                    <input
                        type='text'
                        className='outline-none shadow-md p-3 w-full border rounded-lg dark:bg-gray-700 dark:border-black dark:text-white 
                        transition-all duration-500'
                        placeholder='Paste your Link Here'
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                    />
                </form>
            </div>
        </div>
    )
}

export default SetSrc
