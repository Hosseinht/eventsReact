import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PhotoUploadWidget = () => {
    return (
        <div>
            <Row className='mt-3 text-uppercase'>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color'>Step 1 - Add Photo</p>
                </Col>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color'>Step 2 - Resize</p>
                </Col>
                <Col  lg={4} md={"auto"}>
                    <p className='my-blue-color'>Step 3 - Review & Upload</p>
                </Col>
            </Row>
        </div>
    );
};

export default PhotoUploadWidget;
