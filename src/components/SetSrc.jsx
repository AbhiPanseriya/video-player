import FileUploadIcon from "./file-upload-svg-icon";

const SetSrc = ({setSrc}) => {
    const onSelect = (e) => {
        console.log(e)
        const file = e.target.files[0];
        const URL = window.URL || window.webkitURL;
        setSrc(URL.createObjectURL(file));
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <label className='w-96 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-md tracking-wide uppercase border cursor-pointer hover:bg-blue-400 hover:text-white'>
                <FileUploadIcon />
                <span className='mt-2 text-base leading-normal'>Select a file</span>
                <input type='file' className='hidden' onChange={onSelect} />
            </label>
            <div className='flex my-5 items-center'>
                <span className='w-44 border-b'></span>
                <span className='italic text-sm mx-2'>OR</span>
                <span className='w-44 border-b'></span>
            </div>
            <label>
                <input
                    type='text'
                    className='outline-none shadow-md p-3 w-96 border rounded-lg'
                    placeholder='Paste your Link Here'
                    onChange={(e) => setSrc(e.target.value)}
                />
            </label>
        </div>
    )
}

export default SetSrc
