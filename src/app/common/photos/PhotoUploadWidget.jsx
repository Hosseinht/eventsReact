import React, {useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

const PhotoUploadWidget = () => {
    const [files , setFiles] = useState([])
    return (
        <div>
            <Row className='mt-3 '>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 1 - Add Photo</p>
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Col>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 2 - Resize</p>
                </Col>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color text-uppercase'>Step 3 - Review & Upload</p>
                </Col>
            </Row>
        </div>
    );
};

export default PhotoUploadWidget;
