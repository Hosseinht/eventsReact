import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import Button from "react-bootstrap/cjs/Button";
import {BsTrashFill} from "react-icons/bs";
import Card from "react-bootstrap/Card";

const PhotoUploadWidget = () => {
    const [files, setFiles] = useState([])
    const [image, setImage] = useState(null)
    return (
        <div>
            <Row className='mt-3 '>
                <Col lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 1 - Add Photo</p>
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Col>
                <Col lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 2 - Resize</p>
                    {files.length > 0 &&
                    <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview}/>
                    }
                </Col>
                <Col lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 3 - Review & Upload</p>
                    {files.length > 0 &&
                    <>
                        <div className='img-preview' style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
                        <div className='ms-1 mt-1'>
                            <Button variant='light' className='my-blue-btn-invert'>Check</Button>{' '}
                            <Button variant='light' className='my-red-btn-inverted '>Close</Button>

                        </div>
                    </>
                    }

                </Col>
            </Row>
        </div>
    );
};

export default PhotoUploadWidget;
