import React, {useState} from 'react';
import cuid from "cuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import Button from "react-bootstrap/cjs/Button";
import {getFileExtension} from "../util/util";
import {uploadToFirebaseStorage} from "../../firestore/firebaseService";
import {toast} from "react-toastify";
import {updateUserProfilePhoto} from "../../firestore/firestoreService";
import Spinner from "react-bootstrap/Spinner";

const PhotoUploadWidget = ({setEdit}) => {
    const [files, setFiles] = useState([])
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    //
    function handleUploadImage() {
        setLoading(true);
        const filename = cuid() + '.' + getFileExtension(files[0].name);
        const uploadTask = uploadToFirebaseStorage(image, filename);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, error => {
            toast.error(error.messege);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                updateUserProfilePhoto(downloadURL, filename).then(() => {
                    setLoading(false);
                    handleCancelCrop();
                    setEdit(false);
                }).catch(error => {
                    toast.error(error.message);
                    setLoading(false);
                });
            })
        })
    }

    function handleCancelCrop() {
        setFiles([])
        setImage(null)
    }

    return (
        <div>
            <Row className='mt-5 '>
                <Col lg={4} md={"auto"} className='d-flex flex-column justify-content-between align-items-center'>
                    <p className='my-blue-color text-uppercase '>Step 1 - Add Photo</p>
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Col>
                <Col lg={4} md={"auto"} className='d-flex flex-column justify-content-between align-items-center'>
                    <p className='my-blue-color text-uppercase text-start'>Step 2 - Resize</p>
                    {files.length > 0 &&
                    <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview}/>
                    }
                </Col>
                <Col lg={4} md={"auto"} className='d-flex flex-column justify-content-between align-items-center'>
                    <p className='my-blue-color text-uppercase'>Step 3 - Review & Upload</p>
                    {files.length > 0 &&
                    <>
                        <div className='img-preview' style={{minHeight: 200, minWidth: 200, overflow: 'hidden'}}/>
                        <div className='ms-1 mt-1'>
                            <Button onClick={handleUploadImage} variant='light' className='my-blue-btn-invert'>
                                {loading ?
                                    <div>
                                        < Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className='me-1'
                                        />
                                    </div>
                                    :
                                    <div>
                                        Check
                                    </div>

                                }

                            </Button>{' '}
                            <Button disabled={loading} onClick={handleCancelCrop} variant='light'
                                    className='my-red-btn-inverted '>Close</Button>

                        </div>
                    </>
                    }

                </Col>
            </Row>
        </div>
    );
};

export default PhotoUploadWidget;
