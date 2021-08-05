import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {BsUpload} from "react-icons/bs";

const PhotoWidgetDropzone = ({setFiles}) => {
    const dropzoneStyles = {
        border: 'dashed 3px #eee',
        borderRadius: '%5',
        paddingTop: '30px',
        textAlign: 'center',
        height: '140px'
    }
    const dropzoneActive = {
        border: 'dashed 3px green',

    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => {
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        }))
    }, [setFiles])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className='w-75' {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
            <input {...getInputProps()} />
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <BsUpload size='40px'  />
                <span className='mt-2'>Drop Image Here</span>
            </div>

        </div>
    )
}

export default PhotoWidgetDropzone;